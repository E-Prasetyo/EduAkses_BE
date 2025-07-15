const config = {
    app: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
    jwt: {
        accessTokenKeys: process.env.ACCESS_TOKEN_KEY,
        accessTokenAge: process.env.ACCESS_TOKEN_AGE,
        refreshTokenKey: process.env.REFRESH_TOKEN_KEY
    },
    gcp:{
        googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        gcsBucket:  process.env.GCS_BUCKET,
        projectId:process.env.PROJECT_ID
    }
  }
   
  module.exports = config;