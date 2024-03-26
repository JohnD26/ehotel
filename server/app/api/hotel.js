const { Router } = require('express');
const { Op } = require('sequelize');
const { Hotel, Room, Booking, Amenity, View, RoomAmenity } = require('../sequelize');
const router = new Router();

router.get('/search', async (req, res) => {
    // Extract query parameters and set defaults where necessary
    const {
        location,
        hotelChain,
        category,
        roomType,
        numberOfRooms,
        rating,
        maxCost,
        startDate,
        endDate
    } = req.query;

    try {
        // Initialize the search criteria for Sequelize
        let searchCriteria = {
            where: {},
            include: [
                {
                    model: Room,
                    as: 'rooms',
                    where: {},
                    include: [
                        {
                            model: Amenity,
                            as: 'amenities',
                            through: { attributes: [] } // Exclude join table attributes
                        },
                        {
                            model: View,
                            as: 'view'
                        },
                        {
                            model: Booking,
                            as: 'bookings',
                            required: false, // To include rooms regardless of bookings
                            where: {}
                        }
                    ]
                }
            ]
        };
        // Apply filters based on the search query parameters
        // Location filter
        if (location) {
            searchCriteria.where.address = { [Op.iLike]: `%${location}%` };
        }

        // Hotel chain filter
        if (hotelChain && hotelChain !== 'default') {
            searchCriteria.where.chain_id = parseInt(hotelChain);
        }

        // Category filter
        // Room type and category filter
        if (roomType && roomType !== 'default') {
            searchCriteria.include[0].where.room_type = roomType;
        }
        // Assuming category is also a property of rooms
        if (category && category !== 'default') {
            searchCriteria.include[0].where.category = category;
        }
        
        // Number of rooms filter - this requires a subquery or a group by count in SQL
        // Since Sequelize doesn't support this natively, you'd handle this after fetching the data
        // or by using a raw SQL query within Sequelize.

        // Rating filter
        if (rating && rating !== 'default') {
            searchCriteria.where.rating = parseInt(rating);
        }

        // Max cost filter
        if (maxCost) {
            searchCriteria.include[0].where.price_per_night = { [Op.lte]: parseFloat(maxCost) };
        }

        // Availability filter based on booking dates
        if (startDate && endDate) {
            searchCriteria.include[0].include.push({
                model: Booking,
                as: 'bookings',
                required: false, // Do not exclude rooms that have no bookings
                where: {
                    [Op.or]: [
                        { check_in: { [Op.gt]: new Date(endDate) } },
                        { check_out: { [Op.lt]: new Date(startDate) } },
                    ],
                },
            });
        }

        // Execute the search query
        const hotels = await Hotel.findAll(searchCriteria);

        // Filter out hotels that do not meet the numberOfRooms criteria, if specified
        let filteredHotels = hotels;
        if (numberOfRooms) {
            filteredHotels = hotels.filter(hotel => {
                // Check the count of rooms that match the room type and are not booked
                return hotel.rooms.filter(room => {
                    const notBooked = room.bookings.every(booking =>
                        new Date(booking.check_in) > new Date(endDate) ||
                        new Date(booking.check_out) < new Date(startDate)
                    );
                    return notBooked && room.room_type === roomType;
                }).length >= numberOfRooms;
            });
        }

        // Transform the search results into the desired format for the frontend
        const result = filteredHotels.map(hotel => {
            return {
                id: hotel.hotel_id,
                name: hotel.hname,
                rating: hotel.rating,
                amenities: hotel.rooms.map(room => room.amenities.map(amenity => amenity.name)).flat(),
                capacity: hotel.rooms.reduce((sum, room) => sum + room.capacity, 0),
                views: hotel.rooms.map(room => room.view.view_type)
            };
        });

        // Return the results
        res.json(result);

    } catch (error) {
        console.error('Search failed:', error);
        res.status(500).json({ error: 'Search failed due to an internal error. Please try again later.' });
    }
});

module.exports = router;
