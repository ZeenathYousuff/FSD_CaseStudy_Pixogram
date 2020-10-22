var mongoose = require('mongoose');

// Connecting to the database  
mongoose.connect("mongodb://localhost:27017/pixogram", 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    err => { 
        console.log('connected') 
    }); 