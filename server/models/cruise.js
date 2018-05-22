const mongoose = require('mongoose');

//Cruise Schema
const CruiseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ship: {
        type: String,
        required: true
    },
    region: {
        type: String,
        require: true
    },
    departingInfo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    journey: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        require: true
    },
    itinerary: [
        {
            day: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            port: {
                type: String,
                required: true
            },
            arrive: {
                type: String,
                required: true
            },
            depart: {
                type: String,
                required: true
            }
        }
    ]
});

/*******************/
//FUNCTIONS
/*******************/
const Cruise = module.exports = mongoose.model('Cruise', CruiseSchema);

module.exports.add = (req, res) => {
    let cruise = new Cruise(req.body);

    cruise.save((err, cruise) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add cruise', cruise: cruise });
        }
        else {
            res.json({ success: true, msg: 'Cruise created' });
        }
    });
};

module.exports.update = (req, res) => {
    Cruise.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, cruise) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update cruise' });
        } else {
            res.json({ success: true, msg: 'Cruise updated' });
        }
    });
};

module.exports.delete = (req, res) => {
    Cruise.findByIdAndRemove({ _id: req.params.id }, (err, cruise) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete cruise' });
        }
        else {
            res.json({ success: true, msg: 'cruise deleted' });
        }
    });
};

module.exports.getAll = (req, res) => {
    Cruise.find({}, (err, cruises) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve cruises' });
        } else {
            res.json({ cruises });
        }

    });
};

module.exports.get = (req, res) => {
    Cruise.findById(req.params.id, (err, cruise) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve cruise' });
        } else {
            res.json({ cruise });
        }

    });
};

module.exports.getByRegion = (req, res) => {
    Cruise.find({ region: req.params.region }, (err, cruises) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve cruises' });
        } else {
            res.json({ cruises });
        }
    });
};
