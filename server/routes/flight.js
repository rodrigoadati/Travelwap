const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

router.get('/getFlightsByRegion/:region', Flight.getByRegion);

router.post('/add', Flight.add);

router.get('/getAll', Flight.getAll);

router.get('/getAll/featured', Flight.getAllFeatured);

router.get('/get/:id', Flight.get);

router.post('/update/:id', Flight.update);

router.delete('/delete/:id', Flight.delete);

module.exports = router;