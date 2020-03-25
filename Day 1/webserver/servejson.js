const http=require('http');

var server=http.createServer((request,response)=>{
    console.log('Request is '+request.url);

    response.writeHead(200,{'Content-Type':'application/json'});
    
    var emp={
        id:101,
        name:'Murthy',
        job:'Engineer'
    }
    response.end(JSON.stringify(emp));   // used by REST API
  });
server.listen(3000,'127.0.0.1');
console.log("Web server is running...  Use  http://localhost:3000")