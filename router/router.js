const express = require('express');
const router = express.Router();
const stocksController = require('../api/getstocks');
const stocksController1 = require('../api/getstockslist')
const stocksController2 = require('../api/addstocks')
const stocksController3 = require('../api/getmystocks')
const stocksController4 = require('../api/deletemystock')
const stocksController5 = require('../api/login')

// Define routes
router.get('/getstocks', stocksController.getStockData);
router.get('/getstockslist',stocksController1.getStockList);
router.post('/addstocks',stocksController2.addStockdata);
router.get('/getmystockslist',stocksController3.getStockList);
router.delete('/deletemystocks',stocksController4.deletemyStocks);
router.post('/login',stocksController5.logIn);
router.post('/signup',stocksController5.signUp);


module.exports = router;