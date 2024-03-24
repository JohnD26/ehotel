const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/search', async (req, res) => {
    const {
        hotelChain,
        rating,
        maxCost,
        location,
        startDate,
        endDate,
        category,
        numberOfRooms,
        roomType
    } = req.query;

    let queryParams = [];
    let whereConditions = [];
    let paramCounter = 1;

    if (hotelChain && hotelChain !== 'default') {
        queryParams.push(parseInt(hotelChain));
        whereConditions.push(`h.chain_id = $${paramCounter++}`);
    }

    if (rating && rating !== 'default') {
        queryParams.push(parseInt(rating));
        whereConditions.push(`h.rating >= $${paramCounter++}`);
    }

    if (maxCost) {
        queryParams.push(parseFloat(maxCost));
        whereConditions.push(`r.price_per_night <= $${paramCounter++}`);
    }

    if (location) {
        queryParams.push(`%${location}%`);
        whereConditions.push(`h.address ILIKE $${paramCounter++}`);
    }

    if (category && category !== 'default') {
        queryParams.push(category);
        whereConditions.push(`h.category = $${paramCounter++}`);
    }

    if (roomType && roomType !== 'default') {
        queryParams.push(roomType);
        whereConditions.push(`r.room_type = $${paramCounter++}`);
    }

    // Additional logic for date availability and number of rooms needed

    let query = `
        SELECT DISTINCT h.*, COALESCE(avg(b.rating), 0) AS average_rating, count(*) OVER() AS total_results
        FROM hotels h
                 LEFT JOIN bookings b ON h.hotel_id = b.hotel_id
                 INNER JOIN rooms r ON h.hotel_id = r.hotel_id
                 LEFT JOIN room_amenities ra ON ra.room_id = r.room_id
                 LEFT JOIN amenities a ON a.amenity_id = ra.amenity_id
        WHERE h.availability = true
            ${whereConditions.length ? 'AND ' + whereConditions.join(' AND ') : ''}
        GROUP BY h.hotel_id
        ORDER BY h.hotel_id ASC;
    `;

    try {
        const { rows } = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error during hotel search.');
    }
});

module.exports = router;
