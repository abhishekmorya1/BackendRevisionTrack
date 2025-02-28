// // instatiate the server
// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser');

// // specially parse json data and add it to the request.body object
// app.use(bodyParser.json());

// // port where response shown
// app.listen(9000, ()=>{
//     console.log("server is started on port no 9000...");
// })

// // create routes
// app.get('/', (request, response)=>{
//     response.send("hey this is get route");
// })

// app.post('/api/friends', (request,response)=>{
//     const {name, brand}= request.body;
//     console.log(name);
//     console.log(brand);
//     response.send("freind submitted successfully");
// });


const express = require('express');
const app = express();

// load config from env file
require("dotenv").config(); 
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// import routes for TODO api
const todoRoutes = require("./routes/todo");

// mount the todo API routes

app.use("/api/v1", todoRoutes);

// start server

app.listen(PORT, ()=>{
    console.log(`server started successfully at ${PORT}`);
})

// connect to the database
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req,res)=>{
    res.send(`<h1>This is Homepage </h1>`);
})