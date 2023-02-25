'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { addUser } = require('../models/userModel.js');

const { validationResult  } = require('express-validator');

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log("authenticate");
    console.log(err);
    console.log("authenticate 2");
    console.log(user);
    console.log("authenticate 3");
    console.log(info);
    console.log("authenticate 4");

    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }
   req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }
       // generate a signed son web token with the contents of user object and return it in the response
       const token = jwt.sign(user, 'your_jwt_secret');
       return res.json({user, token});
    });
})(req, res);
};

const user_create_post = async (req, res, next) => {
//const user_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req); // TODO require validationResult, see userController

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    console.log(req.body);
    res.send(errors.array());
  } else {
    // TODO: bcrypt password

    const params = [
      req.body.name,
      req.body.email,
      bcrypt.hashSync(req.body.passwd) // TODO: save hash instead of the actual password
    ];

    console.log(params);

    const result = await addUser(params);
    if (result.insertId) {
      res.json({ message: `User added`, user_id: result.insertId });
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  logout,
  user_create_post,
  //user_post,
};