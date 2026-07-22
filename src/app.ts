import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./modules/auth/auth.route";
import { providerRoutes } from "./modules/provider/provider.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";



const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Gear Up Server is running!!!");
});
// Here we'll write our API endpoint
app.use("/api/auth", userRoutes)
app.use("/api/provider", providerRoutes)



app.use(notFound)
app.use(globalErrorHandler)
export default app;