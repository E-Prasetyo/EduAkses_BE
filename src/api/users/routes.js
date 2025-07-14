const roles = require("../roles");

const routes = (handler) => [
  {
    // add by user register
    method: 'POST',
    path: '/api/register',
    handler: (request, h) => handler.postRegisterHandler(request, h),
    config: {
      plugins: {
        hapiAclAuth: {
          secure: false
        }
      }
    }
  },
  {
    // add by admin
    method: 'POST',
    path: '/api/users',
    handler: (request, h) => handler.postAddUserAdminHandler(request, h),
    config: {
      plugins: {
        hapiAclAuth: {
          secure: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/users/{id}',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
    options: {
      auth: 'eduaksessapp_jwt',
      plugins: {
        hapiAclAuth: {
          roles: ['admin','user']
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: (request, h) => handler.getUsersByUsernameHandler(request, h),
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
    method: 'PUT',
    path: '/api/users',
    handler: (request, h) => handler.putUsersHandler(request, h),
    options: {
      auth: 'eduaksessapp_jwt',
      plugins: {
        hapiAclAuth: {
          roles: ['admin','user','lecture']
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/users/{id}',
    handler: (request, h) => handler.putAdminHandler(request, h),
    options: {
      auth: 'eduaksessapp_jwt',
      plugins: {
        hapiAclAuth: {
          roles: ['admin']
        }
      }
    }
  },
];
   
  module.exports = routes;