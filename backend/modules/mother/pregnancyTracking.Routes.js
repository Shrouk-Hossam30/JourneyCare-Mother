import { Router } from "express";
import {
  createPregnancyTracking,
  getPregnancyByMother,
  getPregnancyById,
  updatePregnancyTracking,
  deletePregnancyTracking,
  addVitalsEntry,
  addSymptomEntry,
  addMoodLogEntry,
} from "../controllers/pregnancyTrackingController.js";
import {
  createPregnancyTrackingValidator,
  updatePregnancyTrackingValidator,
  pregnancyIdValidator,
  motherIdParamValidator,
  addVitalsValidator,
  addSymptomValidator,
  addMoodLogValidator,
} from "../validators/pregnancyTrackingValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("mother"),
  createPregnancyTrackingValidator,
  validateRequest,
  createPregnancyTracking
);

router.get(
  "/mother/:motherId",
  authorize("mother", "doctor", "admin"),
  motherIdParamValidator,
  validateRequest,
  getPregnancyByMother
);

router.get(
  "/:id",
  authorize("mother", "doctor", "admin"),
  pregnancyIdValidator,
  validateRequest,
  getPregnancyById
);

router.put(
  "/:id",
  authorize("mother", "doctor", "admin"),
  updatePregnancyTrackingValidator,
  validateRequest,
  updatePregnancyTracking
);

router.delete(
  "/:id",
  authorize("admin"),
  pregnancyIdValidator,
  validateRequest,
  deletePregnancyTracking
);

router.post(
  "/:id/vitals",
  authorize("mother", "doctor"),
  addVitalsValidator,
  validateRequest,
  addVitalsEntry
);

router.post(
  "/:id/symptoms",
  authorize("mother"),
  addSymptomValidator,
  validateRequest,
  addSymptomEntry
);

router.post(
  "/:id/mood-log",
  authorize("mother"),
  addMoodLogValidator,
  validateRequest,
  addMoodLogEntry
);

export default router;
