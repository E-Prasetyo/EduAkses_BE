const routes = require("./routes");
const ForumsHandler = require("./handler");

module.exports = {
  name: "forums",
  register: async (server, { service }) => {
    const handler = new ForumsHandler(service);
    server.route(routes(handler));
  },
};
