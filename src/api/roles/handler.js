class RoutesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postRolesHandler(request, h) {
        this._validator.validateRolesPayload(request.payload);

        const { name } = request.payload;

        const roleId = await this._service.postRoles(name);

        const response = h.response({
            status: 'success',
            message: 'Role berhasil di tambahkan',
            data: {
               roleId
            }
        })
        response.code(201);
        return response;
    }

    async getRolesHandler(request, h) {

        const roles = await this._service.getAllRoles();

        const response = h.response({
            status: 'success',
            message: 'Roles berhasil di dapatkan',
            data: {
                roles
            }
        })
        response.code(200);
        return response;
    }

    async getRolesUsersHandler(request, h) {

        const roles = await this._service.getAllRolesUsers();

        const response = h.response({
            status: 'success',
            message: 'Roles berhasil di dapatkan',
            data: {
                roles
            }
        })
        response.code(200);
        return response;
    }

    async putRolesHandler(request, h) {
        this._validator.validateRolesPayload(request.payload);

        const { name } = request.payload;
        const { id: roleId } = request.params;

        await this._service.putRoles(name, roleId);

        const response = h.response({
            status: 'success',
            message: 'Berhasil melakukan update role'
        })
        response.code(200)
        return response;
    }
}

module.exports = RoutesHandler;