import { body, param } from "express-validator";

export const createExercisePlanValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("trimester")
    .notEmpty()
    .withMessage("Trimester is required")
    .isIn([1, 2, 3])
    .withMessage("Trimester must be 1, 2, or 3"),
  body("exercises").optional().isArray().withMessage("Exercises must be an array"),
  body("exercises.*.name")
    .if(body("exercises").exists())
    .trim()
    .notEmpty()
    .withMessage("Each exercise needs a name"),
];

export const updateExercisePlanValidator = [
  param("id").isMongoId().withMessage("Invalid exercise plan ID"),
  body("trimester").optional().isIn([1, 2, 3]).withMessage("Trimester must be 1, 2, or 3"),
];

export const exercisePlanIdValidator = [
  param("id").isMongoId().withMessage("Invalid exercise plan ID"),
];

export const exerciseTrimesterParamValidator = [
  param("trimester").isIn(["1", "2", "3"]).withMessage("Trimester must be 1, 2, or 3"),
];
