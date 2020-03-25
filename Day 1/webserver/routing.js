//Routing : based on URL requests, we need to route the user and send data


const http=require('http');
const fs=require('fs')

var server=http.createServer((request,response)=>{
    console.log('Request is '+request.url);

    if(request.url ==='/home' || request.url ==='/'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/index.html').pipe(response)
    
    }else if(request.url==='/contact'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/contacts.html').pipe(response)
    }else if(request.url==='/api/people'){
        response.writeHead(200,{'Content-Type':'application/json'});
        let people=[
            {name:'Sriram',age:20},
            {name:'Murthy',age:40},
            {name:'Mallika',age:30}
        ]
        response.end(JSON.stringify(people))
    } else{
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/404.html').pipe(response)
    }
});

server.listen(3000,'127.0.0.1');
console.log("Web server is running...  Use  http://localhost:3000")