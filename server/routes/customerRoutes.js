const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Assuming environment variables for secrets
const secret_key = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_here";

// Post request to add customer
router.post('/', async (req, res) => {
    const { sin, email, password, phoneNumber, customerAddress } = req.body;

    // Validate required fields
    if (!sin || !email || !password) {
        return res.status(400).json({ error: "Missing required information." });
    }

    try {
        // Hash the password
        const passwordEncrypt = await bcrypt.hash(password, secret_key);

        // Insert the new customer into the database
        const newCustomer = await pool.query(
            `INSERT INTO customers (sin, email, password, phone_number, customer_address)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [sin, email, passwordEncrypt, phoneNumber, customerAddress]
        );

        res.json(newCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during customer creation." });
    }
});

module.exports = router;
