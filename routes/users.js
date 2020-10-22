var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/',passport.authenticate('jwt', { session: false }), function(req, res, next) {
  //res.status(200).send('If you get this data, you have been authenticated via JWT!');
});

module.exports = router;
