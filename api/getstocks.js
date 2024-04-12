const axios = require('axios');
const request = require('request')



exports.getStockData = async (req, res) => {
    const { symbol } = req.query;
    try {
        // Fetch stock data from API with filters
        const stockData = await fetchStockData(symbol);

        res.json(stockData);
        return stockData
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to fetch stock data from Alpha Vantage API
async function fetchStockData(symbol) {
    try {
        // Replace 'your_api_key' with your actual Alpha Vantage API key
        const apiKey = 'your_api_key';
        let apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
        
        // Add optional start_date and end_date filters
        // if (startDate) {
        //     apiUrl += `&start_date=${startDate}`;
        // }
        // if (endDate) {
        //     apiUrl += `&end_date=${endDate}`;
        // }
        
        // Make GET request to Alpha Vantage API
        const response = await axios.get(apiUrl);
        
        // Extract stock data from response
        const stockData = response.data;
        return stockData;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
}
    
