/*
WebSockets are based on the WebSocket protocol, 
defined as a two-way  communication with a remote host, 
or bidirectional communication over TCP. 

WebSocket communication is message-based, which makes
 it easier to  handle than a communication mechanism 
 such as TCP streams.

Web socket uses HTTP for handshake , later messages will be exchanged
using frames.  

Type of content can be binary , or text.

Control frames can be used to signal close connection 

web socket end point  : 
ws:// URI scheme 
wss:// for a Secure Sockets Layer (SSL) connection.


install from the npm registry, 

>npm install  websocket --save
*/

/**
* using WebSocket-Node

*/
var http = require('http'),
fs = require('fs'),
url = require('url'),
WebSocketServer = require('websocket').server;

var server = http.createServer(function(req, res) {
    var urlParsed = url.parse(req.url); 
     //index.html
	fs.readFile(urlParsed.path.split('/')[1], 
		function(err, data) {
		   if (err) {
				res.statusCode = 404;
				res.end(http.STATUS_CODES[404]);
	    }	    
	res.statusCode = 200; 
	res.end(data); // flush the content of index.html file to client 
    });
}).listen(8000);
console.log("Websocket running on port 8000");
console.log("Type localhost:8000/index.html");


var serverConfig = {
	httpServer: server,
	autoAcceptConnections: false //to enable reliable messaging
 };

var wsserver = new WebSocketServer();
wsserver.mount(serverConfig);// bind websocket with http server

// bind events of websocket
wsserver.on('connect', function(connection) {
	console.log('connected');
	connection.send('Server -  Hello from Murthy');
});

wsserver.on('request', function(req) {
	console.log('request');
	var connection = req.accept('echo-protocol', req.origin);	
	// read message from client and log
	connection.on('message', function(message) {
	if (message.type === 'utf8') {
		//handle data here with your logic
		console.log(message.utf8Data);
      }
   else if (message.type === 'binary') {
	    console.log(message.binaryData);
	  }
    });
connection.on('close', function(reasonCode, description) {
	console.log('connection closed', reasonCode, description);
     });
});
// end of code
