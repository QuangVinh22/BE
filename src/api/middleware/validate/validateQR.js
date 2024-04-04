const { BadRequestError } = require("../../core/error.response"); // Giả sử đây là đường dẫn đến file của bạn
const Joi = require("joi");

const validateQRPost = (req, res, next) => {
  const postSchema = Joi.object({
    order_id: Joi.number().integer().required().messages({
      "number.base": `"Order ID" must be a number.`,
      "number.integer": `"Order ID" must be an integer.`,
      "any.required": `"Order ID" is a required field.`,
    }),
    table_id: Joi.number().integer().required().messages({
      "number.base": `"Table ID" must be a number.`,
      "number.integer": `"Table ID" must be an integer.`,
      "any.required": `"Table ID" is a required field.`,
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
const validateQRPut = (req, res, next) => {
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
    table_id: Joi.number().integer().optional().messages({
      "number.base": `"Table ID" must be a number.`,
      "number.integer": `"Table ID" must be an integer.`,
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

module.exports = { validateQRPost, validateQRPut };
