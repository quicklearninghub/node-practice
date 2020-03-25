const http=require('http');

var server=http.createServer((request,response)=>{
  console.log('Request is '+request.url);

  response.writeHead(200,{'Content-Type':'text/plain'});
  response.end('Welcome to my Node web server');
});
server.listen(3000,'127.0.0.1');
console.log("Web server is running...  Use  http://localhost:3000")

//open browser , type above url, Press F12, Network tab - Refresh - click headers  tab and observe

//Try
//http://localhost:3000/hello
//http://localhost:3000/api
