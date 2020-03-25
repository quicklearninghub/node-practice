//writing plugins
	var myPlugin = {
	  register: function (server, options, next) {
	    server.route({
	      method: 'GET',
	      path: '/',
	      handler: function (request, reply) {
	      	//console.log("Hello world plugin")
	        reply('Hello world plugin !');
	      }
	    });
	    next();
	  }
	}
	

	myPlugin.register.attributes = {
	  name: 'myPlugin',
	  version: '1.0.0'
	};
module.exports = myPlugin;