import { UserModel } from "../models/user.model";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "./async";
export const checkDuplicateEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return next(new ErrorResponse("Email already exists", 400));
      }
    }
    next();
  }
);
export const checkDuplicateUsername = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    if (username) {
      const existingUser = await UserModel.findOne({
        username: username.toLowerCase(),
      });
      if (existingUser) {
        return next(new ErrorResponse("Username already exists", 400));
      }
    }
    next();
  }
);
//# sourceMappingURL=verify .map
