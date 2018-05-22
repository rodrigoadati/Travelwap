const mongoose = require('mongoose');

//Flight Schema
const FlightSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    bookBy: {
        type: Date,
        required: true
    }
});

/*******************/
//FUNCTIONS
/*******************/
const Flight = module.exports = mongoose.model('Flight', FlightSchema);

module.exports.add = (req, res) => {
    let flight = new Flight(req.body);

    flight.save((err, flight) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add flight', flight: flight });
        }
        else {
            res.json({ success: true, msg: 'Flight created' });
        }
    });
};

module.exports.update = (req, res) => {
    Flight.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, flight) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update flight' });
        } else {
            res.json({ success: true, msg: 'Flight updated' });
        }
    });
};

module.exports.delete = (req, res) => {
    Flight.findByIdAndRemove({ _id: req.params.id }, (err, flight) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete flight' });
        }
        else {
            res.json({ success: true, msg: 'flight deleted' });
        }
    });
};

module.exports.getAll = (req, res) => {
    Flight.find({}, (err, flights) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve flights' });
        } else {
            res.json({ flights });
        }

    });
};

module.exports.getAllFeatured = (req, res) => {
    Flight.find({ featured: true }, (err, flights) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve flights' });
        } else {
            res.json({ flights });
        }

    });
};


module.exports.get = (req, res) => {
    Flight.findById(req.params.id, (err, flight) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve flight' });
        } else {
            res.json({ flight });
        }

    });
};

module.exports.getByRegion = (req, res) => {
    Flight.find({ region: req.params.region }, (err, flights) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve flights' });
        } else {
            res.json({ flights });
        }
    });
};
