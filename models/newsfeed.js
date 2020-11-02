const mongoose = require('mongoose');
var NewsfeedSchema = new mongoose.Schema({
	userId: String,
    dateTime:Date,
    newsfeedTitle:String
}); 

module.exports = new mongoose.model('newsfeed', NewsfeedSchema); 