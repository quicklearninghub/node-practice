
/*
>npm install async --save

async.series : pass an object to async.series , and it 
enumerates the keys and executes the
functions assigned to them. In this case, the results 
are not passed as an array, but an
object with the same keys as the functions called.

Results are not passed to next function in async.series  like async.waterfall

async.parallel:
if functions are not dependent then execute in parallel with async.parallel


mix up all with async.auto

The async.auto function figures out the required order to execute all the functions, including
which can be executed in parallel and which need to wait for others. As with
the async.waterfall function, pass results from one function to the next via the
callback parameter
*/



var async = require("async");
//async.parallel
//async.auto
async.series({
    numbers:  (callback)=> {
        setTimeout( ()=> {
            callback(null, [1, 2, 3]);
        }, 1500);
    },
    strings: (callback)=> {
        setTimeout( ()=> {
            callback(null, ["a", "b", "c"]);
        }, 2000);
    }
},
   (err, results)=> {
    if(err) console.log(err);
    console.log(results);
});