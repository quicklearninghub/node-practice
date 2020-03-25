// Level 6 :  helmet
/*
with helmet middleware we can do following

- XSS Protection
- Prevent Clickingjacking using X-Frame-Options
- Enforcing all connections to be HTTPS
- Setting a Context-Security-Policy header
- Disabling the X-Powered-By header so attackers 
   can’t narrow down their attacks to specific software

*/


// npm install helmet --save

// run   >mongod       to run database server on 27017 before running app3

// load the modules
var bodyParser=require('body-parser');
var express=require('express');
var mongoose = require('mongoose');
var session=require('client-sessions');
var bcrypt = require('bcryptjs');

// add below module for encryption 
var csrf=require('csurf')

//helmet middleware
var helmet = require('helmet');
	app.use(helmet());
.


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

app.use(csrf()); // use the csrf module
// next in register, add token


//...............................................................
//configure route
app.get('/',function (req,res){
	res.render('index.jade');
});

app.get('/register',function(req,res){
	// add the csrf token here
	res.render('register.jade',{csrfToken:req.csrfToken()});
	// next, open register.jade and add following line
	// input(type="hidden", name="_csrf", value=csrfToken)
});

app.post('/register',function(req,res){
// now ecypt password with hash and store in db
   var hash=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));

	//res.json(req.body);
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
 			res.render('register.jade');
 		} else{
 			res.redirect('/dashboard');
 		    }
	});
});

app.get('/login',function(req,res){
	res.render('login.jade');
});
// email : murthy@yahoo.com   password : welcome  in db
app.post('/login',function(req,res){
	User.findOne({email:req.body.email},function(err,user){
		if(!user){
			res.render('login.jade',{error:'Invalid email or password'});
		} else {

             // here decrypt and compare
			if(bcrypt.compareSync(req.body.password,user.password)){				
				req.session.user=user;		
				res.redirect('/dashboard');
			} else{
				res.render('login.jade',{error:'invalid email or password'});
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
    		res.locals.user=user;  // setting user for dashboard 
    		res.render('dashboard.jade');
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

// now run  localhost:3000  and click register
// open page source and observe <input type='hidden' value="jfklklfj......"

// I have observed 
/*
<!DOCTYPE html>
<html>
  <head>
    <title> Demo by Murthy on Authentication with express | Register</title>
  </head>
  <body>
    <h1>Create an Account</h1>
    <form method="post">
      <input type="hidden" name="_csrf" value="UbH7bNBh-7sQovSinLf_DoPq619gSmylWBfo"><span>First Name:</span>
      <input type="text" name="firstName" required><br><span>Last Name:</span>
      <input type="text" name="lastName" required><br><span>Email:</span>
      <input type="email" name="email" required><br><span>Password:</span>
      <input type="password" name="password" required><br>
      <input type="submit">
    </form>
  </body>
</html>

*/