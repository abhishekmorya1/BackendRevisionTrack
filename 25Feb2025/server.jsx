// today is 25 feb 2025

// server Instantiate
const express = require("express");
const app=express();

// used to parse req.body in express ->PUT or POST
const bodyParser = require('body-parser');

// specifically parse JSON data and add it to the request.Body Object
app.use(bodyParser.json());

// activating the server on port 6000
app.listen(6000, ()=>{
    console.log("server is started at port no 6000");
});

// Routes
app.get('/', (request,response)=> {
    response.send("hey everyone this is first get");
});

app.post('/api/cars', (request, response)=>{
     const {name,brand}=request.body;
     console.log(name);
     console.log(brand);
     response.send("car submitted successfully");
});


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase4', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connection is successful");
})
.catch((error) => {
    console.error("Received an error:", error);
});