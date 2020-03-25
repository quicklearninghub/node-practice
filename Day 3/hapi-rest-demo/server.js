/*

hapi enables developers to focus on writing reusable application 
logic instead of spending time building infrastructure.

hapi is currectly being used by companies like Walmart 
(not just used but actively developed and maintained),
 Yahoo, PayPal or Mozilla and Sapient - even the new npmjs website
  is built using it.

*/

//Installing hapi
//npm install hapi --save  


var hapi = require('hapi');
var server = new hapi.Server();
// adding a new connection that can be listened on
server.connection({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello Hapi world!');
  }
});
// starting the server
server.start(function (err) {
  if (err) {
    throw err;
  }  
  console.log('Hapi server started on localhost:3000');
});
// >node server.js