const router = require('express').Router();
const nodemailer = require('nodemailer');
const validator = require('email-validator')

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.get('/', (req, res) => {
    res.status(400).json({success: "Welcome to the contact service"})
})

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    if(!name || !email || !message) {
        return res.status(400).json({
            errorMessage: "Please enter in all required fields"
        })
    }
    const checkedEmail = validator.validate(email)
    if(!checkedEmail) {
        return res.status(400).json({errorMessage: "Please enter in a valid email address"})
    }
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Web Contact Form Message from: ${email}`,
        text: `${name} says "${message}" \n \n \nContact them at ${email}`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
            return res.status(500).json({errorMessage: "Oops, Something went wrong."})
        } else {
            console.log('Email sent: ' + info.response)
            return res.status(200).json({
                success: "Thank you for reaching out! I will get back to you shortly."
            })
        }
    })
})

module.exports = router;