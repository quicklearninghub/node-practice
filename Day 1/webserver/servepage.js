const http=require('http');
const fs=require('fs')

var server=http.createServer((request,response)=>{
response.writeHead(200,{'Content-Type':'text/html'});
let myReadStream=fs.createReadStream(__dirname+'/index.html','utf8');
myReadStream.pipe(response);
});

server.listen(3000,'127.0.0.1');
console.log("Web server is running...  Use  http://localhost:3000")