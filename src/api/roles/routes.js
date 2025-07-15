const routes = (handler) => [
    {
        method: "POST",
        path: "/api/roles",
        handler: (request, h) => handler.postRolesHandler(request, h),
        options: {
          auth: 'eduaksessapp_jwt',
          plugins: {
            hapiAclAuth: {
              roles: ['admin']
            }
          }
        }
  },
  {
    method: "GET",
    path: "/api/roles",
    handler: (request, h) => handler.getRolesHandler(request, h),
    options: {
      auth: 'eduaksessapp_jwt',
      plugins: {
        hapiAclAuth: {
          roles: ['admin']
        }
      }
    }
  },
   {
    method: "GET",
    path: "/api/roles/users",
    handler: (request, h) => handler.getRolesUsersHandler(request, h),
    options: {
      auth: false,
      plugins: {
        hapiAclAuth: {
          // roles: ['user','admin']
          secure: false
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/api/roles/{id}",
    handler: (request, h) => handler.putRolesHandler(request, h),
    options: {
      auth: 'eduaksessapp_jwt',
      plugins: {
        hapiAclAuth: {
          roles: ['admin']
        }
      }
    }
  }
];

module.exports = routes;