const axios = require('axios');
const request = require('request')
const connectDB = require('../db/db');


exports.deletemyStocks = async (req, res) => {
    const { id } = req.query
    const query = 'DELETE FROM public.mystocklist WHERE id = $1';

    const pool = await connectDB();

    try {
        // Execute the delete query
        const result = await pool.query(query, [id]);
        console.log(result)
        return { success: true, message: `Record deleted successfully` };
    } catch (error) {
        console.error('Error deleting record:', error);
        return { success: false, message: 'An error occurred while deleting the record' };
    }
    
    }
