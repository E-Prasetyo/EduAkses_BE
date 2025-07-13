const ContentsHandler = require("./handler");
const routes = require('./routes');

module.exports = {
    name: "contents",
    version: "1.0.0",
    register: async (server, {service, validator, storageService}) => {
        const contentsHandler = new ContentsHandler(service, validator, storageService);
        server.route(routes(contentsHandler));
    }
}