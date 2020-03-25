//level 1 : understanding EJS layout with express routing

//load the module
const express=require('express');
// connect to express web server
let app=express();
// configure template engine used by express
app.set('view engine', 'ejs');
app.locals.pretty=true;// will display nicely formatted html in view page source of browser

app.get('/',  (req, res)=> {
    res.send("<h1>Welcome to Dashboard case study</h1>");
	//res.render('index.ejs');
});
app.get('/register',(req,res)=>{
	res.render('register.ejs');
});
app.get('/login',(req,res)=>{
	res.render('login.ejs');
});
app.get('/dashboard',(req,res)=>{
	res.render('dashboard.ejs');
});
app.get('/logout', (req,res)=>{
	res.redirect('/');
})
app.listen(3000);
console.log("server running on localhost:3000");
// run  now     > nodemon app.js
// open  browser and type localhost:3000/