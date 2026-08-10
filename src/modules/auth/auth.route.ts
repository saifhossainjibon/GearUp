import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router =Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.logInUser)
router.post("/refresh-token", authController.refreshToken)
router.get("/me",auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), authController.getMyProfile)
router.patch("/my-profile",auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), authController.updateMyProfile)

export const userRoutes = router;