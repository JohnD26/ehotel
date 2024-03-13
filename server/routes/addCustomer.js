const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); // Ensure this module correctly configures your database connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Assuming environment variables for secrets
const secret_key = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_here";

app.use(cors({
    origin: "http://localhost:3000", // Adjust for production as needed
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.post('/customer', async (req, res) => {
    // Extract data from the request body
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


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
