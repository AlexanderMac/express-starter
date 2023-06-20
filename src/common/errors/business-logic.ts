import { AppError } from './app-error'

export class BusinessLogicError extends AppError {
  constructor(message?: string) {
    super(message || 'Business Logic Error', 409)
  }
}
