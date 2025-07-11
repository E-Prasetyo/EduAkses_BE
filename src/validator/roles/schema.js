const Joi = require('joi');

const PostRolesValidateSchema = Joi.object({
    name: Joi.string().required()
});

module.exports = {
    PostRolesValidateSchema
}