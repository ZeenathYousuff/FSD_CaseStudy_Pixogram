var express = require('express');
var router = express.Router();
const mediaController = require('../controllers/uploadSingleMedia');
var uploader = require("./../utility/uploader");

//GET : login page
router.get('/', mediaController.getSingleMediaUpload);

// Uploading the image
router.post('/', uploader.single('img'), mediaController.uploadImage);



module.exports = router;