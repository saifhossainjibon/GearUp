import express from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";


const router = express.Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router.get("/gear", auth(Role.ADMIN), adminController.getAllGear);
router.get("/rentals", auth(Role.ADMIN), adminController.getAllRentalOrders);

export const adminRoutes = router;