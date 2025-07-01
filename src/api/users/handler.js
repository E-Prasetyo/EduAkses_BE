const { validationPassword  } = require('../../utils')

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        
    }
 
    async postRegisterHandler(request, h) {
      this._validator.validateRegisterPayload(request.payload);
      const { email, password, confirmPassword, fullname, role } = request.payload;

      if (!validationPassword(password, confirmPassword)) {
        const response = h.response({
          status: 'fail',
          message: 'Password dan confirm password, berbeda',
        });
        response.code(404);
        return response;
      }

      const userId = await this._service.addRegister({ email, password, fullname, role });

      const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
          userId,
      },
      });
      response.code(201);
      return response;
    }
    
    async getUserByIdHandler(request, h) {
      const { id } = request.params;

      const user = await this._service.getUserById(id);
      
      const response = h.response({
        status: 'success',
          data: {
            user,
          }
        });
      response.code(201);
      return response;
    }

    async getUsersByUsernameHandler(request, h) {
      const { username = '' } = request.query;
      const users = await this._service.getUsersByUsername(username);

      const response = h.response({
        status: 'success',
        data: {
          users,
        },
      });
      response.code(200);
      return response;
    }
}

module.exports = UsersHandler;