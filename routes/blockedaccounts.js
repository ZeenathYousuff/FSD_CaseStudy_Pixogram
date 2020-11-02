var express = require('express');
var router = express.Router();
const blockedaccountController = require('../controllers/blockedaccounts');
var uploader = require("./../utility/uploader");


//GET : blocked account page
router.get('/', blockedaccountController.getBlockedAccounts);

// block account
router.post('/',uploader.single('img'), blockedaccountController.blockAccount);

// delete follower
router.delete('/:id', blockedaccountController.unblockAccounts);

module.exports = router;


