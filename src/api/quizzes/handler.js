class QuizzesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postQuizzesHandler(request, h) {
        this._validator.validateQuizzesPayload(request.payload);

        const { id: idContent } = request.params;
        const { id: credentialId } = request.auth.credentials;

       const result = await this._service.postQuizzes(idContent, request.payload, credentialId);

        const response = h.response({
            status: 'success',
            message: 'Quizzes berhasil ditambahkan',
            data: {
                result
            }
        })

        return response;
    }
}

module.exports = QuizzesHandler;