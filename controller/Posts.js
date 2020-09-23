
const Post = require('../models/Post')
const User = require('../models/User')
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator/check");



exports.post=  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    let user = await User.findById(req.currentuser.id);
    console.log('Userpost', user)
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User not found" }] });

      } else {

      newPost = new Post({
        text:req.body.text,
        avatar:user.avatar,
        name:user.name,
        user:req.currentuser.id
      });

      await newPost.save();
      User.update(
        { _id: req.currentuser.id },
        { $push: { posts: newPost } },
        () => {}
      );
      res.send(newPost)



         //Send email
         
    }
  }

 catch (err) {
    console.error(err.message);
    res.status(500).send("Server error 7");
  }

}

exports.postById=  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let posts = await Post.findById(req.params.id).populate("user",["name","avatar"]);
    console.log('any post', posts)
    if (!posts) {
      return res
        .status(400)
        .json({ errors: [{ msg: " wrong post id " }] });
    } else {
      res.send(posts)
         //Send email
    }
  }

 catch (err) {
    console.error(err.message);
    res.status(500).send("Server error 2");
  }

}