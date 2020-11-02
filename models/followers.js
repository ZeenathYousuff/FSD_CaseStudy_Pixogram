const mongoose = require('mongoose');
var FollowerSchema = new mongoose.Schema({
	userId: String,
    followFirstName:String,
    followLastName:String,
    followEmail:String,
    img: 
	{ 
		data: Buffer, 
		contentType: String 
    },
}); 

module.exports = new mongoose.model('followers', FollowerSchema); 
