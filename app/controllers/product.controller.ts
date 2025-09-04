import { Request, Response, NextFunction } from "express";
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
} from "../services/product.service.js";
import {
  createProductValidator,
  updateProductValidator,
  createCategoryValidator,
} from "../shared/validators/product.validators.js";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";

export const createProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await createProductValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const product = await createProduct(req, res, next);
      return res.status(201).send(product);
    }
  }
);

export const updateProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await updateProductValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const product = await updateProduct(req, res, next);
      return res.status(200).send(product);
    }
  }
);

export const getUserProductsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await getUserProduct(req, res, next);
    return res.status(200).send(product);
  }
);

export const getProductsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await getProducts(req, res, next);
    return res.status(200).send(product);
  }
);

export const getSingleProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await getProduct(req, res, next);
    return res
      .status(200)
      .send({ success: true, message: "Product fetched", data: product });
  }
);

export const deleteProductController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await deleteProduct(req, res, next);
    return res.status(200).send(product);
  }
);

export const createCategoryController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await createCategoryValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const product = await createCategory(req, res, next);
      return res.status(200).send(product);
    }
  }
);

export const getCategoriesController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getCategories(req, res, next);
    return res.status(200).send(categories);
  }
);

export const getCategoryController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await getSingleCategory(req, res, next);
    return res
      .status(200)
      .send({ success: true, message: "Category fetched", data: category });
  }
);

export const editCategoryController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await editCategory(req, res, next);
    return res.status(200).send(category);
  }
);

export const deleteCategoryController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await deleteCategory(req, res, next);
    return res.status(200).send(category);
  }
);
