import { Router } from "express";
import {
  createNutritionPlan,
  getAllNutritionPlans,
  getNutritionPlansByTrimester,
  getNutritionPlanById,
  updateNutritionPlan,
  deleteNutritionPlan,
} from "../controllers/nutritionPlanController.js";
import {
  createNutritionPlanValidator,
  updateNutritionPlanValidator,
  nutritionPlanIdValidator,
  trimesterParamValidator,
} from "../validators/nutritionPlanValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("admin"),
  createNutritionPlanValidator,
  validateRequest,
  createNutritionPlan
);

router.get("/", authorize("admin"), getAllNutritionPlans);

router.get(
  "/trimester/:trimester",
  authorize("mother", "admin", "doctor"),
  trimesterParamValidator,
  validateRequest,
  getNutritionPlansByTrimester
);

router.get(
  "/:id",
  authorize("mother", "admin", "doctor"),
  nutritionPlanIdValidator,
  validateRequest,
  getNutritionPlanById
);

router.put(
  "/:id",
  authorize("admin"),
  updateNutritionPlanValidator,
  validateRequest,
  updateNutritionPlan
);

router.delete(
  "/:id",
  authorize("admin"),
  nutritionPlanIdValidator,
  validateRequest,
  deleteNutritionPlan
);

export default router;
