const axios = require('axios');
const request = require('request')
const connectDB = require('../db/db');



exports.getStockList = async (req, res) => {
    try {
      // Query to fetch stock names
      const pool = await connectDB();

      const query = 'SELECT * FROM public.stocklist';
      
      // Execute the query
      const { rows } = await pool.query(query);
  
      // Extract stock names from the query result
    //   const stockNames = rows.map(row => row.name);
  
      // Send the stock names as a response
      res.json(rows);
      return rows
    } catch (error) {
      console.error('Error fetching stock names:', error);
      res.status(500).json({ error: 'An error occurred while fetching stock names' });
    }
  }