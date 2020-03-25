// Readable Stream - allow node js to read data from  a stream
// Writable Stream  - allow node js to write data to a stream.
// Duplex - can read and write to a stream

const http=require('http');
const fs=require('fs');
 
//Level1 :readable streams
/*
let myReadStream=fs.createReadStream(__dirname+'/bigdata.txt');

// To see actual data add utf8 and run
//let myReadStream=fs.createReadStream(__dirname+'/bigdata.txt','utf8');

myReadStream.on('data',(chunk)=>{
    console.log('New chunk received!');
    console.log(chunk);
    // run above code   node streams.js  and observe chunk is received with data.
})

myReadStream.on('end',()=>{console.log("End of Streaming")})
myReadStream.on('close',()=>{console.log("Closing the Stream")})
*/

//Level 2 : Writeble streams
let myReadStream=fs.createReadStream(__dirname+'/bigdata.txt','utf8');
let myWriteStream=fs.createWriteStream(__dirname+'/writeMe.txt');

myReadStream.on('data',(chunk)=>{
    console.log('New chunk received!');
    myWriteStream.write(chunk);

    /* observe below output and file
    $ node streams.js
    New chunk received!
    New chunk received!
    New chunk received!   
*/
})
//myWriteStream.close();
myReadStream.on('end',()=>{console.log("End of Read Streaming")})
myReadStream.on('close',()=>{console.log("Closing the Read Stream")})

