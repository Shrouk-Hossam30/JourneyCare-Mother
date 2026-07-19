import { Router } from "express";
import {
  createExercisePlan,
  getAllExercisePlans,
  getExercisePlansByTrimester,
  getExercisePlanById,
  updateExercisePlan,
  deleteExercisePlan,
} from "../controllers/exercisePlanController.js";
import {
  createExercisePlanValidator,
  updateExercisePlanValidator,
  exercisePlanIdValidator,
  exerciseTrimesterParamValidator,
} from "../validators/exercisePlanValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("admin"),
  createExercisePlanValidator,
  validateRequest,
  createExercisePlan
);

router.get("/", authorize("admin"), getAllExercisePlans);

router.get(
  "/trimester/:trimester",
  authorize("mother", "admin", "doctor"),
  exerciseTrimesterParamValidator,
  validateRequest,
  getExercisePlansByTrimester
);

router.get(
  "/:id",
  authorize("mother", "admin", "doctor"),
  exercisePlanIdValidator,
  validateRequest,
  getExercisePlanById
);

router.put(
  "/:id",
  authorize("admin"),
  updateExercisePlanValidator,
  validateRequest,
  updateExercisePlan
);

router.delete(
  "/:id",
  authorize("admin"),
  exercisePlanIdValidator,
  validateRequest,
  deleteExercisePlan
);

export default router;
