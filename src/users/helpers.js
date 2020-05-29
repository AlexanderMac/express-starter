const DataBuilder = require('n-params-processor').DataBuilder;

exports.getSingleFilter = (source) => {
  let dataBuilder = new DataBuilder({ source });
  dataBuilder.parseObjectId({ name: 'userId', required: true });

  return {
    _id: dataBuilder.build()['userId']
  };
};

exports.parseUserParams = (source) => {
  let dataBuilder = new DataBuilder({ source });
  dataBuilder.parseString({ name: 'name', required: true });
  dataBuilder.parseEmail({ name: 'email', required: true });

  return dataBuilder.build();
};
