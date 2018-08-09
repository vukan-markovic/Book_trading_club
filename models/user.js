// importing moongose module and define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

// User Schema
var User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    contry: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    image: {type: String, default: "https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png"}
}, {
    usePushEach: true
});

// plugin mongooseUniqueValidator to User schema
User.plugin(mongooseUniqueValidator);

// export User model
module.exports = mongoose.model('User', User);