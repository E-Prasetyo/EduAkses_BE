class CategoriesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postCategoriesHandler(request, h) {
        this._validator.validateCategoriesPayload(request.payload);

        const { title } = request.payload;
        
        const categoryId = await this._service.postCategories(title);

        const response = h.response({
            status: 'success',
            message: 'Categories berhasil ditambahkan',
            data: {
                categoryId
            }
        })
        response.code(201);
        return response;
    }

    async getAllCategoriesHandler(request, h) {
      
        const categories = await this._service.getAllCategories();

        const response = h.response({
            status: 'success',
            message: 'Data berhasil didapatkan',
            data: {
                categories
            }
        })
        response.code(200);
        return response;
    }

    async putCategoriesHandler(request, h) {
        this._validator.validateCategoriesPayload(request.payload);

        const { id: idTitle } = request.params;
        const { title } = request.payload;
        
        await this._service.putCategories(title, idTitle);

        const response = h.response({
            status: 'success',
            message: 'Categories berhasil dirubah'
        })
        response.code(200);
        return response;
    }
    
}

module.exports = CategoriesHandler;