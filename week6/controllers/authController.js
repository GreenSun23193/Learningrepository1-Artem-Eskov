'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { addUser } = require('../models/userModel.js');

const { validationResult  } = require('express-validator');

const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {

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
       const token = jwt.sign(user, 'your_jwt_secret');
       return res.json({user, token});
    });
})(req, res);
};

const user_create_post = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    console.log(req.body);
    res.send(errors.array());
  } else {

    const params = [
      req.body.name,
      req.body.email,
      bcrypt.hashSync(req.body.passwd)
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
};