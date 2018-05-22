const express = require('express');
const router = express.Router();
const Region = require('../models/region');

/***************/
//GET ALL COUNTRIES
/***************/
router.get('/getAll', (req, res, next) => {
    Region.find().then(function (region) {
        res.send(region);
    });
});

module.exports = router;