import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/categories",
  auth(UserRole.ADMIN),
  adminController.createCategory,
);
router.get("/categories", adminController.getAllCategory);
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUser);
router.patch(
  "/users/:userId",
  auth(UserRole.ADMIN),
  adminController.updateUser,
);

export const adminRoutes = router;
