import express, { Router } from "express";
import * as auth from "../controllers/auth.controller";
import verify from "../shared/middleware/verify";

const authRouter: Router = express.Router();

authRouter
  .post(
    "/register",
    [verify.checkDuplicateEmail, verify.checkDuplicateUsername],
    auth.registerController
  )
  .post("/login", auth.loginController);

export default authRouter;
