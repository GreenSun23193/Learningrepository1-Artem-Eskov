'use strict';

const userModel = require('../models/userModel.js');

const users = userModel.users;

const user_get = async (req, res) => {
  console.log(req.params.id);

  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    console.log(errors);
    return res.status(500).json({message: "User has been submitted poorly or an internal error has occured."});
  }

  const ret = await userModel.getUser(req.params.id);
  console.log(ret);
  res.json(ret);
};

const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({ user: req.user[0] });
  }
 };

const user_list_get_old = (req, res) => {
    res.json(users);
};

const user_list_get = async (req, res) => {
  console.log("listget");
  const users = await userModel.getAllUsers();
  res.json(users);
};

const { body, validationResult  } = require('express-validator');

module.exports = {
    user_list_get,
    user_list_get_old,
    user_get,
    checkToken,
};
