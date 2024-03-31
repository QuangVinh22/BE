const { BadRequestError } = require("../../core/error.response"); // Giả sử đây là đường dẫn đến file của bạn
const Joi = require("joi");

const validateQRRolePost = (req, res, next) => {
  const postSchema = Joi.object({
    franchise_id: Joi.number().integer().required().messages({
      "number.base": `"Franchise ID" must be a number.`,
      "number.integer": `"Franchise ID" must be an integer.`,
      "any.required": `"Franchise ID" is a required field.`,
    }),
    max_qr_codes: Joi.number().integer().required().messages({
      "number.base": `"Max QR Codes" must be a number.`,
      "number.integer": `"Max QR Codes" must be an integer.`,
      "any.required": `"Max QR Codes" is a required field.`,
    }),
    role_id: Joi.number().integer().required().messages({
      "number.base": `"Role ID" must be a number.`,
      "number.integer": `"Role ID" must be an integer.`,
      "any.required": `"Role ID" is a required field.`,
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
const validateQRRolePut = (req, res, next) => {
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
    max_qr_codes: Joi.number().integer().optional().messages({
      "number.base": `"Max QR Codes" must be a number.`,
      "number.integer": `"Max QR Codes" must be an integer.`,
    }),
    role_id: Joi.number().integer().optional().messages({
      "number.base": `"Role ID" must be a number.`,
      "number.integer": `"Role ID" must be an integer.`,
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
module.exports = { validateQRRolePost, validateQRRolePut };
