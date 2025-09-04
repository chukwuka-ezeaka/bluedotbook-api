import passport from "passport";
import asyncHandler from "./async";
import ErrorResponse from "../utils/errorResponse";
export const isAuthenticated = asyncHandler(async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            return next(new ErrorResponse("Unauthorized access", 401));
        }
        else {
            req.user = user;
            return next();
        }
    })(req, res, next);
});
//# sourceMappingURL=auth.jwt.js.map