import Joi from "joi";
export const addToCartValidator = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});
export const updateCartValidator = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});
//# sourceMappingURL=cart.validator .map
