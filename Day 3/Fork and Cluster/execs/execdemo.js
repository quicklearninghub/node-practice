var exec = require('child_process').exec, child;

if (process.argv.length != 3) {
    console.log("I need a file name");
    process.exit(-1);
}

var file_name = process.argv[2];
//if windows is os then used type parent.js else use cat for unix
var cmd = process.platform == 'win32' ? 'type' : "cat";

child = exec(cmd + " " + file_name, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (error) {
        console.log("Error exec'ing the file");
        console.log(error);
        process.exit(1);
    }
});
//$ node execdemo.js  customers.json
