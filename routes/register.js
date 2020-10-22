const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var Users = require('./../models/register');
var uploader = require("./../utility/uploader");
const userController = require('../controllers/register');

//GET : register page
router.get('/', userController.getRegisterUser);

//POST:register a new user
router.post('/', uploader.single('img'),userController.registerUser);

//GET:check a user exist
router.get('/isUserExist/:username', userController.checkUser);

module.exports = router;