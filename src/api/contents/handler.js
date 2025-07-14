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

        console.log(request.auth.credentials);

        const { id: credentialId } = request.auth.credentials;
        const fileName = await this._storageService.writeFile(request.payload.imageThumbnail, request.payload.imageThumbnail.hapi);
        
        const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${fileName}`

        const contentId = await this._service.postContents(dataValidation, credentialId, fileLocation);

        const response = h.response({
            status: 'success',
            message: 'Content berhasil di tambahkan',
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

    async getContentsByIdHandler(request, h) {
        const { id: idContent } = request.params;

        const content = await this._service.getContentsById(idContent);

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

    async getContentsByIdMaterialsHandler(request, h) {
        const { id: idContent } = request.params;

        const content = await this._service.getContentsByIdMaterials(idContent);

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

        const { materials } = request.payload;
        const { id: idContent } = request.params;

        const results = [];

        for (const material of materials) {
            const { title, description } = material;
            const result = await this._service.postContentsMaterial(idContent, title, description );
            results.push(result);
        }

        const response = h.response({
            status: 'success',
            message: 'Material berhasil di tambahkan',
            data: {
                results
            }
        });
        response.code(201)
        return response;
    }

    async putContentsHandler(request, h) {

        let contentId = '';

        let dataValidation = {
            title: request.payload.title,
            duration: request.payload.duration,
            description: request.payload.description,
            video: request.payload.video,
            level: request.payload.level,
            categories: request.payload.categories
        };

        const { id: credentialId } = request.auth.credentials;
        const { id: idContent } = request.params;


        // validation 
        await this._service.verifyContentOwner(idContent, credentialId);
        
        if (request.payload.imageThumbnail.hapi) {
            dataValidation.imageThumbnail = request.payload.imageThumbnail.hapi.headers['content-type'];

            this._validator.validateContentPayload(dataValidation);

            const fileName = await this._storageService.writeFile(request.payload.imageThumbnail, request.payload.imageThumbnail.hapi);
        
            const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${fileName}`

            contentId = await this._service.putContents(idContent,dataValidation, fileLocation);
        } else {
            this._validator.validatePutContentPayload(dataValidation);

            contentId = await this._service.putContents(idContent,dataValidation, request.payload.imageThumbnail);
        }

        const response = h.response({
            status: 'success',
            message: 'Cotent berhasil di rubah',
            data: {
              contentId 
            }
        })
        response.code(201);
        return response;
    }
}

module.exports = ContentsHandler;