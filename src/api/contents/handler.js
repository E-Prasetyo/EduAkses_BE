class ContentsHandler {
    constructor(service, validator, storageService) {
        this._service = service;
        this._validator = validator;
        this._storageService = storageService;
    }

    async postContentsHandler(request, h) {
        const dataValidation = {
            title: request.payload.title,
            duration: request.payload.duration,
            description: request.payload.description,
            video: request.payload.video,
            level: request.payload.level,
            material: request.payload.material,
            categories: request.payload.categories,
            imageThumbnail: request.payload.imageThumbnail.hapi.headers['content-type']
        }
        this._validator.validateContentPayload(dataValidation);

        const { id: credentialId } = request.auth.credentials;
        const fileName = await this._storageService.writeFile(request.payload.imageThumbnail, request.payload.imageThumbnail.hapi);
        
        const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${fileName}`

        const contentId = await this._service.postContents(dataValidation, credentialId, fileLocation);

        const response = h.response({
            status: 'success',
            message: 'Role berhasil di tambahkan',
            data: {
              contentId 
            }
        })
        response.code(201);
        return response;
    }

    async getAllContentsHandler(request, h) {
        
        const content = await this._service.getAllContents();

        const response = h.response({
            status: 'success',
            message: 'Data berhasil didapatkan',
            data: {
                content
            }
        })
        response.code(200);
        return response;
    }

    async postContentsMaterialHandler(request, h) {
        this._validator.validatePostMaterialsPayload(request.payload);

        const { materials, idContent } = request.payload;

        const results = [];

        for (const material of materials) {
            const { title, description } = material;
            const result = await this._service.postContentsMaterial(idContent, title, description );
            results.push(result);
        }

        const response = h.response({
            status: 'success',
            message: 'Materi behasil di tambahkan',
            data: {
                results
            }
        });
        response.code(201)
        return response;
    }


    // async postContentsMaterialIdHandler(request, h) {
    //     const { title, description } = request.payload;

    //     const { id: contentId } = request.params;

    //     return idContent;
    // }
}

module.exports = ContentsHandler;