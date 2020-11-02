const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Pixogram', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(function () {
}).catch(reason => {
    console.log('error connecting.');
});

const Users = mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },

    username: {
        type: String,
        minlength: 8,
        maxlength: 12,

    },
    email: {
        type: String,
    },
    dob:{
       type:Date,
    },
    password: {
        type: String,
    },
    img:
        {
            data: Buffer,
            contentType: String
        }
});

module.exports = new mongoose.model('Users', Users);