import { Router } from "express";
import {
  createSleepEntry,
  getSleepEntriesByChild,
  getSleepStats,
  updateSleepEntry,
  deleteSleepEntry,
} from "../controllers/sleepTrackingController.js";
import {
  childIdParamValidator,
  createSleepEntryValidator,
  updateSleepEntryValidator,
  sleepEntryIdValidator,
} from "../validators/sleepTrackingValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

// Nested under child: /children/:childId/sleep
router.post(
  "/child/:childId",
  authorize("mother", "father"),
  createSleepEntryValidator,
  validateRequest,
  createSleepEntry
);

router.get(
  "/child/:childId",
  authorize("mother", "father", "doctor"),
  childIdParamValidator,
  validateRequest,
  getSleepEntriesByChild
);

router.get(
  "/child/:childId/stats",
  authorize("mother", "father", "doctor"),
  childIdParamValidator,
  validateRequest,
  getSleepStats
);

router.put(
  "/:id",
  authorize("mother", "father"),
  updateSleepEntryValidator,
  validateRequest,
  updateSleepEntry
);

router.delete(
  "/:id",
  authorize("mother", "father", "admin"),
  sleepEntryIdValidator,
  validateRequest,
  deleteSleepEntry
);

export default router;
