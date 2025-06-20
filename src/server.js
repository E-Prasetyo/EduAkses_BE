const Hapi = require('@hapi/hapi');
require('dotenv').config();

const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    // {
    //   plugin: user,
    //   options: {
    //     service: usersService,
    //     validator: UsersValidator,
    //   },
    // }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();