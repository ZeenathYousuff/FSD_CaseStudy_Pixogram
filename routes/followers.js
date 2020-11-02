var express = require('express');
var router = express.Router();
const followerController = require('../controllers/followers');
var uploader = require("./../utility/uploader");


//GET : follower page
router.get('/', followerController.getFollowers);

// add follower
router.post('/',uploader.single('img'), followerController.addFollower);

// delete follower
router.delete('/:id', followerController.deleteFollowers);

module.exports = router;

