import { body, param } from "express-validator";

export const childIdParamValidator = [
  param("childId").isMongoId().withMessage("Invalid child ID"),
];

export const createSleepEntryValidator = [
  param("childId").isMongoId().withMessage("Invalid child ID"),
  body("type").notEmpty().isIn(["nap", "night"]).withMessage("Type must be nap or night"),
  body("sleepStart")
    .notEmpty()
    .withMessage("sleepStart is required")
    .isISO8601()
    .withMessage("sleepStart must be a valid date"),
  body("sleepEnd")
    .notEmpty()
    .withMessage("sleepEnd is required")
    .isISO8601()
    .withMessage("sleepEnd must be a valid date"),
  body("quality")
    .optional()
    .isIn(["poor", "fair", "good", "excellent"])
    .withMessage("Invalid quality value"),
];

export const updateSleepEntryValidator = [
  param("id").isMongoId().withMessage("Invalid sleep entry ID"),
  body("sleepStart").optional().isISO8601(),
  body("sleepEnd").optional().isISO8601(),
  body("quality").optional().isIn(["poor", "fair", "good", "excellent"]),
];

export const sleepEntryIdValidator = [
  param("id").isMongoId().withMessage("Invalid sleep entry ID"),
];
