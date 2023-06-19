export default class AppError extends Error {
  statusCode: number;
  details: any;

  constructor(message: string, statusCode?: number, details?: any) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.details = details;
  }
}
