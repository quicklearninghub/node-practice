'use strict';

const hapi = require('hapi');
const server = new hapi.Server();

//create routes.js first for REST API
var routes = require('./routes/routes.js'); //require routes

server.connection({host:'localhost', port: 3000});

server.route(routes); //add routes

// to Intercept , use extension point on server
server.ext('onRequest', function (request, reply) {
    console.log("Hi ! I am intercepted ")
    return reply.continue();
});

server.start((err) => {
    if(err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
//node app.js
// open postman and type localhost:3000/store
