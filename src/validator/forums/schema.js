const Joi = require("joi");

const ThreadPayloadSchema = Joi.object({
  title: Joi.string().min(5).required(),
  body: Joi.string().min(10).required(),
});

const CommentPayloadSchema = Joi.object({
  body: Joi.string().min(10).required(),
  parent_id: Joi.string().uuid().allow(null),
});

module.exports = {
  ThreadPayloadSchema,
  CommentPayloadSchema,
};
