import { body, param } from "express-validator";

export const createMotherProfileValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),
  body("nationalId").trim().notEmpty().withMessage("National ID is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("email").trim().isEmail().withMessage("A valid email is required"),
  body("bloodType")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type"),
  body("height").optional().isFloat({ min: 0 }).withMessage("Height must be a positive number"),
  body("prePregnancyWeight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number"),
];

export const updateMotherProfileValidator = [
  param("id").isMongoId().withMessage("Invalid mother profile ID"),
  body("email").optional().isEmail().withMessage("A valid email is required"),
  body("bloodType")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type"),
];

export const motherProfileIdValidator = [
  param("id").isMongoId().withMessage("Invalid mother profile ID"),
];
