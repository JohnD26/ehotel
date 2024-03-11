const express = require('express');
const app = express();
const pool = require('./db'); 

// Middleware
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel API');
});

// Endpoint to get data from the database
app.get('/hotels', async (req, res) => {
    try {
        const allHotels = await pool.query('SELECT * FROM hotels');
        res.json(allHotels.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Start the server on a port default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
