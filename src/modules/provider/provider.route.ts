import { Router } from "express";
import { providerController } from "./provider.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router =Router()
router.post("/gear", auth(Role.PROVIDER), providerController.addGear)
router.put("/gear/:id", auth(Role.PROVIDER, Role.ADMIN), providerController.updateGear)
router.delete("/gear/:id", auth(Role.PROVIDER, Role.ADMIN), providerController.deleteGear)
router.get("/orders", auth(Role.PROVIDER, Role.ADMIN), providerController.getProviderOrders)
router.patch("/orders/:id", auth(Role.PROVIDER, Role.ADMIN), providerController.updateRentalStatus)

export const providerRoutes = router