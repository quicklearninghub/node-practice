/**
* serving static HTML with the file system

 testHtmlFile.html  can be tested for below code
 testjson.json   file to be created for testing this

>node fileserver.js
 open browser and type localhost:8080/testhtmlfile.html

>node webclient.js   to access fileserver from console
*/

const http = require('http'),
fs = require('fs'),
path = require('path');

//Content types map
const contentTypes = {
'.htm' : 'text/html',
'.html' : 'text/html',
'.js' : 'text/javascript',
'.json' : 'application/json',
'.css' : 'text/css'
};



var server = http.createServer((req, res) => {
var fileStream =
  fs.createReadStream(req.url.split('/')[1]);

fileStream.on('error',(error) => {
  if (error.code === 'ENOENT') {
      res.statusCode = 404;
      res.end(http.STATUS_CODES[404]);
  } else {
      res.statusCode = 500;
      res.end(http.STATUS_CODES[500]);
  }
});

//Get the extension
var extension = path.extname(req.url);

//read the extension against the content type map - default to plain text
var contentType = contentTypes[extension] || 'text/plain';


// add the content type header
res.writeHead(200, { 'Content-Type' : contentType });

// pipe the stream to the response stream
fileStream.pipe(res);
});

server.listen(8080);
console.log("Server running.. type localhost:8080/index.html")