const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
  info: {
    title: 'Documentação da API',
    version: '1.0.0',
    description: 'Endpoints disponíveis da API do sistema'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['../routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../../app')
})
