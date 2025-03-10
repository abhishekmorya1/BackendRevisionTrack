const express = require('express');
const app = express();

// load config from env file
require("dotenv").config(); 
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// import routes for TODO api
const blogRoutes = require("./router/blog");

// mount the Blog routes

app.use("/api/v1", blogRoutes);

// start server

app.listen(PORT, ()=>{
    console.log(`server started successfully at ${PORT}`);
})

// connect to the database
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req,res)=>{
    res.send(`<h1>This is Blog Homepage </h1>`);
})