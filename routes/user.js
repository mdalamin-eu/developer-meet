const express = require("express");
const router = express.Router();
const User=require('../controller/User')





// @access Public

router.get("/", (req, res) => res.send("User Route"));


router.post("/register", User.registerAdd)
    
    

module.exports = router;