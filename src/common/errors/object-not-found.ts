import { AppError } from './app-error'

export class ObjectNotFoundError extends AppError {
  constructor(message?: string) {
    super(message || 'Object not found', 404)
  }
}
