import { AppError } from './app-error'

export class AccessDeniedError extends AppError {
  constructor(message?: string) {
    super(message || 'Access Denied', 403)
  }
}
