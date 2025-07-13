const InvariantError = require('../../exceptions/InvariantError');
const {
    PostContentSchemaPayload,
    postMaterialsPayloadSchema,
    postMaterialsIdPayloadSchema,
   // ImageHeadersSchema
} = require('./schema');


const ContentsValidate = {
    validateContentPayload: (payload) => {
        const validationResult = PostContentSchemaPayload.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validatePostMaterialsPayload: (payload) => {
        const validationResult = postMaterialsPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validatePostIdMaterialsPayload: (payload) => {
        const validationResult = postMaterialsIdPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
    //  validateImageHeaders: (headers) => {
    //      const validationResult = ImageHeadersSchema.validate(headers);  
    //      if (validationResult.error) {
    //        throw new InvariantError(validationResult.error.message);
    //      }
    //    },
}

module.exports = ContentsValidate;
