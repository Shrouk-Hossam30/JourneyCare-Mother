import { body, param } from "express-validator";

export const devChildIdParamValidator = [
  param("childId").isMongoId().withMessage("Invalid child ID"),
];

export const createDevelopmentEntryValidator = [
  param("childId").isMongoId().withMessage("Invalid child ID"),
  body("category")
    .notEmpty()
    .isIn(["physical", "cognitive", "social", "language", "emotional"])
    .withMessage("Invalid category"),
  body("milestone").trim().notEmpty().withMessage("Milestone is required"),
  body("achievedDate").optional().isISO8601().withMessage("Must be a valid date"),
];

export const updateDevelopmentEntryValidator = [
  param("id").isMongoId().withMessage("Invalid development entry ID"),
  body("category")
    .optional()
    .isIn(["physical", "cognitive", "social", "language", "emotional"]),
];

export const developmentEntryIdValidator = [
  param("id").isMongoId().withMessage("Invalid development entry ID"),
];
