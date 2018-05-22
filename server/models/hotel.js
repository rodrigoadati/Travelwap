const mongoose = require('mongoose');

// Hotel Schema
const HotelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    region: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    propertyFeature: {
        wifi: {
            type: Boolean,
            required: true
        },
        bbq: {
            type: Boolean,
            required: true
        },
        library: {
            type: Boolean,
            required: true
        },
        bicycle: {
            type: Boolean,
            required: true
        },
        dining: {
            type: Boolean,
            required: true
        }
    },
    roomFeature: {
        airConditioning: {
            type: Boolean,
            required: true
        },
        fan: {
            type: Boolean,
            required: true
        },
        sharedFacilities: {
            type: Boolean,
            required: true
        },
        dvd: {
            type: Boolean,
            required: true
        },
        tv: {
            type: Boolean,
            required: true
        },
        fridge: {
            type: Boolean,
            required: true
        }
    },
    featured: {
        type: Boolean,
        required: true
    }
});

const Hotel = module.exports = mongoose.model('Hotel', HotelSchema);

module.exports.add = (req, res) => {
    let hotel = new Hotel(req.body);

    hotel.save((err, hotel) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add hotel', hotel: hotel });
        }
        else {
            res.json({ success: true, msg: 'Hotel created' });
        }
    });
};

module.exports.update = (req, res) => {
    Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, hotel) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update hotel' });
        } else {
            res.json({ success: true, msg: 'Hotel updated' });
        }
    });
};

module.exports.delete = (req, res) => {
    Hotel.findByIdAndRemove({ _id: req.params.id }, (err, hotel) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete hotel' });
        }
        else {
            res.json({ success: true, msg: 'hotel deleted' });
        }
    });
};

module.exports.getAll = (req, res) => {
    Hotel.find({}, (err, hotels) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve hotels' });
        } else {
            res.json({ hotels });
        }

    });
};

module.exports.getAllFeatured = (req, res) => {
    Hotel.find({ featured: true }, (err, hotels) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve hotels' });
        } else {
            res.json({ hotels });
        }

    });
};

module.exports.get = (req, res) => {
    Hotel.findById(req.params.id, (err, hotel) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve hotel' });
        } else {
            res.json({ hotel });
        }

    });
};

module.exports.getByRegion = (req, res) => {
    Hotel.find({ region: req.params.region }, (err, hotels) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve hotels' });
        } else {
            res.json({ hotels });
        }

    });
};
