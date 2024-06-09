const { BadRequestError } = require("../../core/error.response"); // Giả sử đây là đường dẫn đến file của bạn
const Joi = require("joi");

const MenuProductValidationSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.base": `"Menu Product Name" must be a string.`,
    "string.max": `"Menu Product Name" must not exceed 50 characters.`,
    "any.required": `"Menu Product Name" is a required field.`,
  }),

  product_id: Joi.number().integer().messages({
    "number.base": "ProductId must be an integer",
  }),
  catalogue_id: Joi.number().integer().messages({
    "number.base": "CatalogueId  must be an integer",
  }),
  status: Joi.boolean().messages({
    "boolean.base": `"Status" must be true or false.`,
    "any.required": `"Status" is a required field.`,
  }),
});

// Usage example
const validateMenuProductPost = (req, res, next) => {
  const { error } = MenuProductValidationSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
const validateMenuProductPut = (req, res, next) => {
  const { error } = MenuProductValidationSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
module.exports = { validateMenuProductPost, validateMenuProductPut };
