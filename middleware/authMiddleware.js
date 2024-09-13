import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";

import { verifyJWT } from "../root-utils/tokenUtils.js";

// ACCESS TOKEN
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);
    const guestUser = userId === "66e465fef73de5e6cdb19b3a";

    req.user = { userId, role, guestUser }; // if cookie is present with verified token, attach user values from token to request in new object

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForGuestUser = (req, res, next) => {
  if (req.user.guestUser) throw new BadRequestError("Read Only Mode");
};
