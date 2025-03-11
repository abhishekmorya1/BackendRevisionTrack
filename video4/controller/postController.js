const Post = require("../models/postModel");

exports.createPost=async(req,res) =>{
    try{
        // fetch the data
       const {title, body} = req.body;

        //    create a new object
       const post=new Post({
        title,body,
       });
        // saved in db using save function
       const savedPost = await post.save();

       res.json({
        post:savedPost,
       })
    }
    catch(err){
        return res.status("400").json({
            error:"Error while creating post",
        });
    }
};


exports.getAllPosts=async(req,res)=>{
    try{
      const posts = await Post.find().populate("comments").exec();
    // const posts = await Post.find();

      res.json({
        posts,
      })
    }
    catch(err){
        return res.status("400").json({
            error:"Error while getting all post",
        });
    }
}