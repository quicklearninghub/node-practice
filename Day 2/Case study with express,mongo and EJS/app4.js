// Level 4 : Authentication and Cross site scripting attack

/*authentication logic 
	// do not store password in clear text in database 
	// encrypt password to take care of Cross Site Request Forgery -CSRF
*/
// visit npmjs.org/package/bcryptjs site
// npm install bcryptjs --save

// run   >mongod       to run database server on 27017 before running app3

// load the modules
var bodyParser=require('body-parser');
var express=require('express');
var mongoose = require('mongoose');
var session=require('client-sessions')

// add below module for encryption 
var bcrypt = require('bcryptjs');
// next , in register apply hash and store in db for security

// configure model 
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;// for creating Primary key
var User=mongoose.model('User', new Schema({
  id:           ObjectId,
  firstName:    { type: String},
  lastName:     { type: String},
  email:        { type: String, required: '{PATH} is required.', unique: true },
  password:     { type: String} 
}));



// connect to express web server
var app=express();
// configure template engine used by express
app.set('view engine','ejs');

app.locals.pretty=true;// will display nicely formatted html in view page source of browser

// connect to mongo database using mongoose
mongoose.connect('mongodb://localhost/testdb');


// configure middleware
app.use(bodyParser.urlencoded({extended:true})); // for form post

//session configuration with cookies
app.use(session({
	cookieName:'session',
	secret:'fjsd2jfsflkjs3klsjfsblablabla',
	duration:30 * 60 * 1000,
	activeDuration:5*60*1000
}));
// next store user details in session after succesfful login 
// see the code in login

//...............................................................
//configure route
app.get('/',function (req,res){
	res.render('index.ejs');
});

app.get('/register',function(req,res){
	res.render('register.ejs');
});

app.post('/register',function(req,res){
// now ecrypt password with hash and store in db
   var hash=bcrypt.hashSync(
   	 req.body.password,bcrypt.genSaltSync(10));
	
	var user=new User({
		firstName:req.body.firstName,
		lastName:req.body.lastName,
		email:req.body.email,

		// now apply hash here
		password:hash
		// next in post of login, decrypt and check
	});
	user.save(function(err){
 		if(err){
 			var err='something bad happend...Try again ';
 			if(err.code===11000){//unique for email
 				error="Sorry.. email is already exiting.. try another";
 			}
 			res.render('register.ejs');
 		} else{
 			res.redirect('/dashboard');
 		    }
	});
});

app.get('/login',function(req,res){
	res.render('login.ejs');
});
// email : murthy@yahoo.com   password : welcome  in db
app.post('/login',function(req,res){
	User.findOne({email:req.body.email},function(err,user){
		if(!user){
			res.render('login.ejs',{error:'Invalid email or password'});
		} else {
             // here decrypt and compare
			if(bcrypt.compareSync(req.body.password,user.password)){				
				req.session.user=user;		
				// global object to access from template
    		     res.locals.user=user;  // setting user for dashboard 
				res.redirect('/dashboard');
			} else{
				res.render('login.ejs',{error:'invalid email or password'});
			}
		}

	})
});

app.get('/dashboard',function(req,res){
	// add below code to check session of user
    if(req.session && req.session.user){
    	User.findOne({email:req.session.user.email},function(err,user){
    	if(!user){
    		req.session.reset();
    		res.redirect('/login');
    	} else {
    		// global object to access from template
    		res.locals.user=user;  // setting user for dashboard 
    		res.render('dashboard.ejs');
    	   };   
    	});  
      } else{
    	res.redirect('/login');
          }
});

app.get('/logout',function (req,res){
	// clear the session 
	req.session.reset();// to clear the session
	res.redirect('/');
})
app.listen(3000);
console.log("server running on localhost:3000");

// now run  localhost:3000  and register with new user  details
// try >db.users.find(), observe password is now encrypted
