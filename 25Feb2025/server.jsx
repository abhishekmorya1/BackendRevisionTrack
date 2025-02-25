// today is 25 feb 2025

const express = require("express");
const app=express();

app.listen(4500, ()=>{
    console.log("server is started at port no 4500");
});

app.get('/', (request,response)=> {
    response.send("hey everyone this is first get");
});
