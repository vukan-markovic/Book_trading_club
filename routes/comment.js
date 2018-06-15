//import express module
const express = require('express');

//define express router
const router = express.Router();

//import jsonwebtoke for authentication
const jwt = require('jsonwebtoken');

// importing models
const Book = require('../models/book');
const Comment = require('../models/comment');

// GET request for all comments for book
router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) return res.status(500).json({
            title: 'An error occurred on finding comment', 
            error: err
        });
        Comment.find({book: book}, (err, comments) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on finding comment', 
                error: err
            });
            res.status(200).json({message: 'Success on getting book comments', obj: comments});
        });
    });
});

// check if user is logged in for all future routes
router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err) => {
        if (err) return res.status(401).json({title: 'Not Authenticated', error: err});
        next();
    })
});

// POST request for adding new comment
router.post('/:id', (req, res) => {

    // find user with provided id
    Book.findById(req.params.id, (err, book) => {
        
        // check for error
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        if (!book) return res.status(500).json({
            title: 'No book found!', 
            error: {message: 'Book with provided is not found in database'}
        });

        // create new comment
        const comment = new Comment({
            content: req.body.content, 
            publishDate: Date.now(), 
            username: req.body.username, 
            book: book,
            grade: req.body.grade,
            tag: req.body.tag
        });

        // save new comment
        comment.save((err, result) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            res.status(201).json({message: 'Saved comment', obj: result});
        });
    });
});

// export post router module
module.exports = router;