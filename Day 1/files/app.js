const fs=require('fs');

// Level 1: Read and write files
//blocking code with file
let readMe=fs.readFileSync('readme.txt','utf8');
console.log(readMe);
fs.writeFileSync('writeMe.txt',readMe);

//non-blocking 
fs.readFile('readme.txt','utf8',(error,data)=>{
    if(error)  console.log(error)
    console.log('Work done'+data);
    // write now 
    fs.writeFile('writeMe.txt',data,()=>console.log("Done writing"));
    //deleting file
    fs.unlink('writeMe.txt',(err)=>{
        if(err) console.log(err);        
        console.log("file is deleted")
    });//To Remove file
});
console.log('doing some work....')

//---------------------------------------------

// Level 2: Creating and Removing Directories
//fs.mkdirSync('test');
//fs.rmdirSync('test');
fs.mkdir('test',()=>{
    fs.readFile('readMe.txt','utf8',(err,data)=>{
        fs.writeFile('./test/writeMe.txt',data,(err)=>{
            if(err) console.log(err);
            console.log('Done writing into file')
        });
    })
})

//remove the directory
fs.unlink('./test/writeMe.txt',()=>{
    fs.rmdir('test',()=>{console.log("directory is removed")})
});
//------------------------------------------------