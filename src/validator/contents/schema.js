const Joi = require('joi');

const PostContentSchemaPayload = Joi.object({
    title: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    video: Joi.string(),
    level: Joi.string(),
    material: Joi.string(),
    categories: Joi.string().required(),
    imageThumbnail: Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required(),
}) 

const PutContentSchemaPayload = Joi.object({
    title: Joi.string(),
    duration: Joi.number(),
    description: Joi.string(),
    video: Joi.string(),
    level: Joi.string(),
    categories: Joi.string(),
    imageThumbnail: Joi.string(),
}) 

const postMaterialsIdPayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

const postMaterialsPayloadSchema = Joi.object({
    // idContent: Joi.string(),
    materials: Joi.array().items(
        Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
        })
    ).min(1).required()
})

//const ImageHeadersSchema = Joi.object({
//  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
//}).unknown();



module.exports = {
    PostContentSchemaPayload,
    postMaterialsPayloadSchema,
    postMaterialsIdPayloadSchema,
    PutContentSchemaPayload
    //ImageHeadersSchema,
}