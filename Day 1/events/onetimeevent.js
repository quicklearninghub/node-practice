/**
* Implementing a One time event
*/
var events = require('events'),
	emitter = new events.EventEmitter();

function listener() {
	console.log('one Timer');
	emitter.removeListener('oneTimer', listener);
}

emitter.on('oneTimer', listener);
emitter.emit('oneTimer');
emitter.emit('oneTimer');

/*
/**
* Implementing a One-time event  with Emitter.once
*/

/*
var events = require('events'),
emitter = new events.EventEmitter();
/* EASIER */
/*
emitter.once('onceOnly', function() {
console.log('one Only');
});
emitter.emit('onceOnly');
emitter.emit('onceOnly');
*/