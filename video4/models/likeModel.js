// import mongoose
const mongoose =require("mongoose");

// route handler

const likeSchema = new mongoose.Schema({
    post:{
       type:mongoose.Schema.Types.ObjectId,
        ref: "Post", //reference to the post model
     },
    user:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("like",likeSchema);