//In order to access MongoDB database, we need to install MongoDB drivers. 
>npm install mongodb --save

This will include mongodb folder inside node_modules folder. Now, 
start the MongoDB server using the following command. 
(Assuming that your MongoDB database is at C:\MyNodeJSConsoleApp\MyMongoDB folder.)

>mongod -dbpath C:\MyNodeJSConsoleApp\MyMongoDB

Connecting MongoDB:
===================

app.js

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
   
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
                
});


Insert Documents:
=================


var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
    
    db.collection('Persons', function (err, collection) {
        
        collection.insert({ id: 1, firstName: 'Murthy', lastName: 'Sri' });
        collection.insert({ id: 2, firstName: 'Kavitha', lastName: 'Murthy' });
        collection.insert({ id: 3, firstName: 'Rama', lastName: 'Sri' });
        
        

        db.collection('Persons').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});

Running the above example displays the following result.
> node app.js 
Total Rows: 3


Update/Delete Documents:
=======================
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
    
    db.collection('Persons', function (err, collection) {
        
        collection.update({id: 1}, { $set: { firstName: 'Murthy', lastName: 'Sriram'} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;    
                                                                console.log('Document Updated Successfully');
                                                        });

        collection.remove({id:2}, {w:1}, function(err, result) {
        
            if(err) throw err;    
        
            console.log('Document Removed Successfully');
        });

    });
                
});


Query Database:
===============

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
    
    db.collection('Persons', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);            
        });
        
    });
                
});

Mongoose:
=========
Mongoose is a very popular ODM for MongoDB in Node.js. 

Mongoose provides a straight-forward, schema-based solution to
 model your application data. 

 It includes built-in type casting, validation, 
 query building, business logic hooks and more. 

 Visit MongooseJS.com for more information.

 Mongo DB data types
 ===================
 Mongo DB supports and native Javascript data types. 

 	Float : is a 8 byte and is directly convertible to the Javascript type Number
•	Double : class a special class representing a float value, this is especially useful when using capped collections where you need to ensure your values are always floats.
•	Integers : is a bit trickier due to the fact that Javascript represents all Numbers as 64 bit floats meaning that the maximum integer value is at a 53 bit. Mongo has two types for integers, a 32 bit and a 64 bit. The driver will try to fit the value into 32 bits if it can and promote it to 64 bits if it has to. Similarly it will deserialize attempting to fit it into 53 bits if it can. If it cannot it will return an instance of Long to avoid losing precision.
•	Long : class a special class that lets you store 64 bit integers and also lets you operate on the 64 bit integers.
•	Date  : maps directly to a Javascript Date
•	RegExp  : maps directly to a Javascript RegExp
•	String :  maps directly to a Javascript String (encoded in utf8)
•	Binary : class a special class that lets you store data in Mongo DB
•	Code  : class a special class that lets you store javascript functions in Mongo DB, can also provide a scope to run the method in
•	ObjectID : class a special class that holds a MongoDB document identifier (the equivalent to a Primary key)
•	DbRef : class a special class that lets you include a reference in a document pointing to another object
•	Symbol :  class a special class that lets you specify a symbol, not really relevant for javascript but for languages that supports the concept of symbols.



