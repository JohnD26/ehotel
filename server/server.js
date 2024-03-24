// Import necessary modules
const express = require('express');
const cors = require('cors');

// If you have other route files
const customerRoutes = require('./routes/customerRoutes'); // Adjust this path as needed
const searchRoutes = require('./routes/hotelSearchLogic'); // Example: Adjust this path as needed for your search functionality
const loginRoutes = require('./routes/loginRoutes');

// Create an Express app
const app = express();

// Specify the port
const PORT = process.env.PORT || 3001;

// Apply middleware
app.use(cors({
    origin: 'http://localhost:3000', // This allows your client on localhost:3000 to make requests to this server
    credentials: true, // This is needed if your frontend needs to send cookies or credentials with requests
}));
app.use(express.json()); // This is used to parse JSON bodies

// Use your routes
app.use('/customer', customerRoutes); // Example: Adjust based on your project structure

// Assuming your search functionality is separate, you could mount it like this:
app.use('/api', searchRoutes); // This prefixes all routes in the searchRoutes with '/api'

app.use('/auth', loginRoutes); // Use login routes
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
