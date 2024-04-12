const axios = require('axios');
const request = require('request')
const connectDB = require('../db/db');


exports.getStockList = async (req, res) => {
    try {
      var where = ' WHERE';

      const { max, min, symbol, volume} = req.query;
      console.log(max, min);
        const and = ' AND '
      if (max !== '' && max !== 'undefined' && min !== '' && min !== 'undefined') {
        where += ` price >= ${min} AND price <= ${max}`;
      } else {
        if (max !== '' && max !== 'undefined') {
          where += ` price <= ${max} and `;
        }
        if (min !== '' && min !== 'undefined') {
          where += ` price >= ${min} and `;
        }
      }
      if (symbol !== '' && symbol !== 'undefined') {
        where += and
        where += ` symbol = '${symbol}'`;
      }
      
      if (volume !== '' && volume !== 'undefined') {
        where += and
        where += ` volume >= ${volume}`;
      }
      // Query to fetch stock names
      const pool = await connectDB();
      var query = '';
      console.log(where)
      if (where.length > 7) {
        query = `SELECT * FROM public.mystocklist ${where}`;
      } else {
        query = `SELECT * FROM public.mystocklist`;
      }
  
      // Execute the query
      const { rows } = await pool.query(query);
  
      // Send the stock names as a response
      res.json(rows);
      return rows;
    } catch (error) {
      console.error('Error fetching stock names:', error);
      res.status(500).json({ error: 'An error occurred while fetching stock names' });
    }
  };
  