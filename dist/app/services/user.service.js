import dotenv from "dotenv";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
import { paginate, pageCount, search } from "../shared/utils/index";
import { UserModel } from "../shared/models/user.model";
dotenv.config();
export const getUsers = asyncHandler(async (req, res, next) => {
    const { page = 1, pageSize = 500, ...query } = req.query;
    const searchQuery = await search(query);
    const pagination = paginate({
        page: Number(page),
        pageSize: Number(pageSize),
    });
    const users = await UserModel.find(searchQuery)
        .limit(pagination.limit)
        .skip(pagination.offset)
        .sort({ createdAt: -1 });
    const count = await UserModel.countDocuments(searchQuery);
    if (!users.length) {
        return next(new ErrorResponse("User(s) not found", 404));
    }
    return {
        success: true,
        message: "Request successfull",
        pagination: {
            ...pageCount({ count, page: Number(page), pageSize: Number(pageSize) }),
        },
        data: users,
    };
});
export const getUser = asyncHandler(async (req, res, next) => {
    let searchQuery = await search(req.query);
    if (!Object.keys(searchQuery).length) {
        searchQuery._id = req.params.id ? req.params.id : req.user?.id;
    }
    console.log(searchQuery);
    const user = await UserModel.findOne(searchQuery).select("-resetPasswordExpires, -resetPasswordToken");
    if (!user) {
        return next(new ErrorResponse("user not found", 404));
    }
    return {
        success: true,
        message: "Request successfull",
        data: user,
    };
});
export const updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id ? req.params.id : req.user?._id;
    const { email, isActive, isAdmin, ...rest } = req.body;
    console.log("🚀 ~ updateUser ~ body:", req.body);
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }
    for (const field in rest) {
        user[field] = rest[field];
    }
    const update = await user.save();
    return {
        success: true,
        message: "User updated successfully",
        data: update,
    };
});
//# sourceMappingURL=user.service.js.map