import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router =Router()

router.post("/",auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), rentalController.createRental)
router.get("/",auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), rentalController.getMyRentalOrders)

export const rentalRoutes = router