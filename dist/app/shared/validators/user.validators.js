import Joi from "joi";
export const updateUserValidator = Joi.object({
  fullname: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  username: Joi.string().min(3).optional(),
});
//# sourceMappingURL=user.validators .map
