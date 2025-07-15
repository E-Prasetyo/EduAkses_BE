const { Pool } = require('pg');

class QuizzesService {
    constructor() {
        this._pool = new Pool();
    }

    async postQuizzes(idContent, payload, credentialId) {
        return idContent;
    }
}

module.exports = QuizzesService;