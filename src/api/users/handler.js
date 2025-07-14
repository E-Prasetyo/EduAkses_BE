const InvariantError = require('../../exceptions/InvariantError');
const { validationPassword  } = require('../../utils')

class UsersHandler {
  constructor(service, validator) {
      this._service = service;
      this._validator = validator;
      
  }
 
  async postRegisterHandler(request, h) {
    
    this._validator.validateRegisterPayload(request.payload);
    
    const role = 'roles-yPswyBdxAgcMLzZD';

    const { email, password, confirmPassword, fullname } = request.payload;

    if (!validationPassword(password, confirmPassword)) {
      throw new InvariantError('Password dan confirm password, berbeda')
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
  
  async postAddUserAdminHandler(request, h) {
      
    this._validator.validateAddUserPayload(request.payload);
    const { email, password, confirmPassword, fullname, role } = request.payload;

    if (!validationPassword(password, confirmPassword)) {
      throw new InvariantError('Password dan confirm password, berbeda')
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

  async putUsersHandler(request, h) {
    this._validator.validateAddUserPayload(request.payload);

    const { email, password, confirmPassword, fullname } = request.payload;
    const userLogin = request.auth.credentials;

    if (!validationPassword(password, confirmPassword)) {
      throw new InvariantError('Password dan confirm password, berbeda')
    }

    await this._service.putDataUsers({ idUser: userLogin.id, email, password, fullname }); 

    const response = h.response({
      status: 'success',
      message: 'User berhasil dirubah'
    });

    response.code(201);
    return response;
  }

  async putAdminHandler(request, h) {
    this._validator.validateAddUserPayload(request.payload);

    const { email, password, confirmPassword, fullname, role } = request.payload;
    const { id: idUser } = request.params;

    if (!validationPassword(password, confirmPassword)) {
      throw new InvariantError('Password dan confirm password, berbeda')
    }

    await this._service.putDataUsersAdmin({ idUser, email, password, fullname, role }); 

    const response = h.response({
      status: 'success',
      message: 'User berhasil dirubah',
    });

    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;