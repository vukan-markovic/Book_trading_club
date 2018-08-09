// importing moongose module and define schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Schema
var Post = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: { type: String }
},
{
    usePushEach: true
});

// export Post model
module.exports = mongoose.model('Post', Post);