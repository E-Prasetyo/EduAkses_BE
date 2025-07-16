const InvariantError = require("../../exceptions/InvariantError");
const Joi = require("joi");

const ThreadPayloadSchema = Joi.object({
  title: Joi.string().min(5).required(),
  body: Joi.string().min(10).required(),
});

const CommentPayloadSchema = Joi.object({
  body: Joi.string().min(10).required(),
  parent_id: Joi.string().uuid().allow(null),
});

const ForumsValidator = {
  validateThreadPayload: (payload) => {
    const { error } = ThreadPayloadSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },

  validateCommentPayload: (payload) => {
    const { error } = CommentPayloadSchema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

module.exports = ForumsValidator;
