const Joi = require('joi');

const PostCategoriesValidateSchema = Joi.object({
    title: Joi.string().required()
})

module.exports = {
    PostCategoriesValidateSchema
}