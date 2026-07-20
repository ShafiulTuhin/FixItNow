import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { authRoutes } from "./modules/auth/auth.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { serviceRoutes } from "./modules/service/service.route";
import { techniciansRoutes } from "./modules/technicians/technicians.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { bookingRoutes } from "./modules/bookings/booking.route";
import { reviewRoutes } from "./modules/review/review.route";
import { paymentRoutes } from "./modules/payment/payment.route";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: config.app_url, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/technicians", techniciansRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
