const Hapi = require("@hapi/hapi");
require("dotenv").config();
const Jwt = require("@hapi/jwt");
const AclAuth = require("hapi-acl-auth");
const Inert = require("@hapi/inert");
const path = require("path");
const config = require("./config/config");

// Modul pengguna
const users = require("./api/users");
const UsersService = require("./services/UsersService");
const UsersValidator = require("./validator/users");

// Modul autentikasi
const authentications = require("./api/authentications");
const AuthenticationsService = require("./services/AuthenticationsService");
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationsValidator = require("./validator/authentications");

// Modul roles
const roles = require("./api/roles");
const RolesService = require("./services/RolesService");
const RoleValidator = require("./validator/roles");

// Modul kategori
const categories = require("./api/categories");
const CategoriesService = require("./services/CategoriesService");
const CategoriesValidator = require("./validator/categories");

// Modul konten
const contents = require("./api/contents");
const ContentsService = require("./services/ContentsService");
const ContentsValidator = require("./validator/contents");

// Modul kuis
const quizzes = require("./api/quizzes");
const QuizzesService = require("./services/QuizzesService");
const QuizzesValidator = require("./validator/quiz");

// Modul forum
const forums = require("./api/forums");
const ForumsService = require("./services/ForumsService");
const ForumsValidator = require("./validator/forums");

// Modul upload (lokal)
const uploads = require("./api/uploads");
const StorageService = require("./services/storage/StorageService-lokal");
const UploadsValidator = require("./validator/uploads");

// Error handler
const ClientError = require("./exceptions/ClientError");
const AuthenticationError = require("./exceptions/AuthenticationError");

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const rolesService = new RolesService();
  const categoriesService = new CategoriesService();
  const contentsService = new ContentsService(usersService);

  const storageService = new StorageService(
    path.resolve(__dirname, "../uploads/images")
  );

  const quizzesService = new QuizzesService();
  const forumsService = new ForumsService();

  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // Registrasi plugin eksternal
  await server.register([
    Jwt,
    Inert,
    {
      plugin: AclAuth,
      options: {
        handler: async (request) => ({
          roles: request.auth.credentials.role,
        }),
        forbiddenPageFunction: async (credentials, request, h) => {
          throw new AuthenticationError(
            `${request.auth.credentials.role}, Not Authorized!`
          );
        },
      },
    },
  ]);

  // Autentikasi JWT
  server.auth.strategy("eduaksessapp_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwt.accessTokenAge,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        role: artifacts.decoded.payload.role,
      },
    }),
  });

  // Registrasi plugin internal
  await server.register([
    {
      plugin: users,
      options: { service: usersService, validator: UsersValidator },
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
      options: { service: rolesService, validator: RoleValidator },
    },
    {
      plugin: categories,
      options: { service: categoriesService, validator: CategoriesValidator },
    },
    {
      plugin: contents,
      options: {
        service: contentsService,
        validator: ContentsValidator,
        storageService,
      },
    },
    {
      plugin: uploads,
      options: { service: storageService, validator: UploadsValidator },
    },
    {
      plugin: quizzes,
      options: { service: quizzesService, validator: QuizzesValidator },
    },
    {
      plugin: forums,
      options: { service: forumsService, validator: ForumsValidator },
    },
  ]);

  // Error Handling
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      console.error(response);

      if (response instanceof ClientError) {
        return h
          .response({ status: "fail", message: response.message })
          .code(response.statusCode);
      }

      if (!response.isServer) {
        return h.continue;
      }

      return h
        .response({
          status: "error",
          message: "Terjadi kegagalan pada server kami",
        })
        .code(500);
    }

    return h.continue;
  });

  await server.start();
  console.log(`🚀 Server berjalan di ${server.info.uri}`);
};

init();
