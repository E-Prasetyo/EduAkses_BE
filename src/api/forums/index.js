const routes = require("./routes");
const ForumsHandler = require("./handler");

module.exports = {
  name: "forums",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const forumsHandler = new ForumsHandler(service, validator);
    server.route(routes(forumsHandler));
  },
};
