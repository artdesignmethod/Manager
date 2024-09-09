import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { PROJECT_STATUS } from "../root-utils/constants.js";
import mongoose from "mongoose";
import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg); // msg is built in

        if (errorMessages[0].startsWith(" no project")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith(" not authorized")) {
          throw new UnauthorizedError(" not authorized to access this route");
        }

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

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidMongoId) throw new BadRequestError(" invalid MongoDb id");

    const project = await Project.findById(value);

    if (!project) throw new NotFoundError(` no project found with id ${value}`);

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === project.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError(" not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage(" first name required")
    .isLength({ min: 2, max: 16 })
    .withMessage(" first name must be between 2 and 16 characters long"),

  body("lastName")
    .notEmpty()
    .withMessage(" last name required")
    .isLength({ min: 2, max: 16 })
    .withMessage(" last name must be between 2 and 16 characters long"),

  body("email")
    .notEmpty()
    .withMessage(" email is required")
    .isEmail()
    .withMessage(" invalid email format")
    .isLength({ min: 5 })
    .withMessage(" email must be at least 5 characters long")
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (user) {
        throw new BadRequestError(" email already registered");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage(" password is required")
    .isLength({ min: 8 })
    .withMessage(" password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage(" email is required")
    .isEmail()
    .withMessage(" invalid email format"),

  body("password").notEmpty().withMessage(" password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("firstName")
    .notEmpty()
    .withMessage(" first name is required")
    .isLength({ min: 2, max: 16 })
    .withMessage(" first name must be between 2 and 16 characters long"),

  body("lastName")
    .notEmpty()
    .withMessage(" last name is required")
    .isLength({ min: 2, max: 16 })
    .withMessage(" last name must be between 2 and 16 characters long"),

  body("email")
    .notEmpty()
    .withMessage(" email is required")
    .isEmail()
    .withMessage(" invalid email format")
    .isLength({ min: 5 })
    .withMessage(" email must be at least 5 characters long")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError(" email already registered");
      }
    }),
]);

// .custom() = custom function
