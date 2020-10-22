var express = require('express');
var router = express.Router();
const mediaController = require('../controllers/uploadMultipleMedia');

//GET : login page
router.get('/', mediaController.getMultipleMediaUpload);

module.exports = router;