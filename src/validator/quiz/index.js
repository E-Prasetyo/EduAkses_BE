const InvariantError = require('../../exceptions/InvariantError');
const { PostQuizzesPayloadSchema } = require('./schema');

const RolesValidator = {
    validateQuizzesPayload: (payload) => {
        const validationResult = PostQuizzesPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = RolesValidator;