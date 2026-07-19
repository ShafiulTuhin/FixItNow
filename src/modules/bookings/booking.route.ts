import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER), bookingController.createBooking);

export const bookingRoutes = router;
