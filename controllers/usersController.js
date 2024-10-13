const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);
    res.status(201).send(createdUser.get());
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  res.status(501).send('GET /api/users Not Implemented');
};

module.exports.getUserById = async (req, res, next) => {};

module.exports.updateUserById = async (req, res, next) => {};

module.exports.deleteUserById = async (req, res, next) => {};
