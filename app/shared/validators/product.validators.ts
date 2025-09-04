import Joi from "joi";

export const createCategoryValidator = Joi.object({
  name: Joi.string().min(3).required(),
});

export const createProductValidator = Joi.object({
  name: Joi.string().min(3).required(),
  imageUrl: Joi.string().min(3).required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  currency: Joi.string().required(),
});

export const updateProductValidator = Joi.object({
  inStock: Joi.boolean().required().optional(),
  name: Joi.string().min(3).required().optional(),
  imageUrl: Joi.string().min(3).required().optional(),
  description: Joi.string().required().optional(),
  category: Joi.string().required().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  price: Joi.number().required().optional(),
  quantity: Joi.number().required().optional(),
  currency: Joi.string().optional(),
});
