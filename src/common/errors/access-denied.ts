import AppError from './_app'

export default class AccessDeniedError extends AppError {
  constructor(message?: string) {
    super(message || 'Access Denied', 403)
  }
}
