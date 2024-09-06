import { StatusCodes } from "http-status-codes";

// Error is a built in Javascript class
// Status Code: 404
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

// Status Code: 400
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// Status Code: 401
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

// Status Code: 403
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
