// importing modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// define express router
const router = express.Router();

// importing user model
const User = require('../models/user');

// GET request for all users, request can be sent only by admin
router.get('/', (req, res) => {

    // find and return all users from database
    User.find({}, ((err, users) => {
      if (err) return res.status(500).json({title: 'An error occurred', error: err});
      res.status(200).json({message: 'Success', obj: users});
    }));
});

// GET request for one user
router.get('/:id', function (req, res) {

    // find and return user with provided id in database
    User.findById(req.params.id, (err, user) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            res.status(200).json({message: 'Success', obj: user});
    });
});

// POST request for registration
router.post('/register', (req, res) => {
    
    // create new user object
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        contry: req.body.country,
        city: req.body.city,
        postalCode: req.body.postalCode,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    });

    // save user to database
    user.save((err, result) => {
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        res.status(201).json({message: 'User created', obj: result});
        
        // send user welcome email after registration
        sendEmail(user);
    });
});

// POST request for login
router.post('/login', (req, res) => {

    // find user to database with provided email and password, checking for errors
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).json({title: 'An error occurred', error: err});

        // no user with provided email address
        if (!user) return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid email and/or password!'}
        });
        
        // passwords does not maches
        if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).json({
            title: 'Login failed', 
            error: {message: 'Invalid email and/or password!'}
        });
        
        // login is success, create token for that user
        const token = jwt.sign({user: user}, 'secret', {expiresIn: 10800});
        res.status(200).json({message: 'Successfully logged in', token: token, userId: user._id});
    });
});

// PATCH request for changing user profile picture
router.patch('/:id', (req, res) => {

    // decode provided user token
    const decoded = jwt.decode(req.query.token);

    /// find user with provided id in database
    User.findById(req.params.id, (err, user) => {
        // check for errors
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        if (!user) return res.status(500).json({
            title: 'No User Found!', 
            error: {message: 'User not found'}
        });
        if (user.id !== decoded.user._id) return res.status(401).json({
            title: 'Not Authenticated', 
            error: {message: 'Users do not match'}
        });
        // update user profile image
        user.image = req.body.image;
        // save updated user to database
        user.save((err, result) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            res.status(200).json({message: 'Updated user image', obj: result});
        });
    });
});

// send greeting email to user after registration
function sendEmail (user) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'booktadingclub@gmail.com',
          pass: 'PASSWORD_GOES_HERE'
        }
      });
      var mailOptions = {
        from: 'booktadingclub@gmail.com',
        to: user.email,
        subject: 'Welcome to book trading club!',
        html: '<h1>Greeting message</h1><img src="http://www.off-the-recordmessaging.com/wp-content/uploads/2016/04/Thanks-For-Joining-Us1.jpg" /><p>We hope that you will enjoy in our site, find book that you looking for and sell some books too!</p>'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
      });
}

// export user router module
module.exports = router;