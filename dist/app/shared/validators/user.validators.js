import Joi from "joi";
export const updateUserValidator = Joi.object({
    fullname: Joi.string().min(3).optional(),
});
//# sourceMappingURL=user.validators.js.map