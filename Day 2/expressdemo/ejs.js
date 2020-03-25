//working with template engine EJS
//npm install ejs --save

const express=require('express');

const app=express();
app.set('view engine','ejs');
// create views folder as ejs templates are searched here

app.get('/', (req,res)=>{
    res.render("index.ejs")
})
//localhost:3000/contact?name=Murthy&job=Engineer
app.get('/contact',(req,res)=>{
    //Handling query string
    res.render('contact.ejs',{qs:req.query});
   })

//localhost:3000/profile/murthy
app.get('/profile/:name',(req,res)=>{
    let  data={
    age:50,
    job:'Engineer',
    technologies:['C++','Java','Angular','Node']
     };
    res.render('profile.ejs',
    {person:req.params.name,data:data});
})
app.listen(3000)
console.log("express web server running on localhost:3000");

