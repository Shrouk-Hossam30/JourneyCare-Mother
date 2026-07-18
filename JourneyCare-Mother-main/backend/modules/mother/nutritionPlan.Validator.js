import { body, param } from "express-validator";

export const createNutritionPlanValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("trimester")
    .notEmpty()
    .withMessage("Trimester is required")
    .isIn([1, 2, 3])
    .withMessage("Trimester must be 1, 2, or 3"),
  body("meals").optional().isArray().withMessage("Meals must be an array"),
  body("meals.*.name")
    .if(body("meals").exists())
    .trim()
    .notEmpty()
    .withMessage("Each meal needs a name"),
];

export const updateNutritionPlanValidator = [
  param("id").isMongoId().withMessage("Invalid nutrition plan ID"),
  body("trimester").optional().isIn([1, 2, 3]).withMessage("Trimester must be 1, 2, or 3"),
];

export const nutritionPlanIdValidator = [
  param("id").isMongoId().withMessage("Invalid nutrition plan ID"),
];

export const trimesterParamValidator = [
  param("trimester").isIn(["1", "2", "3"]).withMessage("Trimester must be 1, 2, or 3"),
];
