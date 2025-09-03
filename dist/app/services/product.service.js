import { ProductModel } from "../shared/models/product.model";
import { CategoryModel } from "../shared/models/category.model";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
import { paginate, pageCount, search } from "../shared/utils/index";
export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const newProduct = new ProductModel({
      ...req.body,
      user: userId,
    });
    const product = await newProduct.save();
    return {
      success: true,
      message: "Product created successfully",
      data: product,
    };
  }
);
export const getUserProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const { page = 1, pageSize = 50, ...rest } = req.query;
    const searchQuery = await search(rest);
    searchQuery.user = userId;
    const pagination = paginate({
      page: Number(page),
      pageSize: Number(pageSize),
    });
    const products = await ProductModel.find(searchQuery)
      .limit(pagination.limit)
      .skip(pagination.offset)
      .sort({ createdAt: -1 });
    const count = await ProductModel.countDocuments(searchQuery);
    return {
      success: true,
      message: "Products retrieved successfully",
      pagination: {
        ...pageCount({ count, page: Number(page), pageSize: Number(pageSize) }),
      },
      data: products,
    };
  }
);
export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, pageSize = 50, ...rest } = req.query;
    const searchQuery = await search(rest);
    const pagination = paginate({
      page: Number(page),
      pageSize: Number(pageSize),
    });
    const products = await ProductModel.find(searchQuery)
      .limit(pagination.limit)
      .skip(pagination.offset)
      .sort({ createdAt: -1 });
    const count = await ProductModel.countDocuments(searchQuery);
    return {
      success: true,
      message: "Products retrieved successfully",
      pagination: {
        ...pageCount({ count, page: Number(page), pageSize: Number(pageSize) }),
      },
      data: products,
    };
  }
);
export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    return product;
  }
);
export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const product = await ProductModel.findOne({ _id: id, user: userId });
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    const { body } = req;
    for (const value in body) {
      product[value] = body[value];
    }
    const updatedProduct = await product.save();
    return {
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    };
  }
);
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const product = await ProductModel.findOne({ _id: id, user: userId });
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    await ProductModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Product deleted successfully",
    };
  }
);
export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newCategory = new CategoryModel(req.body);
    const category = await newCategory.save();
    return {
      success: true,
      message: "Category created successfully",
      data: category,
    };
  }
);
export const getCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return {
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    };
  }
);
export const getSingleCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }
    return category;
  }
);
export const editCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }
    const { body } = req;
    for (const value in body) {
      category[value] = body[value];
    }
    const updatedCategory = await category.save();
    return {
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    };
  }
);
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(new ErrorResponse("Category not found", 404));
    }
    await CategoryModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Category deleted successfully",
    };
  }
);
//# sourceMappingURL=product.service .map
