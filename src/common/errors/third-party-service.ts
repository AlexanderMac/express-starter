import AppError from './_app'

export default class ThirdPartyServiceError extends AppError {
  constructor(message?: string) {
    super(message || 'Third-party Service Error', 423)
  }
}
