var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('mongodb');

const multer = require('multer');
var storage = multer.memoryStorage()
var uploader = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 } });

// const mongodb = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

/**
 * NodeJS Module dependencies.
 */
const { Readable } = require('stream');

router.get('/', (req, res) => {
    res.render('media/videos', {});
});

router.post('/', uploader.single('video'), (req, res, next) => {

    console.log(mongoose.connection.name);

    // res.json({success: true, data: mongoose.connection.name})

    let videoName = req.file.originalname;

    // Covert buffer to Readable Stream
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(req.file.buffer);
    readablePhotoStream.push(null);
// _connectionString
    let bucket = new mongodb.GridFSBucket(mongoose.connection.name, {
        bucketName: 'videos'
    });

    let uploadStream = bucket.openUploadStream(videoName);
    let id = uploadStream.id;
    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('error', () => {
        return res.json({ success: false, message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
        return res.json({ success: true, message: "File uploaded successfully", data: id });
    });

    // res.json({ success: true, data: req.file })

})


module.exports = router;
