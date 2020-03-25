// with pipe, we need not manually listen to events. Pipe does it automatically for you
const fs=require('fs');
const http=require('http');


/*
//Level 1 : with pipe
let myReadStream=fs.createReadStream(__dirname+'/bigdata.txt','utf8');
let myWriteStream=fs.createWriteStream(__dirname+'/writeMe.txt');
myReadStream.pipe(myWriteStream);
//run and observe
*/

// Level 2 :pipe with http server for performance
var server=http.createServer((request,response)=>{
    console.log('Sending big file to browser with performance');

    let myReadStream=fs.createReadStream(__dirname+'/bigdata.txt','utf8');
    myReadStream.pipe(response);
  });
  server.listen(3000,'127.0.0.1');
  console.log("Web server is running...  Use  http://localhost:3000")