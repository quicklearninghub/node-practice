//Level 1 : working with express
const express=require('express');
const app=express();

//middleware
app.use('/',(req,res,next)=>{
    console.log("Request has come to our web server"+req.url);
    next(); // continue processing
})

app.get('/',(req,res)=>{
    res.send("Welcome to Express world")
})
// working with routes 
app.get('/contacts',(req,res) =>{
    res.send("I am contacts route");
})

//dynamic parameters
app.get('/profile/:id',(req,res)=>{
    res.send('Request for profile id '+req.params.id+' is received')
})
// sending files to browser
app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.get('/api/products',(req,res)=>{
    let products=[
        {id:101,'name':'Keyboard',price:1300},
        {id:102,'name':'Pendrive',price:300},
        {id:103,'name':'USB',price:700},
        {id:104,'name':'Monitor',price:2300}        
    ]
    res.json(products);// JSON.Stringify not required.
})
//app.post(...)
//app.delete(...)
//app.put(...)
app.listen(3000)
console.log("express web server running on localhost:3000");

// install nodemon and run  nodemon server.js
