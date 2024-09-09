import { UnauthenticatedError } from "../errors/customErrors.js";

import { verifyJWT } from "../root-utils/tokenUtils.js";

// ACCESS TOKEN
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);

    req.user = { userId, role }; // if cookie is present with verified token, attach user values from token to request in new object

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
