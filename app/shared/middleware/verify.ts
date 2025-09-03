import { UserModel } from "../models/user.model";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "./async";
import { Request, Response, NextFunction } from "express";

const checkDuplicateEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne({
      $or: [{ email: req.body.email }, { email: req.body.email.toLowerCase() }],
    });

    if (user) {
      return next(new ErrorResponse("Email already in use", 400));
    }

    next();
  }
);

const checkDuplicateUsername = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne({
      username: req.body.username.toLowerCase(),
    });

    if (user) {
      return next(new ErrorResponse("Username already in use", 400));
    }

    next();
  }
);

const verify = {
  checkDuplicateEmail,
  checkDuplicateUsername,
};

export default verify;
