// importing modules
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importing routes
const appRoutes = require('./routes/app');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// define express application
const app = express();

// importing database url
const database = require('./config/database.js');

// set up mongoose promise to global promise 
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(database.url, { useMongoClient: true}, (error) => {
  if (error) console.log('Error on connecting to database');
  else console.log('Connected to database: '  + database.url);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up static resources
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// set up logging for development
app.use(logger('dev'));

// set up body parser and cookie parser modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// set up headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// define routes
app.use('/book', bookRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res) {
  return res.render('index');
});

// export app module
module.exports = app;