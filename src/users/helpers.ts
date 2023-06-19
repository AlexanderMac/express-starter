import { DataBuilder } from 'n-params-processor'

function getSingleFilter(source: any) {
  // @ts-ignore
  const dataBuilder = new DataBuilder({ source }) as any
  dataBuilder.parseObjectId({ name: 'userId', required: true })

  return {
    _id: dataBuilder.build()['userId'],
  }
}

function parseUserParams(source: any) {
  // @ts-ignore
  const dataBuilder = new DataBuilder({ source }) as any
  dataBuilder.parseString({ name: 'name', required: true })
  dataBuilder.parseEmail({ name: 'email', required: true })

  return dataBuilder.build()
}

export default {
  getSingleFilter,
  parseUserParams,
}
