const express = require('express');
const router = express.Router();
const Package = require('../models/package');

router.get('/getPackagesByRegion/:region', Package.getByRegion);

router.post('/add', Package.add);

router.get('/getAll', Package.getAll);

router.get('/getAllNoFilter', Package.getAllNoFilter);

// router.get('/getAll/featured', Package.getAllFeatured);

router.get('/get/:id', Package.get);

router.post('/update/:id', Package.update);

router.delete('/delete/:id', Package.delete);

module.exports = router;