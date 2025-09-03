import dotenv from "dotenv";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
import { pageCount, paginate, search } from "../shared/utils/index";
import { userAppearance } from "../shared/utils/constants";
import { CartModel } from "../shared/models/cart.model";
import { ProductModel } from "../shared/models/product.model";
import { Request, Response, NextFunction } from "express";
import { IUser } from "@/shared/types";

dotenv.config();

export const addToCart = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { body } = req;
    const user: any = req.user;

    const product = await ProductModel.findOne({ _id: body.productId });
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    let item = await CartModel.findOne({
      user: user._id,
      product: body.productId,
      status: "pending",
    });

    //if item exists, update
    if (item) {
      item.quantity += body.quantity;

      if (product.quantity < Number(item.quantity))
        return next(new ErrorResponse(`Insufficient quantity left`, 404));
      await item.save();
    } else {
      item = await CartModel.create({
        product: body.productId,
        quantity: body.quantity,
        user: user.id,
      });
      return {
        success: true,
        message: "product added to cart",
        data: item,
      };
    }
  }
);

export const updateCartItem = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { cartId, quantity, type } = req.body;

    const item = await CartModel.findOne({
      _id: cartId,
      user: req.user.id,
      status: "pending",
    });

    if (!item) {
      return next(new ErrorResponse("Item not in cart", 404));
    }

    const product = await ProductModel.findOne({ _id: item.product });

    if (!product) {
      return next(new ErrorResponse(`Unable to get product`, 404));
    }

    if (type === "decrease") {
      //delete item if quantity is equal to or greater than current quantity
      if (quantity >= item.quantity) {
        await deleteItemFormCart(req.user.id, item.product.toString(), next);
        return next(new ErrorResponse(`item removed`, 200));
      } else {
        item.quantity -= quantity;
      }
    }
    if (type === "increase") {
      if (item.quantity + quantity > product.quantity) {
        return next(
          new ErrorResponse(
            `Please select a quantity less then or equal to ${product.quantity}`,
            400
          )
        );
      }
      item.quantity += quantity;
    }
    await item.save();

    return {
      success: true,
      message: "cart item updated",
      data: item,
    };
  }
);

export const getCart = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const params = req.query;
    const { page = 1, pageSize = 20, author, ...rest } = params;

    const pagination = paginate({ page, pageSize });

    const query = await search(rest);
    query.user = req.user._id;
    query.status = "pending";

    const cart = await CartModel.find(query)
      .populate([
        {
          path: "product",
          populate: {
            path: "category",
            select: "id name",
          },
        },
      ])
      .skip(pagination.offset)
      .limit(pagination.limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await CartModel.countDocuments(query).exec();

    return {
      success: true,
      pagination: {
        ...(await pageCount({ count, page, pageSize })),
        total: count,
      },
      data: cart,
    };
  }
);

export const getSingleCartItem = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const cart = await CartModel.findOne({ _id: id }).populate([
      {
        path: "product",
        populate: {
          path: "category",
          select: "id name",
        },
      },
    ]);
    if (!cart) {
      return next(new ErrorResponse("Item not found", 404));
    }

    return cart;
  }
);

const deleteItemFormCart = async (
  user: string,
  productId: string,
  next: NextFunction
) => {
  await CartModel.deleteOne({
    user: user,
    product: productId,
  });

  return true;
};

export const removeItem = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    await deleteItemFormCart(req.user.id, req.params.productId, next);
    return {
      success: true,
      message: "item removed fromm cart",
    };
  }
);
