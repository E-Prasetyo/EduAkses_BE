class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager, validator) {
      this._authenticationsService = authenticationsService;
      this._usersService = usersService;
      this._tokenManager = tokenManager;
      this._validator = validator;
    }
   
  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);

    const { email, password } = request.payload;
    const { id, role } = await this._usersService.verifyUserCredential(email, password);
  
    const accessToken = this._tokenManager.generateAccessToken({ id, role });
    const refreshToken = this._tokenManager.generateRefreshToken({ id, role });
    
    await this._authenticationsService.addRefreshToken(refreshToken);
     
    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

    async putAuthenticationHandler(request, h) {
        this._validator.validatePutAuthenticationPayload(request.payload);
        
        const { refreshToken } = request.payload;
        await this._authenticationsService.verifyRefreshToken(refreshToken);
      
        const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
        
        const accessToken = this._tokenManager.generateAccessToken({ id });
        
        const response = h.response({
          status: 'success',
          message: 'Access Token berhasil diperbarui',
          data: {
            accessToken,
          }
        });
        response.code(200);
        return response;
    }

    async deleteAuthenticationHandler(request,h) {
        this._validator.validateDeleteAuthenticationPayload(request.payload);
     
        const { refreshToken } = request.payload;
        await this._authenticationsService.verifyRefreshToken(refreshToken);
        await this._authenticationsService.deleteRefreshToken(refreshToken);
        
     
        const response = h.response({
          status: 'success',
          message: 'Refresh token berhasil dihapus',
        });
        response.code(200);
        return response;
    }
}
  
module.exports = AuthenticationsHandler;