import express from "express";
import * as cart from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter
  .post("/checkout", cart.chekoutController)
  .post("/", cart.addToCartController)
  .get("/", cart.getCartController)
  .get("/:id", cart.getSingleCartItemController)
  .put("/checkout/calculate", cart.calculateChekoutController)

  .put("/:id", cart.updateCartItemController)
  .delete("/:id", cart.removeCartItemController);
export default cartRouter;
