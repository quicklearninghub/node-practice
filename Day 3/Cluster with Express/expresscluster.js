//THIS IS JUST FOR EXAMPLE, INTERNAL LOAD BALANCING IS DONE BY NODE ITSELF

//level 1 : simple cluster
/*
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {

    //change this line to Your Node.js app entry point.
    require("./app.js");
}

*/
// >node cluster.js

// Leve 2 
// Express with Clusters

/*
When a worker dies, the cluster module emits an exit event.
 
 It can be handled by listening for the event and executing
  a callback function when its emitted. 

  You can do that by writing a statement likecluster.on('exit', callback);. 
  In the callback, we fork a new worker in order to maintain the intended 
  number of workers.

   This allows us to keep the application running, even if there are 
   some unhandled exceptions.
*/
var cluster = require('cluster');
if(cluster.isMaster) {
   // get number of cores
    var numWorkers = require('os').cpus().length;
    console.log('Master cluster setting up ' + 
    	numWorkers + ' workers...');
    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
    cluster.on('fork', function (worker) {
        console.log(worker.process.pid + ' worker is forked');
    });

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
   


    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' +
             code + ', and signal: ' + signal);
        console.log('Restarting the worker as it is crashed');
        cluster.fork();
    });
} else {
    var app = require('express')();
    app.all('/*', function(req, res) {
        res.send('process ' + process.pid + ' says hello!').end();
    })

    var server = app.listen(8000, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests ');
    });
}
// npm install express
// node expresscluster.js
//-----------------------------------------------------------------



/*
var cluster = require('cluster'),
	restartWorkers = function restartWorkers() {
		var wid, workerIds = [];

		// create a copy of current running worker ids
		for(wid in cluster.workers) {
			workerIds.push(wid);
		}

		workerIds.forEach(function(wid) {
			cluster.workers[wid].send({
				text: 'shutdown',
				from: 'master'
			});

			setTimeout(function() {
				if(cluster.workers[wid]) {
					cluster.workers[wid].kill('SIGKILL');
				}
			}, 5000);
		});
	};

if(cluster.isMaster) {
	var numWorkers = require('os').cpus().length,
		fs = require('fs'),
		i, worker;

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	for(i = 0; i < numWorkers; i++) {
		worker = cluster.fork();
		worker.on('message', function() {
			console.log('arguments', arguments);
		});
	}

	// set up listener of file changes for restarting workers
	fs.readdir('.', function(err, files) {
		files.forEach(function(file) {
			fs.watch(file, function() {
				restartWorkers();
			});
		});
	});

	cluster.on('exit', function(_worker, code, signal) {
		console.log('Worker ' + _worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		console.log('Starting a new worker');
		worker = cluster.fork();
		worker.on('message', function() {
			console.log('arguments', arguments);
		});
	});
} else {
	process.on('message', function(message) {
		if(message.type === 'shutdown') {
			process.exit(0);
		}
	});

	console.log('Worker ' + process.pid + ' is alive!');
}
*/