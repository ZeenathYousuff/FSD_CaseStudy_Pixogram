var express = require('express');
var router = express.Router();
const mediaController = require('../controllers/uploadSingleMedia');

//GET : login page
router.get('/', mediaController.getSingleMediaUpload);

module.exports = router;