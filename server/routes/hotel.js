const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');

router.get('/getHotelsByRegion/:region', Hotel.getByRegion);

router.post('/add', Hotel.add);

router.get('/getAll', Hotel.getAll);

router.get('/getAll/featured', Hotel.getAllFeatured);

router.get('/get/:id', Hotel.get);

router.post('/update/:id', Hotel.update);

router.delete('/delete/:id', Hotel.delete);

module.exports = router;