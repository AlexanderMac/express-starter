import { AppError } from './app-error'

export class DuplicateObjectError extends AppError {
  constructor(message?: string) {
    super(message || 'Duplicate Object', 409)
  }
}
