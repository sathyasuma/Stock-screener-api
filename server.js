// server.js
const express = require('express');
const connectDB = require('./db/db');
const router = require('./router/router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB database
connectDB().then(() => {
    console.log('Postgres connection established');
}).catch(error => {
    console.error('Error connecting to Postgres:', error);
    process.exit(1); // Exit process with failure
});

// Middleware to parse JSON request body
app.use(express.json());

app.use(cors());
// Define routes
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
