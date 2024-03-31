const Joi = require("joi");
const { BadRequestError } = require("../../core/error.response");
const CataloguePostSchema = Joi.object({
  description: Joi.string().min(5).max(50).required().messages({
    "string.base": `"Description" must be a string.`,
    "string.min": `"Description" must be at least 5 characters long.`,
    "string.max": `"Description" must not exceed 50 characters.`,
    "any.required": `"Description" is a required field.`,
  }),
  image: Joi.string().uri().messages({
    "string.base": `"Image" must be a string.`,
    "string.uri": `"Image" must be a valid URL.`,
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
const validateCataloguePutSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().min(5).max(50).required().messages({
    "string.base": `"Description" must be a string.`,
    "string.min": `"Description" must be at least 5 characters long.`,
    "string.max": `"Description" must not exceed 50 characters.`,
    "any.required": `"Description" is a required field.`,
  }),
  image: Joi.string().uri().messages({
    "string.base": `"Image" must be a string.`,
    "string.uri": `"Image" must be a valid URL.`,
  }),
  updated_by: Joi.number().integer().required().messages({
    "number.base": `"Updated By" must be a number.`,
    "number.integer": `"Updated By" must be an integer.`,
    "any.required": `"Updated By" is a required field.`,
  }),
  status: Joi.boolean().required().messages({
    "boolean.base": `"Status" must be true or false.`,
    "any.required": `"Status" is a required field.`,
  }),
});
const validateCataloguePost = (req, res, next) => {
  const { error } = CataloguePostSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
const validateCataloguePut = (req, res, next) => {
  const { error } = validateCataloguePutSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
module.exports = { validateCataloguePost, validateCataloguePut };
