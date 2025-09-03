import {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
  createCategory,
  getCategories,
  getSingleCategory,
  editCategory,
  deleteCategory,
  getUserProduct,
} from "../services/product.service";
import {
  createProductValidator,
  updateProductValidator,
  createCategoryValidator,
} from "../shared/validators/product.validators";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
export const createProductController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = await createProductValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const product = await createProduct(req: Request, res: Response, next: NextFunction);
    return res.status(201).send(product);
  }
});
export const updateProductController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = await updateProductValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const product = await updateProduct(req: Request, res: Response, next: NextFunction);
    return res.status(200).send(product);
  }
});
export const getUserProductsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await getUserProduct(req: Request, res: Response, next: NextFunction);
    return res.status(200).send(product);
  }
);
export const getProductsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await getProducts(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(product);
});
export const getSingleProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await getProduct(req: Request, res: Response, next: NextFunction);
    return res
      .status(200)
      .send({ success: true, message: "Product fetched", data: product });
  }
);
export const deleteProductController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await deleteProduct(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(product);
});
export const createCategoryController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = await createCategoryValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const product = await createCategory(req: Request, res: Response, next: NextFunction);
    return res.status(200).send(product);
  }
});
export const getCategoriesController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await getCategories(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(categories);
});
export const getCategoryController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const category = await getSingleCategory(req: Request, res: Response, next: NextFunction);
  return res
    .status(200)
    .send({ success: true, message: "Category fetched", data: category });
});
export const editCategoryController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const category = await editCategory(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(category);
});
export const deleteCategoryController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const category = await deleteCategory(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(category);
});
//# sourceMappingURL=product.controller .map
