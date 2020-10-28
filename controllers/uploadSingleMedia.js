var Image = require('./../models/image');
var fs = require('fs');
const userData = require('../utility/token');

exports.getSingleMediaUpload = (req,res)=>{
    res.render('uploadSingleMedia', { title: 'Media Upload Page' });
}

exports.uploadImage = (req,res) =>{
    var obj = {
        userId:userData.foundUser._id,
        title: req.body.title,
        desc: req.body.desc,
        img: {
            data: new Buffer.from(fs.readFileSync(req.file.path), 'base64'),
            contentType: req.file.mimetype
        },
        tags:req.body.tags.split(',')
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.send({success:false,message:"Not uploaded"});
            res.end();
        }
        else {
            // item.save();
            console.log(userData.foundUser);
            res.redirect('/uploadSingleMedia');
        }
    });
}
