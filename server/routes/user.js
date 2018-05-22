const express = require('express');
const router = express.Router();
const User = require('../models/user');

/***************/
//CHECK USER
/***************/
router.get('/login', (req, res, next) => {
    // User.find({"username":req.query.username, "password":req.query.password}).then(function(users){
    //     res.send(users);
    // })    
    User.aggregate([
        {$match: {"username":req.query.username, "password":req.query.password}},
        {$lookup:
        {
                from: 'people',
                localField: 'person_id',
                foreignField: '_id',
                as: 'personDetails'
        }}
    ]).then(function (person) {
        res.send(person);
    })
});

/***************/
//GET ALL USERS
/***************/
router.get('/getAll', (req, res, next) => {
    User.find().then(function (users) {
        res.send(users);
    });
});

module.exports = router;