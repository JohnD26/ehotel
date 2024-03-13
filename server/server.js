// server.js adjustment
const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes'); // Adjust path as necessary

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Correctly prefix the router here
app.use('/customer', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
