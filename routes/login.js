var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login');

//GET : login page
router.get('/', loginController.getLoginUser);

//POST: login user
router.post('/', loginController.loginUser);

module.exports = router;