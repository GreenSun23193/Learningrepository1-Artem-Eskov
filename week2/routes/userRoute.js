'use strict';

const express = require('express')
const routerUserRoute = express.Router()

const { body } = require('express-validator');

routerUserRoute.use(express.static('public'));

const userController = require('../controllers/userController.js');

routerUserRoute.route('/user/:id')
  .get(userController.user_get)
  .post(userController.user_get);

  routerUserRoute.route('/user')
  .get(userController.user_list_get)
  .post(
    [
      body('name').not().isEmpty().trim().escape().isLength({ min: 3, max: undefined }),
      body('email').not().isEmpty().isEmail().normalizeEmail(),
      body('passwd').not().isEmpty().isStrongPassword(
        {minLength: 8, minUppercase: 1, minNumbers:0,
        minLowercase:0, minSymbols:0})
  
    ],
    userController.user_post);

module.exports = routerUserRoute
