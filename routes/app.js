// importing express module
const express = require('express');

// define express router
const router = express.Router();

// import book model
const Book = require('../models/book');

// GET request for home page, render index page
router.get('/', (req, res) => {
  res.render('index', { title: 'Book trading club' });
});

// GET request for home page, get and return all books from database
router.get('/home', (req, res) => {
  Book.find({}, ((err, books) => {
    if (err) return res.status(500).json({title: 'An error occurred', error: err});
    res.status(200).json({message: 'Success', obj: books});
  }));
});

// export app router module
module.exports = router;