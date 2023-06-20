import { AppError } from './app-error'

export class ThirdPartyServiceError extends AppError {
  constructor(message?: string) {
    super(message || 'Third-party Service Error', 423)
  }
}
