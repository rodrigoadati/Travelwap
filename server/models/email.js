const mongoose = require('mongoose');
var nodemailer = require('nodemailer');

//Email Schema
const EmailSchema = mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        require: true
    },
    html: {
        type: String,
        required: true
    }
});

/*******************/
//FUNCTIONS
/*******************/
const Email = module.exports = mongoose.model('Email', EmailSchema);

module.exports.send = (req, res) => {
    let email = new Email(req.body);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'travelwaps@gmail.com', 
            pass: 'hersonkc'  
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Contact" <travelwaps@gmail.com>', // sender address
        to: email.to, // list of receivers
        subject: email.subject, // Subject line
        text: email.text, // plain text body
        html: email.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('rended');
    });
};

