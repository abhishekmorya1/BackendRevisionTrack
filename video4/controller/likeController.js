const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        // Check if the post exists
        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ post, user });
        if (existingLike) {
            return res.status(400).json({ error: "You have already liked this post" });
        }

        // Create and save a new Like
        const like = new Like({ post, user });
        const savedLike = await like.save();

        // Update the post with the new like
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
            .populate("likes")
            .exec();

        res.status(200).json({
            message: "Post liked successfully",
            post: updatedPost,
        });

    } catch (err) {
        res.status(500).json({
            error: "Error while creating like",
            details: err.message, // Debugging info
        });
    }
};

// unlike post
exports.unlikePost = async (req,res)=>{
    try{
       const {post,like} = req.body;
    //    find and delete the like collection me se
       const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

    //    update the post collection
    const updatedPost=await Post.findByIdAndUpdate(post, {$pull:{likes:deletedLike._id}},{new:true})

    res.json({
        post:updatedPost,
    })
    }
    catch(err){
        res.status(500).json({
            error: "Error while creating unlike",
            details: err.message, // Debugging info
        });
    }
}