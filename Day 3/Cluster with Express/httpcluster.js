/*
Clustering in Node.js is essentially a solution to utilize one
 Node.js module and to split worker processes, utilizing the
child_process.fork() function, all while maintaining reference
 and communication between the master and worker
processes. 

The workers can be TCP or HTTP servers, and the requests
 are handled by the master process.

 This master process then utilizes round-robin load balancing to distribute
 the load through the server. It does this by listening for
a connection, then calling a distribute method and handing
 off the processing to the worker process.
*/
(function () {
    'use strict';    
    var cluster = require('cluster'),
        http = require('http'),
        os = require('os'),
        ClusterServer = {
            name: 'ClusterServer',            
            cpus: os.cpus().length,            
            autoRestart: true, // Restart threads on death?            
            start: function (server, port) {
                var me = this, i;                
                if (cluster.isMaster) { // fork worker threads:
                    for (i = 0; i < me.cpus; i += 1) {
                       console.log(me.name + ': starting worker thread #' 
                              + i +' at localhost:8081');
                        cluster.fork();
                    }
                    cluster.on('fork', function(worker) {
                         console.log(worker.process.pid
                                +' worker is forked');
                    });

                    cluster.on('listening', function(worker, address) {
                        console.log(worker.process.pid 
                               +' worker is listening on localhost:8081');
                  });
                    
                    cluster.on('death', function (worker) {
                        // Log deaths!
                        console.log(me.name + ': worker '+ worker.pid + ' died.');
                        if (me.autoRestart) {
                    console.log(me.name + ': Restarting worker thread...');
                            cluster.fork();
                        }
                    });
                } else {
                    // Worker threads run the server
                    server.listen(port);
                }
            }
        },        
      httpServer = http.createServer(function (request, response) {
            response.writeHead(200, {
                'Content-type': 'text/plain' 
            });            
            response.end('Welcome to cluster world with http server!');
   console.log('httpServer: Hi! welcome to node cluster server with http ');
        });    
    ClusterServer.name = 'httpServer'; // rename ClusterServer instance
    ClusterServer.start(httpServer, 8000); // Start it up!   
}());