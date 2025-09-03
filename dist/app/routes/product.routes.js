import express from "express";
import * as product from "../controllers/product.controller";
const productRouter = express.Router();
productRouter
  .get("/", product.getProductsController)
  .get("/user", product.getUserProductsController)
  .get("/:id", product.getSingleProductController)
  .post("/", product.createProductController)
  .put("/:id", product.updateProductController)
  .delete("/:id", product.deleteProductController)
  .get("/categories", product.getCategoriesController)
  .get("/categories/:id", product.getCategoryController)
  .post("/categories", product.createCategoryController)
  .put("/categories/:id", product.editCategoryController)
  .delete("/categories/:id", product.deleteCategoryController);
export default productRouter;
//# sourceMappingURL=product.routes .map
