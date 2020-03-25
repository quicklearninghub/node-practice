
/*

The waterfall function takes an array of functions and executes them one at a time, passing
the results from each function to the next. At the end, a resulting function is called with the
results from the final function in the array. If an error is signaled at any step of the way, execution
is halted, and the resulting function is called with an error instead

*/
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    Binary = require('mongodb').Binary;
async = require('async');

var host =  'localhost';
var port = 27017;


var db = new Db('Testphoto',
                new Server(host, port,
                           {
                               auto_reconnect: true,
                               poolSize: 20
                           }),
                { w: 1 });

var testcoll;


/**
 * Don't forget that for waterfall, it will stop and call the final
 * "cleanup" function whenever it sees an error has been passed to 
 * one of the callback functions.
 *
 * Also, if a parameter is given to the callback, it will include
 * those in the next function called in the waterfall.
 */
async.waterfall([

    // 1. open database connection
    (cb) => {
        console.log("\n** 1. open db");
        db.open(cb);
    },

    // 2. create collections for our albums and photos
    (db, cb) => {
        console.log("\n** 2. create albums and photos collections.");
        db.createCollection("testcoll", cb);
    },

    (testc, cb) =>{
        testcoll = testc;
        testcoll.insert(
            {
                _id: "test",
                data: new Binary(new Buffer("asdf"))
            },
            { safe: true },
            cb);
    },

    (data, cb)=> {
        console.log("INSERTED: ");
        console.log(data);
        cb(null);
    },

    (cb) => {
        testcoll.find({ _id: "test" }).toArray((err, res)=> {
            console.log(err);
            console.log(res);
        });
    }
],

     (err, results) =>{
        console.log("ERR??:" + JSON.stringify(err));
    }
);
