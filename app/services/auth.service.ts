import moment from "moment";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";
import { UserModel } from "../shared/models/user.model.js";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password, fullname } = req.body;
    await UserModel.create({
      email,
      username: username.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      fullname,
    });
    res.status(201).send({
      success: true,
      message: "Registration successfull, you can now login",
      // data: user,
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
      ],
    });
    //check if user exists
    if (!user) {
      return next(new ErrorResponse("Invalid login credentials", 400));
    }
    //check if password is valid
    const validate = await bcrypt.compareSync(password, user.password);
    if (!validate) {
      return next(new ErrorResponse("Invalid login credentials", 400));
    }

    const userJwt = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const expire: number = 2592000;
    const token: string = await jwt.sign(
      userJwt,
      process.env.SECRET as string,
      {
        expiresIn: expire,
      }
    );

    return res.status(200).send({
      success: true,
      message: "login successful",
      data: user,
      authorization: {
        token,
        expiresIn: expire,
      },
    });
  }
);
