var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

var router = express.Router();

const multer = require('multer');
var storage = multer.memoryStorage()
var uploader = multer({ storage: storage });

var stream = require('stream');


var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    // console.log(mongoose.connection.db)

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "appvideos" });



    router.get('/:id', (req, res) => {
        try {
          var videoID = new mongoose.Types.ObjectId(req.params.id);
        } catch(err) {
          return res.json({success: false, message: "Invalid PhotoID in URL parameter." }); 
        }
      
        let downloadStream = bucket.openDownloadStream(videoID);
      
        downloadStream.on('data', (chunk) => {
          res.write(chunk);
        });
      
        downloadStream.on('error', () => {
          res.sendStatus(404);
        });
      
        downloadStream.on('end', () => {
          res.end();
        });
      });
      


    router.get('/', (req, res) => {

        // console.log()

        mongoose.connection.db.collection("appvideos.files").find({}, {}).toArray()
        .then(results => {
            // console.log(results)
            res.render('media/videos', {data: results.map(result=>{
                return {
                    _id: result._id, filename: result.filename
                }
            })});
        })
          .catch(error => {
              console.error(error);
              res.render('media/videos', {});

            })


    });

    router.post('/', uploader.single('video'), (req, res, next) => {

        console.log("file posted");
        // console.log(req.file);


        // Covert buffer to Readable Stream
    const readablePhotoStream = new stream.Readable();
    readablePhotoStream.push(req.file.buffer);
    readablePhotoStream.push(null);

        let uploadStream = bucket.openUploadStream(req.file.originalname);
        let id = uploadStream.id;
        readablePhotoStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error uploading file" });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
        });

    })


})




module.exports = router;
