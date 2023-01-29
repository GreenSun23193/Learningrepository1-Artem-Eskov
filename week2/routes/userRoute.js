'use strict';

const express = require('express')
const routerUserRoute = express.Router()

routerUserRoute.use(express.static('public'));

const userController = require('../controllers/userController.js');

routerUserRoute.route('/user/:id')
  .get(userController.user_get)
  .post(userController.user_get);

  routerUserRoute.route('/user')
  .get(userController.user_list_get)
  .post(userController.user_post);

module.exports = routerUserRoute
