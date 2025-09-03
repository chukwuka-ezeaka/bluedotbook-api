import express from "express";
import * as user from "../controllers/user.controller";
const userRouter = express.Router();
userRouter
  .get("/", user.getUsersController)
  .get("/:id", user.getUserController)
  .put("/:id", user.updateUserController);
export default userRouter;
//# sourceMappingURL=user.routes .map
