var express = require('express');
var router = express.Router();
const mediaController = require('../controllers/uploadMultipleMedia');
var uploader = require("./../utility/uploader");

//GET : upload media page
router.get('/', mediaController.getMultipleMediaUpload);

//POST: upload mutiple media
router.post('/', uploader.array('img', 12),mediaController.uploadMultipleImage);

module.exports = router;