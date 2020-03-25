// Memory Usage
let events = require('events');

// what is the problem with below code
/*
function getEmitter() {
    var emitter = new events.EventEmitter();
    emitter.emit('start');  // you are subscribing to an event which is not registered
    return emitter;
}
var myEmitter = getEmitter();
console.log("I am executing")
myEmitter.on("start", ()=> {
    console.log("Started");
});
*/

/*
The event emitter instantiated within
getEmitter emits "start" previous to being returned, wrong-footing the subsequent
assignment of a listener, which arrives a step late, missing the event notification.
*/


//To solve this race condition we can use process.nextTick:


function getEmitter() {    
    console.log("I am getEmitter method")
    var emitter = new events.EventEmitter();
    process.nextTick(function() {
        console.log("Emitting start event")
        emitter.emit('start');
    });
    return emitter;
}
var myEmitter = getEmitter();// execution starts here
process.stdin.on('readable',  ()=> {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write('You typed : ' + chunk);
    }
});

myEmitter.on('start', function() {
    console.log('Started');
})


//
//Here the attachment of the 
//on(start handler is allowed to occur prior to the
//emission of the start event by the emitter 
//instantiated in getEmitter.