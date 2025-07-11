const Joi = require('joi');
 
const UserPayloadAdminSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
    role: Joi.string().required(),
    confirmPassword: Joi.string().required()
});


const RegisterPayloadSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
    confirmPassword: Joi.string().required()
});


module.exports = {
    UserPayloadAdminSchema,
    RegisterPayloadSchema
}; 