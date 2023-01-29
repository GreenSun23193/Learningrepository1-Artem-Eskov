'use strict';

const userModel = require('../models/userModel.js');

const users = userModel.users;

const user_list_get0 = (usernum1) => users.filter((user) => {
    return user.id == usernum1;
  })

  const user_get = async (req, res) => {
    console.log(req.params.id);
    const ret = await userModel.getUser(req.params.id);
    console.log(ret);
    res.json(ret);
  };

const user_list_get_old = (req, res) => {
    res.json(users);
};

/*const user_list_get = (req, res) => {
  res.json(user_list_get0(req.params.id));
};*/

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

/*const user_post = (req, res, next) => {
  res.json(req.body)
  userModel.addUser(req.body.name, req.body.email, req.body.passwd)
};*/

const user_post = (req, res, next) => {
  var reply = {}
  reply.message = "Hey ho!"
  res.json(reply)
  userModel.addUser(req.body.name, req.body.email, req.body.passwd)
  //res.json("{ message: 'hi' }");
  //console.log(req);
  //console.log("REQ-RES DIVIDE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  //console.log(res);
};

module.exports = {
    user_list_get,
    user_list_get_old,
    user_post,
    user_get,
};

