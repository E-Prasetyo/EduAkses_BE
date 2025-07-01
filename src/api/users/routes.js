const routes = (handler) => [
    {
      method: 'POST',
      path: '/api/register',
      handler: (request, h) =>handler.postRegisterHandler(request, h),
    },
    {
      method: 'GET',
      path: '/api/users/{id}',
      handler: (request, h) => handler.getUserByIdHandler(request, h),
      options: {
        auth: 'eduaksessapp_jwt',
      }
    },
    {
      method: 'GET',
      path: '/api/users',
      handler: (request, h) => handler.getUsersByUsernameHandler(request, h),
      options: {
        auth: 'eduaksessapp_jwt',
      }
    },
  ];
   
  module.exports = routes;