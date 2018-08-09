// importing moongose module and define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Book Schema
var Book = new Schema({
    title: {type: String},
    price: {type: Number},
    genre: {type: String},
    author: {type: String},
    publishDate: {type: Date},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    about: {type: String},
    solded: {type: Boolean},
    userBuyerId: {type: String},
    username: {type: String},
    image: {type: String, default: 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitaeh4NFdB9ev1-t8zG4a71jJgce64lkvEHLCFSHaqWpT1bA"}
},
{
    usePushEach: true
});

// export Book model
module.exports = mongoose.model('Book', Book);