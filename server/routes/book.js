const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/book');

/***************/
//Book 
/***************/
router.post('/add', Book.addBook);

router.get('/getUserFlight/:username', Book.getUserFlightBooking);

router.get('/getUserHotel/:username', Book.getUserHotelBooking);

router.get('/getUserCruise/:username', Book.getUserCruiseBooking);

module.exports = router;
