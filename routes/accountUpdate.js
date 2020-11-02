var express = require('express');
var router = express.Router();
const accountController = require('../controllers/accountUpdate');



//GET : newsfeed page
router.get('/', accountController.getAccount);

//GET : newsfeed page
router.put('/:id', accountController.updateAccount);


module.exports = router;