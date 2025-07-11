const routes = (handler) => [
    {
      method: 'POST',
      path: '/api/authentications',
      handler: (request, h) => handler.postAuthenticationHandler(request, h),
      config: {
        plugins: {
          hapiAclAuth: {
            secure: false
          }
        }
      }
    },
    {
      method: 'PUT',
      path: '/api/authentications',
      handler: (request, h) => handler.putAuthenticationHandler(request, h),
      config: {
        plugins: {
          hapiAclAuth: {
            secure: false
          }
        }
      }
    },
    {
      method: 'DELETE',
      path: '/api/authentications',
      handler: (request, h) => handler.deleteAuthenticationHandler(request, h),
      config: {
        plugins: {
          hapiAclAuth: {
            secure: false
          }
        }
      }
    },
  ];
   
  module.exports = routes;