const { BadRequestError } = require("../../core/error.response"); // Giả sử đây là đường dẫn đến file của bạn
const Joi = require("joi");

const validateFloorsPost = (req, res, next) => {
  const postSchema = Joi.object({
    franchise_id: Joi.number().integer().required().messages({
      "number.base": `"Franchise ID" must be a number.`,
      "number.integer": `"Franchise ID" must be an integer.`,
      "any.required": `"Franchise ID" is a required field.`,
    }),
    floor_number: Joi.number().integer().required().messages({
      "number.base": `"Floor Number" must be a number.`,
      "number.integer": `"Floor Number" must be an integer.`,
      "any.required": `"Floor Number" is a required field.`,
    }),
    floor_name: Joi.string().required().messages({
      "string.base": `"Floor Name" must be a string.`,
      "any.required": `"Floor Name" is a required field.`,
    }),
    description: Joi.string().allow("").optional().messages({
      "string.base": `"Description" must be a string.`,
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
const validateFloorsPut = (req, res, next) => {
  const putSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": `"ID" must be a number.`,
      "number.integer": `"ID" must be an integer.`,
      "any.required": `"ID" is a required field.`,
    }),
    franchise_id: Joi.number().integer().optional().messages({
      "number.base": `"Franchise ID" must be a number.`,
      "number.integer": `"Franchise ID" must be an integer.`,
    }),
    floor_number: Joi.number().integer().optional().messages({
      "number.base": `"Floor Number" must be a number.`,
      "number.integer": `"Floor Number" must be an integer.`,
    }),
    floor_name: Joi.string().optional().messages({
      "string.base": `"Floor Name" must be a string.`,
    }),
    description: Joi.string().allow("").optional().messages({
      "string.base": `"Description" must be a string.`,
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

  const { error } = putSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
module.exports = { validateFloorsPost, validateFloorsPut };
