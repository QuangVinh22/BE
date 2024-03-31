const { BadRequestError } = require("../../core/error.response"); // Giả sử đây là đường dẫn đến file của bạn
const Joi = require("joi");

const validateTablesPost = (req, res, next) => {
  const postSchema = Joi.object({
    floor_id: Joi.number().integer().required().messages({
      "number.base": `"Floor ID" must be a number.`,
      "number.integer": `"Floor ID" must be an integer.`,
      "any.required": `"Floor ID" is a required field.`,
    }),
    table_numbers: Joi.number().integer().required().messages({
      "number.base": `"Table Numbers" must be a number.`,
      "number.integer": `"Table Numbers" must be an integer.`,
      "any.required": `"Table Numbers" is a required field.`,
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
const validateTablesPut = (req, res, next) => {
  const putSchema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": `"ID" must be a number.`,
      "number.integer": `"ID" must be an integer.`,
      "any.required": `"ID" is a required field.`,
    }),
    floor_id: Joi.number().integer().optional().messages({
      "number.base": `"Floor ID" must be a number.`,
      "number.integer": `"Floor ID" must be an integer.`,
    }),
    table_numbers: Joi.number().integer().optional().messages({
      "number.base": `"Table Numbers" must be a number.`,
      "number.integer": `"Table Numbers" must be an integer.`,
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
module.exports = { validateTablesPost, validateTablesPut };
