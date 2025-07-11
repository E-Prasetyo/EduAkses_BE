const InvariantError = require('../../exceptions/InvariantError');
const {
  UserPayloadAdminSchema,
  RegisterPayloadSchema
} = require('./schema');
 
const UsersValidator = {
  validateRegisterPayload: (payload) => {
    const validationResult = RegisterPayloadSchema.validate(payload);
 
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateAddUserPayload: (payload) => {
    const validationResult = UserPayloadAdminSchema.validate(payload);
 
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;