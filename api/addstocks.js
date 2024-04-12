const axios = require('axios');
const request = require('request')
const connectDB = require('../db/db');


exports.addStockdata = async (req, res) => {
    try {
        // Extract data from the request body
        
        const { high, low, price, volume, symbol } = req.query;
        // const symbol = req.query.symbol;
        // const high = req.query.high;
        // const low = req.query.low;
        // const price = req.query.price;
        // const volume = req.query.volume;
          
        // Check if any required field is empty
        if (!symbol || !high || !low || !price || !volume) {
            return res.status(400).json({ error: "Incomplete details to update your watch list" });
        }
          
        // Connect to the database
        const pool = await connectDB();
    
        // Check if the symbol already exists in the database
        const checkquery = 'SELECT * FROM public.mystocklist WHERE symbol = $1';
        const { rows } = await pool.query(checkquery, [symbol]);
        if (rows.length > 0) {
            // If symbol exists, check if the data is the same
            const existingData = rows[0];
            
            if (existingData.price == price && existingData.high == high && existingData.low == low && existingData.volume == volume) {
                return res.status(400).json({ error: "Data already present in your watchlist" });
            }

            const updateQuery = `
                UPDATE public.mystocklist
                SET high = $1, low = $2, price = $3, volume = $4
                WHERE symbol = $5
            `;
            await pool.query(updateQuery, [parseInt(high), parseInt(low), parseInt(price), parseInt(volume), symbol]);

            return res.status(200).json({ message: "Watch list updated successfully" });
        }
        
        
        // Query to insert or update data into the table
        const query = `
            INSERT INTO public.mystocklist (high, low, price, volume, symbol)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE 
            SET high = EXCLUDED.high, low = EXCLUDED.low, price = EXCLUDED.price, volume = EXCLUDED.volume;
        `;
        
        // Execute the query
        await pool.query(query, [parseInt(high), parseInt(low), parseInt(price), parseInt(volume), symbol]);
    
        // Send success response
        return res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
        console.error('Error adding data to the table:', error);
        return res.status(500).json({ error: 'An error occurred while adding data to the table' });
    }
}