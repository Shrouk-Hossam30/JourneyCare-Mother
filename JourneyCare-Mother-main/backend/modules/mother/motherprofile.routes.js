import { Router } from "express";
import {
  createMotherProfile,
  getAllMotherProfiles,
  getMotherProfileById,
  getMyMotherProfile,
  updateMotherProfile,
  deleteMotherProfile,
} from "../controllers/motherProfileController.js";
import {
  createMotherProfileValidator,
  updateMotherProfileValidator,
  motherProfileIdValidator,
} from "../validators/motherProfileValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("mother"),
  createMotherProfileValidator,
  validateRequest,
  createMotherProfile
);

router.get("/", authorize("admin", "doctor"), getAllMotherProfiles);

router.get("/me", authorize("mother"), getMyMotherProfile);

router.get(
  "/:id",
  authorize("mother", "doctor", "admin"),
  motherProfileIdValidator,
  validateRequest,
  getMotherProfileById
);

router.put(
  "/:id",
  authorize("mother", "admin"),
  updateMotherProfileValidator,
  validateRequest,
  updateMotherProfile
);

router.delete(
  "/:id",
  authorize("admin"),
  motherProfileIdValidator,
  validateRequest,
  deleteMotherProfile
);

export default router;
