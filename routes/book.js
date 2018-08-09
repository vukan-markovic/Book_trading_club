// import express module
const express = require('express');

// define express router
const router = express.Router();

// import jsonwebtoke for authentication
const jwt = require('jsonwebtoken');

// importing models
const User = require('../models/user');
const Book = require('../models/book');

// GET request for all users books
router.get('/', function (req, res) {
    // find all books for specified user
    Book.find()
        .populate('user', 'firstName')
        .exec((err, books) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on getting user\'s books', 
                error: err
            });
            res.status(200).json({message: 'Success on getting user\'s books', obj: books});
    });
});

// GET request for one book
router.get('/:id', function (req, res) {

    // find book in database with provided id
    Book.findById(req.params.id, (err, book) => {

        // check for error
        if (err) return res.status(500).json({
            title: 'An error occurred on getting book',
            error: err
        });
        res.status(200).json({message: 'Success on getting book', obj: book});
    });
});

// verify that user is logged in for all future routes
router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err) => {
        if (err) return res.status(401).json({title: 'Not Authenticated', error: err});
        next();
    })
});

// POST request for adding new book
router.post('/', (req, res) => {

    // decode user provided token
    const decoded = jwt.decode(req.query.token);

    // find user in database which send request
    User.findById(decoded.user._id, (err, user) => {
        
        // check for errors
        if (err) return res.status(500).json({
            title: 'An error occurred on finding user', 
            error: err
        });
        if (!user) return res.status(500).json({
            title: 'No user found!', 
            error: {message: 'User with provided is not found in database'}
        });
        // empty object
        var book = {};
        // if user provided book cover image set that image as book cover image
        if (req.body.image !== null) {
        book = new Book({
                title: req.body.title,
                price: req.body.price,
                genre: req.body.genre,
                author: req.body.author,
                publishDate: Date.now(),
                user: user,
                about: req.body.about,
                solded: false,
                userBuyerId: "",
                username: req.body.username,
                image: req.body.image,
            });
        }

        // else put default book cover image
        else {
            book = new Book({
                title: req.body.title,
                price: req.body.price,
                genre: req.body.genre,
                author: req.body.author,
                publishDate: Date.now(),
                user: user,
                about: req.body.about,
                solded: false,
                userBuyerId: "",
                username: req.body.username
            });
        }

        // save new book to database
        book.save((err, result) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on adding new book', 
                error: err
            });
            res.status(201).json({message: 'Saved book', obj: result});
        });
    });
});

// PATCH request for updating book
router.patch('/:id', (req, res) => {

    // decode provided user token
    const decoded = jwt.decode(req.query.token);

    // find book in database with provided id
    Book.findById(req.params.id, (err, book) => {

        // check for errors
        if (err) return res.status(500).json({
            title: 'An error occurred', 
            error: err
        });
        if (!book) return res.status(500).json({
            title: 'No Book Found!', 
            error: {message: 'Book not found'}
        });
        if (book.user != decoded.user._id) return res.status(401).json({
            title: 'Not Authenticated', 
            error: {message: 'Users do not match'}
        });

        // update book
        book.title = req.body.title;
        book.price = req.body.price;
        book.genre = req.body.genre;
        book.author = req.body.author;
        book.about = req.body.about;
        book.image = req.body.image;
        
        // save updated book to database
        book.save((err, result) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on updating book', 
                error: err
            });
            res.status(200).json({message: 'Updated book', obj: result});
        });
    });
});
// PATCH request for updating book by admin, admin can update any book
router.patch('/admin/:id', (req, res) => {
    // find book in database with provided id
    Book.findById(req.params.id, (err, book) => {
        // check for errors
        if (err) return res.status(500).json({
            title: 'An error occurred', 
            error: err
        });
        if (!book) return res.status(500).json({
            title: 'No Book Found!', 
            error: {message: 'Book not found'}
        });
        // update book
        book.title = req.body.title;
        book.price = req.body.price;
        book.genre = req.body.genre;
        book.author = req.body.author;
        book.about = req.body.about;
        book.image = req.body.image;
        
        // save updated book to database
        book.save((err, result) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on updating book', 
                error: err
            });
            res.status(200).json({message: 'Updated book', obj: result});
        });
    });
});

// DELETE request for deleting book
router.delete('/:id', (req, res) => {
    // decode provided user token
    const decoded = jwt.decode(req.query.token);
    // find book in database with provided id
    Book.findById(req.params.id, (err, book) => {
        // check for errors
        if (err) return res.status(500).json({
            title: 'An error occurred', 
            error: err
        });
        if (!book) return res.status(500).json({
            title: 'No Book Found!', 
            error: { message: 'Book not found'}
        });
        if (book.user != decoded.user._id) return res.status(401).json({
            title: 'Not Authenticated', 
            error: {message: 'Users do not match'}
        });
                        
        // remove book from database
        book.remove((err, result) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on removing book', 
                error: err
            });
            res.status(200).json({message: 'Deleted book', obj: result});
        });
    });
});

// DELETE request for deleting book by admin, admin can delete all books
router.delete('/admin/:id', (req, res) => {
    // find book with provided id in database
    Book.findById(req.params.id, (err, book) => {
        
        // checking for errors
        if (err) return res.status(500).json({
            title: 'An error occurred', 
            error: err
        });
        if (!book) return res.status(500).json({
            title: 'No Book Found!', 
            error: { message: 'Book not found'}
        });
        
        // remove book from database
        book.remove((err, result) => {
            if (err) return res.status(500).json({
                title: 'An error occurred while removing book by admin', 
                error: err
            });
            res.status(200).json({message: 'Deleted book', obj: result});
        });
    });
});

// PATCH request for updating book that is solded
router.patch('/sold/:id', (req, res) => {
    // find book with provided id in database
    Book.findById(req.params.id, (err, book) => {

        // check for errors
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        if (!book) return res.status(500).json({
            title: 'No Book Found!', 
            error: {message: 'Book not found'}
        });
        // update book
        book.userBuyerId = req.body.userBuyerId;
        book.solded = true;

        // save updated book to database
        book.save((err, result) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            res.status(200).json({message: 'Updated book', obj: result});
        });
    });
});

// export book router module
module.exports = router;