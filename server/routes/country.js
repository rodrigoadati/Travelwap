const express = require('express');
const router = express.Router();
const Country = require('../models/country');

/***************/
//GET ALL COUNTRIES
/***************/
router.get('/getAll', (req, res, next) => {
    Country.find().then(function (countries) {
        res.send(countries);
    });
});

module.exports = router;