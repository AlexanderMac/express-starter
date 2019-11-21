const DataBuilder = require('n-params-processor').DataBuilder;
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
    let dataBuilder = new DataBuilder({ source: req.params });
    dataBuilder.parseObjectId({ name: '_id', required: true });

    let user = await usersSrvc.getUserOne({
      filter: dataBuilder.build(),
      fields: 'name email'
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let dataBuilder = new DataBuilder({ source: req.body });
    dataBuilder.parseString({ name: 'name', required: true });
    dataBuilder.parseEmail({ name: 'email', required: true });

    let user = await usersSrvc.createUser({ userData: dataBuilder.build() });
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let filterBuilder = new DataBuilder({ source: req.params });
    filterBuilder.parseObjectId({ source: req.params, name: '_id', required: true });

    let dataBuilder = new DataBuilder({ source: req.body });
    dataBuilder.parseString({ name: 'name', required: true });
    dataBuilder.parseEmail({ name: 'email', required: true });

    await usersSrvc.findAndUpdateUser({
      filter: filterBuilder.build(),
      userData: dataBuilder.build()
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let filterBuilder = new DataBuilder();
    filterBuilder.parseObjectId({ source: req.params, name: '_id', required: true });

    await usersSrvc.deleteUser({ filter: filterBuilder.build() });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
