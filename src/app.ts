import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./modules/auth/auth.route";
import { providerRoutes } from "./modules/provider/provider.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { gearRoutes } from "./modules/gear/gear.route";
import { rentalRoutes } from "./modules/rental/rental.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import cors from "cors";
import config from "./config";



const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use("/api/payments/confirm", express.raw({type:'application/json'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Gear Up Server is running!!!");
});
// Here we'll write our API endpoint
app.use("/api/auth", userRoutes)
app.use("/api/provider", providerRoutes)
app.use("/api/gear", gearRoutes)
app.use("/api/rentals", rentalRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/payments", paymentRoutes)

app.use(notFound)
app.use(globalErrorHandler)
export default app;