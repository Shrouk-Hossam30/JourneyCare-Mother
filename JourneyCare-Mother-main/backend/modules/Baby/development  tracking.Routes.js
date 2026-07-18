import { Router } from "express";
import {
  createDevelopmentEntry,
  getDevelopmentByChild,
  updateDevelopmentEntry,
  deleteDevelopmentEntry,
} from "../controllers/developmentTrackingController.js";
import {
  devChildIdParamValidator,
  createDevelopmentEntryValidator,
  updateDevelopmentEntryValidator,
  developmentEntryIdValidator,
} from "../validators/developmentTrackingValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

router.post(
  "/child/:childId",
  authorize("mother", "father", "doctor"),
  createDevelopmentEntryValidator,
  validateRequest,
  createDevelopmentEntry
);

router.get(
  "/child/:childId",
  authorize("mother", "father", "doctor"),
  devChildIdParamValidator,
  validateRequest,
  getDevelopmentByChild
);

router.put(
  "/:id",
  authorize("mother", "father", "doctor"),
  updateDevelopmentEntryValidator,
  validateRequest,
  updateDevelopmentEntry
);

router.delete(
  "/:id",
  authorize("mother", "father", "admin"),
  developmentEntryIdValidator,
  validateRequest,
  deleteDevelopmentEntry
);

export default router;
