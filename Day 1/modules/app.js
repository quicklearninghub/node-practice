const stuff=require('./container');
console.log(stuff.greet('Murthy'));
console.log(stuff.add(10,20));
console.log(stuff.PI)





//working with Instance function
var con=new stuff.DBCon('http:localhost:master');
con.connect();

//working with Closure
console.log(stuff.Utility().Square(10));