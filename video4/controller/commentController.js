// import model

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic

exports.createComment = async(req,res)  => {
    try{
        // fetch data from req body
        const {post, user, body}=req.body;

        // create a comment object
        const comment = new Comment({
            post,user,body
        });

        // save the new comment into the database
        const savedComment=await comment.save();

        // find the post by id, add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}},{new:true}) 
         .populate("comments") //populate the  comments array with comment documents
          .exec();
        //  agr mai populate use nhi krunga to bas array mei id ayenge and populate use krunga to actual comment ayenge

         res.json({
            post:updatedPost,
         });
    } 
    catch(err){
        res.status(500).json({
            error:"Error while creating comment",
        })
    }
}