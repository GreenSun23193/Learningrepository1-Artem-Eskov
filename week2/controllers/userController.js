'use strict';

const userModel = require('../models/userModel.js');

const users = userModel.users;

const user_get = async (req, res) => {
  console.log(req.params.id);

  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    console.log(errors);
    return res.status(500).json({message: "bad user"});
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

const user_post = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    console.log(errors);
    return res.status(500).json({message: "bad user"});
  }

  var reply = {}
  reply.message = "Hey ho!"
  res.json(reply)
  userModel.addUser(req.body.name, req.body.email, req.body.passwd)
};

module.exports = {
    user_list_get,
    user_list_get_old,
    user_post,
    user_get,
    checkToken,
};
