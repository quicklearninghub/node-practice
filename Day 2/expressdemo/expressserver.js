/*
Express

Fast, unopinionated, minimalist web framework for Node.js - http://expressjs.com/

Adding Express to your project is only an NPM install away:

$ npm install express --save
*/

const express = require('express')  
const app = express()  
const port = 3000

app.get('/', (request, response) => {  
  response.send('Hello from Express!')
})

app.listen(port, (err) => {  
  if (err) {
    console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
