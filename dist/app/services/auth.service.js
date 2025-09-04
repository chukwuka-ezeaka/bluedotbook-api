import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";
import { UserModel } from "../shared/models/user.model.js";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = asyncHandler(async (req, res, next) => {
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
    });
});
export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: username.toLowerCase() },
        ],
    });
    if (!user) {
        return next(new ErrorResponse("Invalid login credentials", 400));
    }
    const validate = await bcrypt.compareSync(password, user.password);
    if (!validate) {
        return next(new ErrorResponse("Invalid login credentials", 400));
    }
    const userJwt = {
        id: user._id,
        email: user.email,
        username: user.username,
    };
    const expire = 2592000;
    const token = await jwt.sign(userJwt, process.env.SECRET, {
        expiresIn: expire,
    });
    return res.status(200).send({
        success: true,
        message: "login successful",
        data: user,
        authorization: {
            token,
            expiresIn: expire,
        },
    });
});
//# sourceMappingURL=auth.service.js.map