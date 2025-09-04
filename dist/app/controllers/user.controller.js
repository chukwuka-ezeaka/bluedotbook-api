import { getUser, getUsers, updateUser } from "../services/user.service";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
import { updateUserValidator } from "../shared/validators/user.validators";
export const getUsersController = asyncHandler(async (req, res, next) => {
    const users = await getUsers(req, res, next);
    return res.status(200).send(users);
});
export const getUserController = asyncHandler(async (req, res, next) => {
    const user = await getUser(req, res, next);
    return res.status(200).send(user);
});
export const updateUserController = asyncHandler(async (req, res, next) => {
    const { error } = await updateUserValidator.validateAsync(req.body);
    if (error) {
        return next(new ErrorResponse(error.message, 400));
    }
    else {
        const user = await updateUser(req, res, next);
        return res.status(200).json(user);
    }
});
//# sourceMappingURL=user.controller.js.map