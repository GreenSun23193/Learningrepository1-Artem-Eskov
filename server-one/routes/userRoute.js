'use strict';

const express = require('express')
const router3 = express.Router()

router3.use(express.static('public'));

const userController = require('../controllers/userController.js');

//router3.get('/user', userController.user_list_get_old);

router3.get('/user/:id', userController.user_list_get);

//router3.post('/user', userController.user_list_get_old);

router3.post('/user/:id', userController.user_list_get);

router3.post('/user', userController.user_post);

module.exports = router3