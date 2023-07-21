import { AppError } from './app-error'

export class BadRequestError extends AppError {
  constructor(message?: string) {
    super(message || 'Bad Request', 400)
  }
}
