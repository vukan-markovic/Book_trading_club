// importing moongose module and define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Comment Schema
var Comment = new Schema({
    content: {type: String},
    publishDate: {type: Date},
    username: {type: String},
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    grade: {type: Number},
    tag: {type: String}
},
{
    usePushEach: true
});

// export Comment model
module.exports = mongoose.model('Comment', Comment);