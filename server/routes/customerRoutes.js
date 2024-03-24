const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret_key = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_here";

router.post('/', async (req, res) => {
    const { sin, email, password, phoneNumber, customerAddress, firstName, lastName } = req.body;

    if (!sin || !email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "Missing required information." });
    }

    try {
        const passwordEncrypt = await bcrypt.hash(password, secret_key);

        const newCustomer = await pool.query(
            `INSERT INTO customers (sin, email, password, phone_number, customer_address, first_name, last_name)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [sin, email, passwordEncrypt, phoneNumber, customerAddress, firstName, lastName]
        );

        res.json(newCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during customer creation." });
    }
});

module.exports = router;
