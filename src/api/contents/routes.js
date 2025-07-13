const routes = (handler) => [
    {
        method: "POST",
        path: "/api/contents",
        handler: (request, h) => handler.postContentsHandler(request, h),
        options: {
            auth: 'eduaksessapp_jwt',
            plugins: {
                hapiAclAuth: {
                    roles: ['admin','lecture']
                }
            },
            payload: {
                maxBytes: 512000,  
                output: 'stream', 
                parse: true,
                multipart: true,
                allow: 'multipart/form-data'
            }
        }
    },
    {
        method: "GET",
        path: "/api/contents",
        handler: (request, h) => handler.getAllContentsHandler(request, h),
        options: {
            auth: 'eduaksessapp_jwt',
            plugins: {
                hapiAclAuth: {
                    roles: ['admin','lecture','user']
                }
            }
        }
    },
    {
        method: "POST",
        path: "/api/contents/materials",
        handler: (request, h) => handler.postContentsMaterialHandler(request, h),
        options: {
            auth: 'eduaksessapp_jwt',
            plugins: {
                hapiAclAuth: {
                    roles: ['admin','lecture']
                }
            }
        }
    },
    // {
    //     method: "POST",
    //     path: "/api/contents/{id}/materials",
    //     handler: (request, h) => handler.postContentsMaterialIdHandler(request, h),
    //     options: {
    //         auth: 'eduaksessapp_jwt',
    //         plugins: {
    //             hapiAclAuth: {
    //                 roles: ['admin','lecture']
    //             }
    //         }
    //     }
    // }
    
];

module.exports = routes;