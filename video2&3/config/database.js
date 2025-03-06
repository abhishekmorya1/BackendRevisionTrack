const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
       console.log("Db connection is successfull");
    })
    .catch((error)=>{
        console.log("Issue is Db connection");
        console.error(error.message);
        // what does it mean ??
        process.exit(1);
    });
}

module.exports = dbConnect;