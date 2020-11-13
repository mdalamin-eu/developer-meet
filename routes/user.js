const express = require("express");
const router = express.Router();
const User=require('../controller/User')
const  AuthGuard = require('../middleware/authguard')
const Follow = require('../controller/followersfollowing')
const ProfileController = require('../controller/Profile')




// @access Public

router.get("/", (req, res) => res.send("User Route"));


router.post("/register", User.registerAdd)
router.post('/login', User.Login)
router.post('/activate', User.registeractivate);
router.get('/current',AuthGuard, User.auth);
router.post('/reset-password', User.resetpasswordemailsend)
router.patch('/enterpassword', User.resetpassword)
router.patch('/edit-user', AuthGuard,  User.editUserById)
router.post('/profile', AuthGuard, ProfileController.Profile )
router.get('/myprofile',AuthGuard, ProfileController.Myprofile)
router.patch('/experience', AuthGuard, ProfileController.Experience)
router.delete('/delete-experience/:id', AuthGuard, ProfileController.DeleteExp)
router.put('/education', AuthGuard, ProfileController.Education)
router.delete('/delete-education/:id', AuthGuard, ProfileController.deleteEdu)

// router.get('/:id',Posts.postById)
router.get('/:id',User.userById)
router.put('/following/:id', AuthGuard, Follow.following)




module.exports = router;