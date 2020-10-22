var express = require('express');
var router = express.Router();

var Image = require('./../models/image');
var uploader = require("./../utility/uploader");

var fs = require('fs');
// var path = require('path'); 

// Retriving all the images 
// /api/pixogram/media/images
router.get('/', (req, res) => {
    Image.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.render('media/images', { images: images });
        }
    });
});



// Uploading the image 
router.post('/', uploader.single('image'), (req, res, next) => {
    // router.post('/', uploader.array('image'), (req, res, next) => { 

    // console.log(req.body);
    // console.log(req.file);
    var obj = {
        caption: req.body.caption,
        description: req.body.description,
        img: {
            data: new Buffer.from(fs.readFileSync(req.file.path), 'base64'),
            contentType: req.file.mimetype
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            // item.save(); 
            res.redirect('/api/pixogram/media/images');
        }
    });
});

// Uploading the images 
router.post('/many', uploader.array('image', 12), (req, res, next) => {

        const files = req.files;
        const objs = [];

        req.files.forEach(file=>{
            objs.push({
                img: {
                    data: new Buffer.from(fs.readFileSync(file.path), 'base64'),
                    contentType: file.mimetype
                }
            });
        })

    Image.insertMany(objs, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save(); 
            res.redirect('/api/pixogram/media/images');
        }
    });
});

module.exports = router;
