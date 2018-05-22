const mongoose = require('mongoose');

// Voucher Schema
const VoucherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    }
});

const Voucher = module.exports = mongoose.model('Voucher', VoucherSchema);

module.exports.addVoucher = (req, res) => {
    let voucher = new Voucher(req.body);
    voucher.save((err, voucher) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to create voucher' });
        }
        res.json({ success: true, msg: 'Voucher created' });
    });
};

module.exports.updateVoucher = (req, res) => {
    Voucher.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, voucher) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update voucher' });
        }
        res.json({ success: true, msg: 'Voucher updated' });
    });
};

module.exports.deleteVoucher = (req, res) => {
    Voucher.findByIdAndRemove({ _id: req.params.id }, (err, hotel) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete voucher' });
        }
        res.json({ success: true, msg: 'Voucher deleted' });
    });
};

module.exports.getAllVouchers = (req, res) => {
    Voucher.find({}, (err, vouchers) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve vouchers' });
        }
        res.json({ vouchers });
    });
};

module.exports.getVoucher = (req, res) => {
    Voucher.findById(req.params.id, (err, voucher) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve voucher' });
        }
        res.json({ voucher });
    });
};

module.exports.getVoucherByCode = (req, res) => {
    Voucher.find({ code: req.params.code }, (err, voucher) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to retrieve voucher' });
        }
        res.json({ voucher });
    });
};