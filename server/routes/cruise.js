const express = require('express');
const router = express.Router();
const Cruise = require('../models/cruise');

router.get('/getCruisesByRegion/:region', Cruise.getByRegion);

router.post('/add', Cruise.add);

router.get('/getAll', Cruise.getAll);

router.get('/get/:id', Cruise.get);

router.post('/update/:id', Cruise.update);

router.delete('/delete/:id', Cruise.delete);

module.exports = router;