import { Router } from "express";
import { technicianController } from "./technicians.controller";

const router = Router();

router.get("/", technicianController.getAllTechnician);

export const technicianRoutes = router;
