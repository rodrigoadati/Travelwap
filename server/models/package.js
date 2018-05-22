const mongoose = require('mongoose');

//Package Schema
const PackageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    expireDate: {
        type: Date,
        required: true
    }
});

/*******************/
//FUNCTIONS
/*******************/
const Package = module.exports = mongoose.model('Package', PackageSchema);

module.exports.add = (req, res) => {
    let package = new Package(req.body);

    package.save((err, package) => {
        if (err) {            
            res.json({ success: false, msg: 'Failed to add package', package: package });
        }
        else {
            res.json({ success: true, msg: 'Package created' });
        }
    });
};

module.exports.update = (req, res) => {
    Package.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, package) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update package' });
        } else {
            res.json({ success: true, msg: 'Package updated' });
        }
    });
};

module.exports.delete = (req, res) => {
    Package.findByIdAndRemove({ _id: req.params.id }, (err, package) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete package' });
        }
        else {
            res.json({ success: true, msg: 'package deleted' });
        }
    });
};

module.exports.getAll = (req, res) => {
    Package.find({"expireDate": {$gt: new Date()}}, (err, packages) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve packages' });
        } else {
            res.json({ packages });
        }

    });
};


module.exports.getAllNoFilter = (req, res) => {
    Package.find({}, (err, packages) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve packages' });
        } else {
            res.json({ packages });
        }

    });
};


module.exports.get = (req, res) => {
    Package.findById(req.params.id, (err, package) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve package' });
        } else {
            res.json({ package });
        }

    });
};

module.exports.getByRegion = (req, res) => {
    Package.find({ region: req.params.region }, (err, packages) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve packages' });
        } else {
            res.json({ packages });
        }
    });
};
