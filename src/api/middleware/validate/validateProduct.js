const { BadRequestError } = require("../../core/error.response"); // Giả sử đây là đường dẫn đến file của bạn
const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.base": `"Product Name" must be a string.`,
    "string.max": `"Product Name" must not exceed 50 characters.`,
    "any.required": `"Product Name" is a required field.`,
  }),
  description: Joi.string().max(50).required().messages({
    "string.base": `"Description" must be a string.`,
    "string.max": `"Description" must not exceed 50 characters.`,
    "any.required": `"Description" is a required field.`,
  }),
  image: Joi.string()

    .pattern(new RegExp("^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$"))
    .messages({
      "string.pattern.base": `"Image" must be a valid URL.`,
    }),
  price: Joi.number().required().messages({
    "number.base": `"Price" must be a number.`,
    "any.required": `"Price" is a required field.`,
  }),
  vat: Joi.number().required().messages({
    "number.base": `"VAT" must be a number.`,
    "any.required": `"VAT" is a required field.`,
  }),

  updated_by: Joi.number().integer().messages({
    "number.base": `"Updated By" must be a number.`,
    "number.integer": `"Updated By" must be an integer.`,
  }),
  created_by: Joi.number().integer().required().messages({
    "number.base": `"Created By" must be a number.`,
    "number.integer": `"Created By" must be an integer.`,
    "any.required": `"Created By" is a required field.`,
  }),
  status: Joi.boolean().required().messages({
    "boolean.base": `"Status" must be true or false.`,
    "any.required": `"Status" is a required field.`,
  }),
});

// Usage example
const validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
  // Proceed with validated data
};
module.exports = { validateProduct };
