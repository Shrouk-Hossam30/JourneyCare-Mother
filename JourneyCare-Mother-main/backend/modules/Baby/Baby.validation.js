import { body, param } from "express-validator";

export const createChildValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("gender")
    .notEmpty()
    .isIn(["male", "female"])
    .withMessage("Gender must be male or female"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
  body("birthWeight").optional().isFloat({ min: 0 }),
  body("birthHeight").optional().isFloat({ min: 0 }),
  body("bloodType")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type"),
];

export const updateChildValidator = [
  param("id").isMongoId().withMessage("Invalid child ID"),
  body("gender").optional().isIn(["male", "female"]),
  body("dateOfBirth").optional().isISO8601(),
];

export const childIdValidator = [
  param("id").isMongoId().withMessage("Invalid child ID"),
];
