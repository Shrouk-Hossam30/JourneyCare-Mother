import { body, param } from "express-validator";

export const createPregnancyTrackingValidator = [
  body("lastMenstrualPeriod")
    .notEmpty()
    .withMessage("Last menstrual period date is required")
    .isISO8601()
    .withMessage("Must be a valid date"),
  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Must be a valid date"),
  body("pregnancyNumber")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Pregnancy number must be a positive integer"),
];

export const updatePregnancyTrackingValidator = [
  param("id").isMongoId().withMessage("Invalid pregnancy record ID"),
  body("status")
    .optional()
    .isIn(["ongoing", "completed", "miscarried", "terminated"])
    .withMessage("Invalid status"),
];

export const pregnancyIdValidator = [
  param("id").isMongoId().withMessage("Invalid pregnancy record ID"),
];

export const motherIdParamValidator = [
  param("motherId").isMongoId().withMessage("Invalid mother profile ID"),
];

export const addVitalsValidator = [
  param("id").isMongoId().withMessage("Invalid pregnancy record ID"),
  body("weight").optional().isFloat({ min: 0 }),
  body("bloodPressure.systolic").optional().isInt({ min: 0 }),
  body("bloodPressure.diastolic").optional().isInt({ min: 0 }),
  body("bloodSugar").optional().isFloat({ min: 0 }),
  body("fetalHeartRate").optional().isInt({ min: 0 }),
];

export const addSymptomValidator = [
  param("id").isMongoId().withMessage("Invalid pregnancy record ID"),
  body("symptom").trim().notEmpty().withMessage("Symptom is required"),
  body("severity")
    .optional()
    .isIn(["mild", "moderate", "severe"])
    .withMessage("Invalid severity"),
];

export const addMoodLogValidator = [
  param("id").isMongoId().withMessage("Invalid pregnancy record ID"),
  body("mood")
    .notEmpty()
    .isIn(["very_bad", "bad", "neutral", "good", "very_good"])
    .withMessage("Invalid mood value"),
];
