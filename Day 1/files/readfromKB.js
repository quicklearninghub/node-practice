process.stdin.setEncoding('utf8');
console.log
("Type ur text and press enter to terminate line(ctrl+c to stop):");

process.stdin.on('readable',  ()=> {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write('You typed : ' + chunk);
    }
});
