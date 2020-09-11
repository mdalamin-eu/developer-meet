const express = require("express");
const router = express.Router();
const User=require('../controller/User')
const Posts=require('../controller/Posts')
const  AuthGuard = require('../middleware/authguard')




// @access Public

router.get("/", (req, res) => res.send("User Route"));


router.post("/register", User.registerAdd)
router.post('/login', User.Login)
router.post('/activate', User.registeractivate);
router.get('/current',AuthGuard, User.auth);
router.post('/reset-password', User.resetpasswordemailsend)
router.patch('/enterpassword', User.resetpassword)
router.post('/addpost', AuthGuard,Posts.post)
    

module.exports = router;