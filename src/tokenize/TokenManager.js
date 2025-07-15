const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');
const config = require('../config/config');
 
const TokenManager = {
    generateAccessToken: (payload) => Jwt.token.generate(payload, config.jwt.accessTokenKeys),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, config.jwt.refreshTokenKey),
    verifyRefreshToken: (refreshToken) => {
        try {
          const artifacts = Jwt.token.decode(refreshToken);
          Jwt.token.verifySignature(artifacts, config.jwt.refreshTokenKey);
          const { payload } = artifacts.decoded;
          return payload;
        } catch (error) {
          throw new InvariantError(`Refresh token tidak valid, ${error.message}`);
        }
    },
};
 
module.exports = TokenManager;