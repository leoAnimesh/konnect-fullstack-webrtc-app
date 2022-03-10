const userModel = require("../models/userModel");

const findUser = async (filter) => {
  return await userModel.findOne(filter);
};

const createUser = async (data) => {
  return await userModel.create(data);
};

module.exports = { findUser, createUser };
