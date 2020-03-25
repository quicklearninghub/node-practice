//forkmaster.js called this

// event raised when  master sends data to child
process.on('message', function (msg) {
    console.log('Parent said : ', msg);
    
    // do complex logic here
    for (var i = 0; i < 1000000; i++) {
        var j = j + 30000;             
    };
    
    process.send("Processed request.... Sent bulk mails to 100000 customers");
    process.disconnect();
     //  process.abort();   
});

