const userHelpers = require('./helpers');
const usersSrvc = require('./data-service');

exports.getUsers = async (req, res, next) => {
  try {
    let users = await usersSrvc.getUsers({
      filter: {},
      fields: 'name email'
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    let user = await usersSrvc.getUserOne({
      filter: userHelpers.getSingleFilter(req.params)
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let user = await usersSrvc.createUser({
      userData: userHelpers.parseUserParams(req.body)
    });
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await usersSrvc.findAndUpdateUser({
      filter: userHelpers.getSingleFilter(req.params),
      userData: userHelpers.parseUserParams(req.body)
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await usersSrvc.deleteUser({
      filter: userHelpers.getSingleFilter(req.params)
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
