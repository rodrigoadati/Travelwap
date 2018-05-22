const mongoose = require('mongoose');

//Person Schema
const BookSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type_name: {
        type: String,
        required: true
    }
});

/*******************/
//FUNCTIONS
/*******************/
const Book = module.exports = mongoose.model('Book', BookSchema);

//Get the Booking by Id
module.exports.getBookById = (id, callback) => {
    Book.findById(id, callback);
}

//Add new Booking
module.exports.addBook = (req, res) => {
    let book = new Book(req.body);
    book.save((err, book) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to book item' });
        } else {
            res.json({ success: true, msg: 'Thank you, we will get in contact soon' });
        }
    });
};

//Get the user booked flight
module.exports.getUserFlightBooking = (req, res, next) => {
    Book.aggregate([        
        { $match: { "username": req.params.username, type_name:"Flight"}},
        {
            $lookup:
            {
                from: 'flights',
                localField: 'type_id',
                foreignField: '_id',
                as: 'flightDetails'
            }
        }
    ]).then(function (flight) {
        res.send(flight);
    });
};

//Get the user booked Hotel
module.exports.getUserHotelBooking = (req, res, next) => {
    Book.aggregate([
        { $match: { "username": req.params.username, type_name:"Hotel"}},
        {
            $lookup:
            {
                from: 'hotels',
                localField: 'type_id',
                foreignField: '_id',
                as: 'hotelDetails'
            }
        }
    ]).then(function (hotel) {
        res.send(hotel);
    });
};


//Get the user booked Cruise
module.exports.getUserCruiseBooking = (req, res, next) => {
    Book.aggregate([
        { $match: { "username": req.params.username, type_name:"Cruise"}},
        {
            $lookup:
            {
                from: 'cruises',
                localField: 'type_id',
                foreignField: '_id',
                as: 'cruiseDetails'
            }
        }
    ]).then(function (cruise) {
        res.send(cruise);
    });
};
