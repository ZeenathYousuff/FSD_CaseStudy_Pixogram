const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SampleUser', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(function () {
}).catch(reason => {
    console.log('error connecting.');
});

const Followers = mongoose.Schema({
    userId:  String,
    followUserId:String
});

module.exports = new mongoose.model('Followers', Followers);
