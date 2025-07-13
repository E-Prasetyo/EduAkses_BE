const routes = require("./routes");
const CategoriesHandler = require('./handler');

module.exports = {
    name: "categories",
    version: "1.0.0",
    register: async (server, {service, validator}) => {
        const categoriesHandler = new CategoriesHandler(service, validator);
        server.route(routes(categoriesHandler));
    }
}