const Joi = require('joi');

const PostQuizzesPayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    timeLimit: Joi.number().required(),
    passingScore: Joi.number().required(),
    questions: Joi.array().items(
                    Joi.object({
                        question: Joi.string().required(),
                        type: Joi.string().required(),
                        options: Joi.array().items().min(4).required(),
                        explanation: Joi.string().required(),
                        correctAnswer: Joi.number().required()  
                    })
                ).min(1).required()
})

module.exports = {
    PostQuizzesPayloadSchema
}