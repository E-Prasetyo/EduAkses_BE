const InvariantError = require('../../exceptions/InvariantError');
const { PostRolesValidateSchema } = require('./schema');

const RolesValidator = {
    validateRolesPayload: (payload) => {
        const validationResult = PostRolesValidateSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = RolesValidator;