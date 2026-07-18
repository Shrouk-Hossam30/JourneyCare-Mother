import { Router } from "express";
import {
  createChild,
  getAllChildren,
  getMyChildren,
  getChildById,
  updateChild,
  deleteChild,
} from "../controllers/childController.js";
import {
  createChildValidator,
  updateChildValidator,
  childIdValidator,
} from "../validators/childValidator.js";
import { authenticate, authorize } from "../../../middleware/auth.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("mother", "father"),
  createChildValidator,
  validateRequest,
  createChild
);

router.get("/", authorize("admin", "doctor"), getAllChildren);

router.get("/me", authorize("mother", "father"), getMyChildren);

router.get(
  "/:id",
  authorize("mother", "father", "doctor", "admin"),
  childIdValidator,
  validateRequest,
  getChildById
);

router.put(
  "/:id",
  authorize("mother", "father", "admin"),
  updateChildValidator,
  validateRequest,
  updateChild
);

router.delete(
  "/:id",
  authorize("admin"),
  childIdValidator,
  validateRequest,
  deleteChild
);

export default router;
