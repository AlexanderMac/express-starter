import paramsProc from 'n-params-processor'

const { DataBuilder } = paramsProc

function getSingleFilter(source) {
  const dataBuilder = new DataBuilder({ source })
  dataBuilder.parseObjectId({ name: 'userId', required: true })

  return {
    _id: dataBuilder.build()['userId']
  }
}

function parseUserParams(source) {
  const dataBuilder = new DataBuilder({ source })
  dataBuilder.parseString({ name: 'name', required: true })
  dataBuilder.parseEmail({ name: 'email', required: true })

  return dataBuilder.build()
}

export default {
  getSingleFilter,
  parseUserParams
}
