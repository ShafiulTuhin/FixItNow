import { Router } from "express";
import { technicianController } from "./technicians.controller";

const router = Router();

router.get("/", technicianController.getAllTechnician);
router.get("/:id", technicianController.getTechnicianById);

export const techniciansRoutes = router;
