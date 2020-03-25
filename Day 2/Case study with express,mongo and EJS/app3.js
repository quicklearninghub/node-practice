// Level 3 : sessions and cookies

/*sessions logic 
	1. Retrieve identity from sessions
	2. verify idendity
	3. process request
*/

// run   >mongod       to run database server on 27017 before running app3

// npm install client-sessions  --save (visit github.com/mozilla/node-client-sessions)


// load the modules
var bodyParser=require('body-parser');
var express=require('express');
var mongoose = require('mongoose');

// load below module for sessions and cookies
var session=require('client-sessions')
// then configure middleware for cookies

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

//session configuration with cookies (Middleware)
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
	//res.json(req.body);
	var user=new User({
		firstName:req.body.firstName,
		lastName:req.body.lastName,
		email:req.body.email,
		password:req.body.password
	});
	user.save(function(err){
 		if(err){
 			var error='something bad happend...Try again ';
 			if(err.code===11000){//unique for email
 				error="Sorry.. email is already exiting.. try another";
 			}
 			res.render('register.ejs');// observe in jade  #{error}
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
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
            res.render('login.ejs', { error: 'Invalid email' });
        } else {
            if (req.body.password === user.password) {
                // write user details in session with cookie here
                req.session.user = user; // set-cookie:session={email:'...',password:'....'}
                //next , in dashboard , check if session exists allow else do ....
                res.redirect('/dashboard');
            } else {
                res.render('login.ejs', { error: 'invalid password' });
            }
        }
    });
});//end of post

app.get('/dashboard',function(req,res){
	// add below code to check session of user
    if(req.session && req.session.user){
    	User.findOne({email:req.session.user.email},
        function(err,user){
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

// now run  localhost:3000 and press F12 for debug to check cookies
// enter murthy@yahoo.com  and welcome credentials then click submit
// click network tab in debugger, RC on login, copy response headers and paste in notepad

// localhost:3000/logout       try to clear the session

// now if you navigate to localhost:3000/dashboard , you will be navigated to login
// as your session is expired

// I have observed following response headers in debugger of chrome

/*
HTTP/1.1 302 Moved Temporarily
X-Powered-By: Express
Location: /dashboard
Vary: Accept
Content-Type: text/html; charset=utf-8
Content-Length: 76
Set-Cookie: session=XB6f1G6tb5WZ9Vpaci_lrg.cSp_Fi5oNhUk1csa9cZ8Sy8_4CA5neOeaMO3OtFTtB6Qx7wpk8AKQv65H5GsSkbzyoqmqyMTD-UrNSvK-wQXE8r-M6zKoOUNyOgfMsKd1k9cuc0T7bzzlQmzDtlo7lGFgvuysT9Ubduu6-AJqdP3t2Uka6CQdFaRVxgRq8YqqEV1hXX0LwrSm_oYHZZqcqcrDBa_CGv0SI5uZJoCBgCM2w.1441951443768.1800000.4ncgsSQoYcLrt9TSOXjgYOaarj7DESCv9BVzNK1sbSA; path=/; expires=Fri, 11 Sep 2015 06:34:04 GMT; httponly
Date: Fri, 11 Sep 2015 06:05:28 GMT
Connection: keep-alive
*/
