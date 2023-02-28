'use strict';
const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authController');
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', login);

router.get('/logout', authController.logout);

router.post('/register',
    [
      body('name', 'minimum 3 characters').isLength({min: 3}),
      body('email', 'email is not valid').isEmail(),
      body('passwd', 'at least one upper case letter').
          matches('(?=.*[A-Z]).{8,}'),
      sanitizeBody('name').escape(),
    ],
    authController.user_create_post
);

module.exports = router;
