import { AppError } from './app-error'

export class UnprocessableRequestError extends AppError {
  constructor(message?: string) {
    super(message || 'Unprocessable Request', 422)
  }
}
