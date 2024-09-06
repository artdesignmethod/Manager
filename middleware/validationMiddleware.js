import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { PROJECT_STATUS } from "../root-utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateProjectInput = withValidationErrors([
  body("projectName")
    .notEmpty()
    .withMessage(" project name required")
    .isLength({ min: 2, max: 20 })
    .withMessage(" project name must be between 2 and 20 characters long"),

  body("projectStatus")
    .isIn(Object.values(PROJECT_STATUS))
    .withMessage(" invalid project status"),

  body("projectHours").notEmpty().withMessage(" project hours required"),
  body("projectPrice").notEmpty().withMessage(" project price required"),
]);
