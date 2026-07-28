import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router =Router()

router.post("/",auth(Role.CUSTOMER), rentalController.createRental)
router.get("/",auth( Role.CUSTOMER), rentalController.getMyRentalOrders)
router.get("/:id",auth(Role.CUSTOMER), rentalController.getRentalOrderById)

export const rentalRoutes = router