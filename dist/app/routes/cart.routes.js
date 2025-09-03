import express from "express";
import * as cart from "../controllers/cart.controller";
const cartRouter = express.Router();
cartRouter
  .get("/", cart.getCartController)
  .get("/:productId", cart.getSingleCartItemController)
  .post("/", cart.addToCartController)
  .put("/", cart.updateCartItemController)
  .delete("/:productId", cart.removeCartItemController);
export default cartRouter;
//# sourceMappingURL=cart.routes .map
