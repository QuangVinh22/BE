const Joi = require("joi");
const { BadRequestError } = require("../../core/error.response");

const validateOrdersDetailPost = (req, res, next) => {
  const postSchema = Joi.object({
    order_id: Joi.number().integer().required().messages({
      "number.base": `"Order ID" must be a number.`,
      "number.integer": `"Order ID" must be an integer.`,
      "any.required": `"Order ID" is a required field.`,
    }),
    product_id: Joi.number().integer().required().messages({
      "number.base": `"Product ID" must be a number.`,
      "number.integer": `"Product ID" must be an integer.`,
      "any.required": `"Product ID" is a required field.`,
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      "number.base": `"Quantity" must be a number.`,
      "number.integer": `"Quantity" must be an integer.`,
      "number.min": `"Quantity" must be at least 1.`,
      "any.required": `"Quantity" is a required field.`,
    }),
    price_per_unit: Joi.number().precision(2).required().messages({
      "number.base": `"Price Per Unit" must be a number.`,
      "any.required": `"Price Per Unit" is a required field.`,
    }),
    vat: Joi.number().precision(2).optional().allow("").messages({
      "number.base": `"VAT" must be a number.`,
    }),
    discount: Joi.number().precision(2).optional().allow("").messages({
      "number.base": `"Discount" must be a number.`,
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

  const { error } = postSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
const validateOrdersDetailPut = (req, res, next) => {
  const putSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": `"ID" must be a number.`,
      "number.integer": `"ID" must be an integer.`,
      "any.required": `"ID" is a required field.`,
    }),
    order_id: Joi.number().integer().optional().messages({
      "number.base": `"Order ID" must be a number.`,
      "number.integer": `"Order ID" must be an integer.`,
    }),
    product_id: Joi.number().integer().optional().messages({
      "number.base": `"Product ID" must be a number.`,
      "number.integer": `"Product ID" must be an integer.`,
    }),
    quantity: Joi.number().integer().min(1).optional().messages({
      "number.base": `"Quantity" must be a number.`,
      "number.integer": `"Quantity" must be an integer.`,
      "number.min": `"Quantity" must be at least 1.`,
    }),
    price_per_unit: Joi.number().precision(2).optional().messages({
      "number.base": `"Price Per Unit" must be a number.`,
    }),
    vat: Joi.number().precision(2).optional().allow("").messages({
      "number.base": `"VAT" must be a number.`,
    }),
    discount: Joi.number().precision(2).optional().allow("").messages({
      "number.base": `"Discount" must be a number.`,
    }),
    updated_by: Joi.number().integer().required().messages({
      "number.base": `"Updated By" must be a number.`,
      "number.integer": `"Updated By" must be an integer.`,
      "any.required": `"Updated By" is a required field.`,
    }),
    status: Joi.boolean().required().messages({
      "boolean.base": `"Status" must be true or false.`,
    }),
  });

  const { error } = putSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};

module.exports = { validateOrdersDetailPost, validateOrdersDetailPut };
