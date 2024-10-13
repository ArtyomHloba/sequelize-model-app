const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('./../models');
const createHttpError = require('http-errors');
const { where } = require('sequelize');
const { raw } = require('express');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const SALT_RAUNDS = 10;
    body.passwHash = await bcrypt.hash(body.passwHash, SALT_RAUNDS);

    const createdUser = await User.create(body);

    const prepatedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: prepatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const {
    query: { page, results },
  } = req;

  const limit = results;
  const offset = (page - 1) * results;

  try {
    const foundUsers = await User.findAll({
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
      limit,
      offset,
      raw: true,
      orrder: ['id'],
    });
    res.status(200).send(foundUsers);
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findByPk(userId, {
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
    });

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    const [, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      raw: true,
      returning: true,
    });

    if (!updatedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const prepatedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: prepatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const deletedCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(204).send({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
