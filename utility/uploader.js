
// using multer to store image in a folder called 'uploads'
var multer = require('multer'); 

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 

var uploader = multer({ storage: storage }); 

module.exports = uploader;