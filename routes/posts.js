const express = require("express");
const router = express.Router();
const Posts=require('../controller/Posts')
const  AuthGuard = require('../middleware/authguard')


router.post('/addpost', AuthGuard,Posts.post)
router.get('/:id',Posts.postById)
router.get('/',Posts.getAllPosts)
router.patch('/edit-post/:id', AuthGuard,  Posts.editPostById)
router.put('/comment-post/:id', AuthGuard,  Posts.comment)
router.put('/like-post/:id', AuthGuard,  Posts.likes)


module.exports= router;


