import { CartModel } from "../shared/models/cart.model";
import { ProductModel } from "../shared/models/product.model";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
export const addToCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      cart = new CartModel({
        user: userId,
        items: [],
        total: 0,
      });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity,
      });
    }
    cart.total = cart.items.reduce((total, item) => {
      return total + item.quantity * product.price;
    }, 0);
    await cart.save();
    return {
      success: true,
      message: "Item added to cart",
      data: cart,
    };
  }
);
export const getCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const cart = await CartModel.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!cart) {
      return {
        success: true,
        message: "Cart is empty",
        data: { items: [], total: 0 },
      };
    }
    return {
      success: true,
      message: "Cart retrieved successfully",
      data: cart,
    };
  }
);
export const updateCartItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) {
      return next(new ErrorResponse("Item not found in cart", 404));
    }
    item.quantity = quantity;
    await cart.save();
    return {
      success: true,
      message: "Cart item updated",
      data: cart,
    };
  }
);
export const getSingleCartItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) {
      return next(new ErrorResponse("Item not found in cart", 404));
    }
    return {
      success: true,
      message: "Cart item retrieved",
      data: item,
    };
  }
);
export const removeItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.total = cart.items.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
    await cart.save();
    return {
      success: true,
      message: "Item removed from cart",
      data: cart,
    };
  }
);
//# sourceMappingURL=cart.service .map
