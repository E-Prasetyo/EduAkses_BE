const routes = (handler) => [
    {
        method: "POST",
        path: "/api/contents",
        handler: (request, h) => handler.postContentsHandler(request, h),
        options: {
            auth: 'eduaksessapp_jwt',
            plugins: {
                hapiAclAuth: {
                    roles: ['lecture']
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
            auth: false,
            plugins: {
                hapiAclAuth: {
                    secure: false
                }
            }
        }
    },
    {
        method: "GET",
        path: "/api/contents/{id}",
        handler: (request, h) => handler.getContentsByIdHandler(request, h),
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
        method: "PUT",
        path: "/api/contents/{id}",
        handler: (request, h) => handler.putContentsHandler(request, h),
        options: {
            auth: 'eduaksessapp_jwt',
            plugins: {
                hapiAclAuth: {
                    roles: ['lecture','admin']
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
        path: "/api/contents/{id}/materials",
        handler: (request, h) => handler.getContentsByIdMaterialsHandler(request, h),
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
        path: "/api/contents/{id}/materials",
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
    {
        method: "PUT",
        path: "/api/contents/{id}/status",
        handler: (request, h) => handler.getContentsByIdMaterialsHandler(request, h),
        options: {
            auth: 'eduaksessapp_jwt',
            plugins: {
                hapiAclAuth: {
                    roles: ['admin','lecture']
                }
            }
        }
    }
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