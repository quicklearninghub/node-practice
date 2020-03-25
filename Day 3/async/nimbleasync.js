// npm install nimble

var flow = require('nimble');
flow.series([ // also supports parallel
(callback)=> {
    setTimeout( ()=> {
        console.log('I execute first.');
        callback();
    }, 1000);
},
(callback)=> {
    setTimeout( () => {
        console.log('I execute next.');
        callback();
    }, 500);
},
 (callback) => {
    setTimeout( () => {
        console.log('I execute last.');
        callback();
    }, 100);
}
]);