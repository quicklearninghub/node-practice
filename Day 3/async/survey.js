var readline = require('readline'),
async = require("async"),
fs = require('fs');

var questions = [
    "What's your favorite color? ",
    "What's your shoe size? ",
    "What is your favorite language? ",
    "What is your hobby? "
];

var rl = readline.createInterface({ // 1.
    input: process.stdin,
    output: process.stdout
});

var output = [];
async.forEachSeries(questions,function (item, cb) { // 2.
    rl.question(item, function (answer) {
        output.push(answer);
        cb(null);
    });
},
function (err) { // 3.
    if (err) {
        console.log("Hunh, couldn't get answers");
        console.log(err);
        return;
    }
    fs.appendFileSync("answers.txt", JSON.stringify(output) + "\n");
    console.log("\nThanks for your answers!");
    console.log("We'll sell them to some telemarketer immediately!");
    rl.close();
});