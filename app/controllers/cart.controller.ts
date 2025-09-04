import { Request, Response, NextFunction } from "express";
import {
  addToCart,
  calculateCheckout,
  checkout,
  getCart,
  getSingleCartItem,
  removeItem,
  updateCartItem,
} from "../services/cart.service.js";
import {
  addToCartValidator,
  checkoutValidator,
  updateCartValidator,
} from "../shared/validators/cart.validator.js";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";

export const addToCartController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await addToCartValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const cart = await addToCart(req, res, next);
      return res.status(201).send(cart);
    }
  }
);

export const updateCartItemController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await updateCartValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const cart = await updateCartItem(req, res, next);
      return res.status(200).send(cart);
    }
  }
);

export const calculateChekoutController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await checkoutValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const cart = await calculateCheckout(req, res, next);
      return res.status(200).send(cart);
    }
  }
);

export const chekoutController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await checkoutValidator.validateAsync(req.body);
    if (error) {
      return next(new ErrorResponse(error.message, 400));
    } else {
      const cart = await checkout(req, res, next);
      return res.status(200).send(cart);
    }
  }
);

export const getCartController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart = await getCart(req, res, next);
    return res.status(200).send(cart);
  }
);

export const getSingleCartItemController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart = await getSingleCartItem(req, res, next);
    return res
      .status(200)
      .send({ success: true, message: "Cart fetched", data: cart });
  }
);

export const removeCartItemController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart = await removeItem(req, res, next);
    return res.status(200).send(cart);
  }
);
