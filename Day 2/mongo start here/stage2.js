//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {    
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    //Create some users
    var user1 = 
    {name: 'admin', age: 42, roles: ['admin', 'moderator', 'user']};
    var user2 = {name: 'user', age: 22, roles: ['user']};
    var user3 = 
    {name: 'superuser', age: 62, roles: ['super-admin']};

    // Insert some users
    collection.insert([user1, user2, user3], 
         function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          'Inserted %d docs with "_id" are:',result.length, result);
      }
      //Close connection
      db.close();
    });

    // Get the documents collection
var collection = db.collection('users');

    // update 
    collection.update({name: 'admin'},
     {$set: {age: 39}}, function (err, numUpdated) {
      if (err) {
        console.log(err);
      } else if (numUpdated) {
        console.log('Updated Successfully %d document(s).', numUpdated);
      } else {
        console.log('No document found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });
  }
});