import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, please try again later.";
  console.log(msg);
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

// This middleware is for unexpected errors that occur during processing requests in existing routes.
