const { Router } = require('express');
const { Op } = require('sequelize');
const { Hotel, Room, Reservation, Amenity, View } = require('../sequelize');
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
                    where: {},
                    /*include: [
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
                            model: Reservation,
                            as: 'bookings',
                            required: false, // To include rooms regardless of bookings
                            where: {}
                        }
                    ]*/
                }
            ]
        };

        // Apply filters based on the search query parameters
        // Location filter
        if (location) {
            searchCriteria.include[0].where.hotel_address = { [Op.iLike]: `%${location}%` };
        }

        // Hotel chain filter
        if (hotelChain && hotelChain !== 'default') {
            searchCriteria.where.chain_id = parseInt(hotelChain);
        }

        // Room type and category filter
        if (roomType && roomType !== 'default') {
            searchCriteria.include[0].where.room_type = roomType;
        }
        if (category && category !== 'default') {
            searchCriteria.include[0].where.category = category;
        }

        // Rating filter
        if (rating && rating !== 'default') {
            searchCriteria.where.stars = parseInt(rating);
        }

        // Max cost filter
        if (maxCost) {
            searchCriteria.include[0].where.price = { [Op.lte]: parseFloat(maxCost) };
        }

        // Availability filter based on booking dates
        /*if (startDate && endDate) {
            searchCriteria.include[0].include[2].where = {
                [Op.or]: [
                    { start_date: { [Op.gt]: new Date(endDate) } },
                    { end_date: { [Op.lt]: new Date(startDate) } },
                ],
            };
        }*/

        // Execute the search query
        //const hotels = await Hotel.findAll(searchCriteria);
        const hotels = await Hotel.findAll(searchCriteria);
        res.json(hotels);

        /*let filteredHotels = hotels;
        if (numberOfRooms) {
            filteredHotels = hotels.filter(hotel => {
                // Count the number of available rooms that match the criteria
                const availableRoomsCount = hotel.rooms.reduce((count, room) => {
                    const notBooked = room.bookings.every(booking =>
                        new Date(booking.start_date) > new Date(endDate) ||
                        new Date(booking.end_date) < new Date(startDate)
                    );
                    return count + (notBooked && room.room_type === roomType ? 1 : 0);
                }, 0);
                return availableRoomsCount >= numberOfRooms;
            });
        }

        const result = filteredHotels.map(hotel => {
            return {
                id: hotel.hotel_id,
                name: hotel.hotel_name,
                rating: hotel.stars,
                amenities: hotel.rooms.flatMap(room => room.amenities.map(amenity => amenity.name)),
                capacity: hotel.rooms.reduce((sum, room) => sum + room.capacity, 0),
                views: hotel.rooms.map(room => room.view.view_type)
            };
        });

        res.json(result);*/

    } catch (error) {
        console.error('Search failed:', error);
        res.status(500).json({ error: 'Search failed due to an internal error. Please try again later.' });
    }
});

module.exports = router;
