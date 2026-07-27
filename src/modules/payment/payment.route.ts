import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router()

router.post("/create", auth(Role.CUSTOMER),  paymentController.createCheckoutSession);
router.post("/confirm", paymentController.handleWebhook);
router.get("/", auth(Role.CUSTOMER), paymentController.getPaymentHistory);
router.get("/:id", auth(Role.CUSTOMER), paymentController.getPaymentById);

export const paymentRoutes = router