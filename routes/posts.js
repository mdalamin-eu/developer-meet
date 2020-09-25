const express = require("express");
const router = express.Router();
const Posts=require('../controller/Posts')
const  AuthGuard = require('../middleware/authguard')


router.post('/addpost', AuthGuard,Posts.post)
router.get('/post/:id',Posts.postById)



module.exports= router;


