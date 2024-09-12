
/* Swagger configuration */
const options = {
  openapi: "OpenAPI 3", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: true, // Enable/Disable logs. By default is false
  autoHeaders: true, // Enable/Disable automatic headers capture. By default is true
  autoQuery: true, // Enable/Disable automatic query capture. By default is true
  autoBody: true, // Enable/Disable automatic body capture. By default is true
};

// const config = require("../config/cloud");
const swaggerAutogen = require("swagger-autogen")();
// const msg = require("../utils/lang/messages");

const doc = {
  info: {
    version: "2.0.0", // by default: '1.0.0'
    title: "NCS CBT", // by default: 'REST API'
    description: "API for NCS CBT", // by default: ''
    contact: {
      name: "API Support",
      email: "oladipupomichael9@gmail.com",
    },
  },
  host: process.env.HOST, // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["http", "https"], // by default: ['http']
  consumes: ["application/json"], // by default: ['application/json']
  produces: ["application/json"], // by default: ['application/json']
  tags: [
    "admin",
    "users",
    "exam",
    "material",
    // by default: empty Array
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {
    "Created 201": {
      code: "201",
      message: "Created",
    },
    "Success 200": {
      code: "200",
      message: "Success",
    },
    "Bad Request 400": {
      code: "400",
      message: "Bad Request",
    },
    "Unauthorized 401": {
      code: "401",
      message: "Unauthorized",
    },
    "Not Found 404": {
      code: "404",
      message: "Not found",
    },
    "Server Error 501": {
      code: "501",
      message: "Internal Server Error",
    },
  }, // by default: empty object (Swagger 2.0)
};

const outputFile = "./doc/swagger.json";
const endpointsFiles = ["./index.js", "./controllers/*.controller.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
