const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/categories',
        handler: (request, h) => handler.postCategoriesHandler(request, h),
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
        method: 'GET',
        path: '/api/categories',
        handler: (request, h) => handler.getAllCategoriesHandler(request, h),
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
        path: '/api/categories/{id}',
        handler: (request, h) => handler.putCategoriesHandler(request, h),
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