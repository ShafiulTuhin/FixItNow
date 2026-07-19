import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

router.put(
  "/profile",
  auth(UserRole.TECHNICIAN),
  technicianController.updateTechnicianProfile,
);
router.get(
  "/bookings",
  auth(UserRole.TECHNICIAN),
  technicianController.getMyBookings,
);

router.patch(
  "/bookings/:id",
  auth(UserRole.TECHNICIAN),
  technicianController.updateBookingStatus,
);

export const technicianRoutes = router;
