//import express module
const express = require('express');

//define express router
const router = express.Router();

//import jsonwebtoke for authentication
const jwt = require('jsonwebtoken');

// importing models
const User = require('../models/user');
const Post = require('../models/post');

// GET request all posts
router.get('/', (req, res) => {
    Post.find({}, ((err, posts) => {
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        res.status(200).json({message: 'Success', obj: posts});
    }));
});

// GET request for one post
router.get('/:id', function (req, res) {

    // find post with provided id
    Post.findById(req.params.id, (err, post) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            console.log(post);
            res.status(200).json({message: 'Success', obj: post});
        });
});

// check if user is logged in for all future routes
router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err) => {
        if (err) return res.status(401).json({title: 'Not Authenticated', error: err});
        next();
    })
});


// POST request for adding new post
router.post('/', (req, res) => {

    // decode provided user token
    const decoded = jwt.decode(req.query.token);

    // find user with provided id
    User.findById(decoded.user._id, (err, user) => {
        
        // check for error
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        
        // create new post
        const post = new Post({
            title: req.body.title, 
            content: req.body.content, 
            user: user, 
            username: req.body.username
        });

        // save new post to database
        post.save((err, result) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            res.status(201).json({message: 'Saved post', obj: result});
        });
    });
});

// PATCH request for updating post by admin
router.patch('/:id', (req, res) => {

    // find book in database with provided id
    Post.findById(req.params.id, (err, post) => {

        // check for errors
        if (err) return res.status(500).json({
            title: 'An error occurred', 
            error: err
        });
        if (!post) return res.status(500).json({
            title: 'No Post Found!', 
            error: {message: 'Post not found'}
        });

        // update post
        post.title = req.body.title;
        post.content = req.body.content;
        
        // save updated post to database
        post.save((err, result) => {
            if (err) return res.status(500).json({
                title: 'An error occurred on updating post', 
                error: err
            });
            res.status(200).json({message: 'Updated post', obj: result});
        });
    });
});

// DELETE request for deleting post by admin
router.delete('/:id', (req, res) => {

    // find post with provided id
    Post.findById(req.params.id, (err, post) => {

        // check for errors
        if (err) return res.status(500).json({title: 'An error occurred', error: err});
        if (!post) return res.status(500).json({
            title: 'No Post Found!', 
            error: {message: 'Post not found'}
        });

        // remove post from database    
        post.remove((err, result) => {
            if (err) return res.status(500).json({title: 'An error occurred', error: err});
            res.status(200).json({message: 'Deleted post', obj: result});
        });
    });
});

// export post router module
module.exports = router;