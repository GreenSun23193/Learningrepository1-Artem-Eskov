'use strict';

const express = require('express')
const routerUserRoute = express.Router()

const { body } = require('express-validator');

routerUserRoute.use(express.static('public'));

const userController = require('../controllers/userController.js');

routerUserRoute.get('/token', userController.checkToken);

routerUserRoute.route('/:id')
  .get(userController.user_get)
  .post(userController.user_get);

  routerUserRoute.route('/')
  .get(userController.user_list_get);

module.exports = routerUserRoute
