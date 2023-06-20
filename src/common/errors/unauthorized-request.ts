import { AppError } from './app-error'

export class UnauthorizedRequestError extends AppError {
  constructor(message?: string) {
    super(message || 'Unauthorized Request', 401)
  }
}
