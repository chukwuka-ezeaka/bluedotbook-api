import express from "express";
import * as cart from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter
  .post("/", cart.addToCartController)
  .get("/", cart.getCartController)
  .get("/:id", cart.getSingleCartItemController)
  .put("/:id", cart.updateCartItemController)
  .delete("/:id", cart.removeCartItemController);
export default cartRouter;
