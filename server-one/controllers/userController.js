'use strict';

const userModel = require('../models/userModel.js');

const users = userModel.users;

const user_list_get0 = (usernum1) => users.filter((user) => {
    return user.id == usernum1;
  })

const user_list_get_old = (req, res) => {
    res.json(users);
};

const user_list_get = (req, res) => {
  res.json(user_list_get0(req.params.id));
};

module.exports = {
    user_list_get,
    user_list_get_old,
};

