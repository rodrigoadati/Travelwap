const express = require('express');
const router = express.Router();
const Email = require('../models/email');

router.post('/send', Email.send);

module.exports = router;