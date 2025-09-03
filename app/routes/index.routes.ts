import { Application } from "express";
import { isAuthenticated } from "../shared/middleware/auth.jwt";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";
import cartRouter from "./cart.routes";
import userRouter from "./user.routes";

export default function (app: Application): void {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/cart", [isAuthenticated], cartRouter);
  app.use("/api/v1/users", [isAuthenticated], userRouter);
}
