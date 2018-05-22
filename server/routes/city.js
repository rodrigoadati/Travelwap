const express = require('express');
const router = express.Router();
const City = require('../models/city');

/***************/
//GET ALL Cities
/***************/
router.get('/getAll', (req, res, next) => {
    City.find().then(function (cities) {
        res.send(cities);
    });
});

/***************/
//GET CITIES BY REGION
/***************/
router.get('/getCitiesByRegion', (req, res, next) => {
    City.find({ "region": req.query.region}).then(function (cities) {
        res.send(cities);
    })
});

module.exports = router;