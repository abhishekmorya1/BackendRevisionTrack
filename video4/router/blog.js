const express = require('express');
const router = express.Router();

//import controller

const {createComment} = require("../controller/commentController");
const {createPost} = require("../controller/postController");


// making routes
router.post("/comments/create",createComment);
router.post("/create/post",createPost);


module.exports = router;