const routes = (handler) => [
  {
    method: "GET",
    path: "/forums/{id}",
    handler: handler.getForumByIdHandler,
    options: {
      auth: "eduaksessapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/forums/{id}/comments",
    handler: handler.getCommentsByForumIdHandler,
    options: {
      auth: "eduaksessapp_jwt",
    },
  },
  {
    method: "POST",
    path: "/forums/{id}/comments",
    handler: handler.postCommentHandler,
    options: {
      auth: "eduaksessapp_jwt",
    },
  },
];
module.exports = routes;
