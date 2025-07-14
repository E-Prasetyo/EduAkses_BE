const Hapi = require('@hapi/hapi');
require('dotenv').config();
const Jwt = require('@hapi/jwt');
const AclAuth = require('hapi-acl-auth');
const Inert = require('@hapi/inert');
const path = require('path');

//users
const users = require('./api/users');
const UsersService = require('./services/UsersService');
const UsersValidator = require('./validator/users');
const ClientError = require('./exceptions/ClientError');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// roles
const roles = require('./api/roles');
const RolesService = require('./services/RolesService');
const RoleValidator = require('./validator/roles');

// categories
const categories = require('./api/categories');
const CategoriesService = require('./services/CategoriesService');
const CategoriesValidator = require('./validator/categories');

// contents
const contents = require('./api/contents');
const ContentsService = require('./services/ContentsService');
const ContentsValidator = require('./validator/contents');

// uploads
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');
const AuthenticationError = require('./exceptions/AuthenticationError');

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const rolesService = new RolesService();
  const categoriesService = new CategoriesService();
  const contentsService = new ContentsService(usersService);
  const storageService = new StorageService(path.resolve(__dirname, 'uploads/images'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
    {
      plugin: AclAuth,
      options: {
        handler: async function (request) {
          return { 
            roles : request.auth.credentials.role
          }
        },
        // optional, dy default a simple 403 will be returned when not authorized
        forbiddenPageFunction: async function (credentials, request, h) {
          // some fancy "logging"
          // console.log(credentials)
          // some fancy error page
          throw new AuthenticationError(`${request.auth.credentials.role}, Not Authorized!`)
        }
      }
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('eduaksessapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        role: artifacts.decoded.payload.role
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: roles,
      options: {
        service: rolesService,
        validator: RoleValidator
      }
    },
    {
      plugin: categories,
      options: {
        service: categoriesService,
        validator: CategoriesValidator
      }
    },
    {
      plugin: contents,
      options: {
        service: contentsService,
        validator: ContentsValidator,
        storageService
      }
    },
    {
      plugin: uploads,
      options: {
        service: storageService,
        validator: UploadsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {

    const { response } = request;

    if (response instanceof Error) {
      
      if (response.message) {
        console.log(response.message);
      }

      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server telah berjalan pada ${server.info.uri}`);
};

init();