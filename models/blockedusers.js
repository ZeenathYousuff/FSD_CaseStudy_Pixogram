const mongoose = require('mongoose');
var BlockedUserSchema = new mongoose.Schema({
	userId: String,
    blockedFirstName:String,
    blockedLastName:String,
    blockedEmail:String,
    img: 
	{ 
		data: Buffer, 
		contentType: String 
    },
}); 

module.exports = new mongoose.model('blockedusers', BlockedUserSchema);
