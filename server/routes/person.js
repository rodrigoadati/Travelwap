const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const User = require('../models/user');
const mongoose = require('mongoose');

/***************/
//REGISTER PERSON
/***************/
router.post('/add', (req, res, next) => {
    //Initialize the object to be inserted in the DB
    let newPerson = new Person
    ({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        date_of_birth:req.body.date_of_birth,
        phone:req.body.phone
    });

    //Execute model method to insert the object
    Person.addPerson(newPerson, (err, person) => {
        if(err)
        {
            res.json({success: false, msg:'Failed to register person information'});
        }
        else
        {
            //Insert User
            let newUser = new User
            ({
                username: req.body.username,
                password: Person.generateEncryptedPassword(req.body.password),
                role: "user",
                date_account_created: JSON.stringify(Date.now()),
                person_id: new mongoose.Types.ObjectId(person._id)
            });

            User.addUser(newUser, (err, user) => {
                if(err)
                {
                    res.json({success: false, msg:'Failed to register user information'});
                }
                else
                {
                    res.json({success: true, msg:'Account created'});
                }
            });            
        }
    });
});

/***************/
//GET ALL PEOPLE
/***************/
router.get('/getAll', (req, res, next) => {
  Person.find({}).then(function(people){
    res.send(people);
  });
});

router.get('/getUserId/:email', Person.getUserId);

router.post('/update/:id', Person.update);

module.exports = router;
