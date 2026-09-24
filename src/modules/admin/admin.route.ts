import express from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";


const router = express.Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router.get("/gear", auth(Role.ADMIN), adminController.getAllGear);
router.get("/rentals", auth(Role.ADMIN), adminController.getAllRentalOrders);
router.post("/category", auth(Role.ADMIN), adminController.addCategory); // create the category
router.get("/category", adminController.getAllCategory); // get all the category
router.patch("/category/:id", auth(Role.ADMIN), adminController.updateCategory); // update a category
router.delete("/category/:id", auth(Role.ADMIN), adminController.deleteCategory); // delete a category

export const adminRoutes = router;