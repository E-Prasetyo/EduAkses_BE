const routes = (handler) => [
    {
        method: "POST",
        path: "/api/contents/{id}/quizzes",
        handler: (request, h) => handler.postQuizzesHandler(request, h),
        options: {
          auth: 'eduaksessapp_jwt',
          plugins: {
            hapiAclAuth: {
              roles: ['lecture']
            }
          }
        }
  }
];

module.exports = routes;