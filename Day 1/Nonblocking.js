var fs = require("fs");
// Blocking code
var data = fs.readFileSync('nonblocking.js');       
console.log(data.toString());
console.log("Blocking Program Ended");

//callback method with promise
function callback (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
};

// non blocking code with callback
fs.readFile('nonblocking.js', callback);
console.log("Non blocking Program Ended");
