// db.js
const { Pool } = require('pg');

const connectDB = async () => {
    try {
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'stockscreener',
            password: 'root123',
            port: 5432, // Default PostgreSQL port
        });

        await pool.query('SELECT NOW()'); // Test connection

        console.log('Connected to PostgreSQL');
        return pool; // Return the pool for executing queries
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        throw error;
    }
};

module.exports = connectDB;
