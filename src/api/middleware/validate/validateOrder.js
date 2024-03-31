const Joi = require("joi");
const { BadRequestError } = require("../../core/error.response");

const validateOrdersPost = (req, res, next) => {
  const postSchema = Joi.object({
    franchise_id: Joi.number().integer().required().messages({
      "number.base": `"Franchise ID" must be a number.`,
      "number.integer": `"Franchise ID" must be an integer.`,
      "any.required": `"Franchise ID" is a required field.`,
    }),
    floor_id: Joi.number().integer().required().messages({
      "number.base": `"Floor ID" must be a number.`,
      "number.integer": `"Floor ID" must be an integer.`,
      "any.required": `"Floor ID" is a required field.`,
    }),
    table_id: Joi.number().integer().required().messages({
      "number.base": `"Table ID" must be a number.`,
      "number.integer": `"Table ID" must be an integer.`,
      "any.required": `"Table ID" is a required field.`,
    }),
    payment_method_id: Joi.number().integer().required().messages({
      "number.base": `"Payment Method ID" must be a number.`,
      "number.integer": `"Payment Method ID" must be an integer.`,
      "any.required": `"Payment Method ID" is a required field.`,
    }),
    price: Joi.number().precision(2).required().messages({
      "number.base": `"Price" must be a number.`,
      "any.required": `"Price" is a required field.`,
    }),
    vat: Joi.number().precision(2).required().messages({
      "number.base": `"VAT" must be a number.`,
      "any.required": `"VAT" is a required field.`,
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
const validateOrdersPut = (req, res, next) => {
  const putSchema = Joi.object({
    id: Joi.number().integer(),
    franchise_id: Joi.number().integer().required().messages({
      "number.base": `"Franchise ID" must be a number.`,
      "number.integer": `"Franchise ID" must be an integer.`,
      "any.required": `"Franchise ID" is a required field.`,
    }),
    floor_id: Joi.number().integer().required().messages({
      "number.base": `"Floor ID" must be a number.`,
      "number.integer": `"Floor ID" must be an integer.`,
      "any.required": `"Floor ID" is a required field.`,
    }),
    table_id: Joi.number().integer().required().messages({
      "number.base": `"Table ID" must be a number.`,
      "number.integer": `"Table ID" must be an integer.`,
      "any.required": `"Table ID" is a required field.`,
    }),
    payment_method_id: Joi.number().integer().required().messages({
      "number.base": `"Payment Method ID" must be a number.`,
      "number.integer": `"Payment Method ID" must be an integer.`,
      "any.required": `"Payment Method ID" is a required field.`,
    }),
    // Optional fields for update
    price: Joi.number().precision(2).optional().messages({
      "number.base": `"Price" must be a number.`,
    }),
    vat: Joi.number().precision(2).optional().messages({
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
    status: Joi.boolean().optional().messages({
      "boolean.base": `"Status" must be true or false.`,
    }),
  });

  const { error } = putSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
module.exports = { validateOrdersPost, validateOrdersPut };
