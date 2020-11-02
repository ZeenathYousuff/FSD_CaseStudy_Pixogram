var Image = require('./../models/image');
var fs = require('fs');
var sessionstorage = require('sessionstorage');

exports.getSingleMediaUpload = (req,res)=>{
    console.log(sessionstorage.getItem('USER_ID')); 
    if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{
        res.render('uploadSingleMedia', { title: 'Media Upload Page' });
    }
    
}

exports.uploadImage = (req,res) =>{
    var obj = {
        userId:sessionstorage.getItem('USER_ID'),
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
             console.log(obj);
             res.redirect('/uploadSingleMedia');
        }
    });
}
