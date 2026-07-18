import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.createUser);
router.get(
  "/me",
  auth(UserRole.CUSTOMER, UserRole.TECHNICIAN, UserRole.ADMIN),
  userController.getMyProfile,
);
router.put(
  "/me/update",
  auth(UserRole.TECHNICIAN),
  userController.updateMyProfile,
);

export const userRoutes = router;
