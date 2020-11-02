var Image = require('./../models/image');
var fs = require('fs');
var sessionstorage = require('sessionstorage');

exports.getMultipleMediaUpload = (req,res)=>{
    if(sessionstorage.getItem('USER_ID') == null)
    {
        res.render('login', { title: 'Login Page' });
    }else{
    res.render('uploadMultipleMedia', { title: 'Media Upload Page' });
    }
}

exports.uploadMultipleImage = (req,res) =>{
    const files = req.files;
    const objs = [];

    req.files.forEach(file=>{
        objs.push({

            title: req.body.title,
            desc: req.body.desc,
            img:{

                data: new Buffer.from(fs.readFileSync(file.path), 'base64'),
                contentType: file.mimetype
            },
            tags:req.body.tags.split(',')
        });
    })

    Image.insertMany(objs, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/uploadMultipleMedia');
        }
    });
}