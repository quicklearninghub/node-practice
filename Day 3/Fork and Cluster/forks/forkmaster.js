var cp = require('child_process');
// cp.fork('module name');
var child = cp.fork(__dirname + '/forkchild.js');// running module on child process
 

child.on('message', function (msg) {
    console.log('Output from Child ', msg);
});

child.send('send bulk mail to all');

child.on('error', function (err) {
    console.log(err.code)
});
// fired when child closed
child.on('close', function () {
    console.log("child closed")
})