import passport from "passport";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "./async";
import ErrorResponse from "../utils/errorResponse";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: any, info: any) => {
        if (err || !user) {
          return next(new ErrorResponse("Unauthorized access", 401));
        } else {
          req.user = user;
          return next(); // continue to next middleware if no error.
        }
      }
    )(req, res, next);
  }
);
