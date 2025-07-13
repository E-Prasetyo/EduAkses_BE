const InvariantError = require('../../exceptions/InvariantError');
const {
    PostCategoriesValidateSchema
} = require('./schema');
 

const CategoriesValidate = {
    validateCategoriesPayload: (payload) => {
        const validationResult = PostCategoriesValidateSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = CategoriesValidate;