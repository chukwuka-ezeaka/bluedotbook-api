import { UserModel } from "../models/user.model";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "./async";
const checkDuplicateEmail = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({
        $or: [{ email: req.body.email }, { email: req.body.email.toLowerCase() }],
    });
    if (user) {
        return next(new ErrorResponse("Email already in use", 400));
    }
    next();
});
const checkDuplicateUsername = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({
        username: req.body.username.toLowerCase(),
    });
    if (user) {
        return next(new ErrorResponse("Username already in use", 400));
    }
    next();
});
const verify = {
    checkDuplicateEmail,
    checkDuplicateUsername,
};
export default verify;
//# sourceMappingURL=verify.js.map