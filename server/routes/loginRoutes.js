const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db'); // Adjust the path according to your project structure
const jwt = require('jsonwebtoken');
const router = express.Router();

// Assuming jwtSecret and other configurations are set up similarly
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_here";

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (validPassword) {
                // Generate a token
                const token = jwt.sign(
                    { userId: user.rows[0].id },
                    jwtSecret,
                    { expiresIn: '1h' }
                );

                res.json({ token: token, message: "Login successful" });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during authentication" });
    }
});

module.exports = router;
