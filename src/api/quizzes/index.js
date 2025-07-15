const QuizzesHandler = require("./handler");
const routes = require('./routes');

module.exports = {
    name: "quizzes",
    version: "1.0.0",
    register: async (server, {service, validator}) => {
        const quizzesHandler = new QuizzesHandler(service, validator);
        server.route(routes(quizzesHandler));
    }
}