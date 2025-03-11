const express = require('express');
const router = express.Router();

//import controller

const {createComment} = require("../controller/commentController");
const {createPost, getAllPosts} = require("../controller/postController");
const {likePost, unlikePost} =require("../controller/likeController");

console.log("createComment:", createComment);
console.log("createPost:", createPost);
console.log("getAllPosts:", getAllPosts);
console.log("createLike:", likePost);



// making routes
router.post("/comments/create",createComment);
router.post("/create/post",createPost);
router.get("/getAllPosts",getAllPosts);
router.post("/likes/like",likePost);
router.delete("/like/unlike", unlikePost);


module.exports = router;