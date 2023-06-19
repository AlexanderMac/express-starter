import AppError from './_app';

export default class ObjectNotFoundError extends AppError {
  constructor (message?: string) {
    super(message || 'Object not found', 404);
  }
}
