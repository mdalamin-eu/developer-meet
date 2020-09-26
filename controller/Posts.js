
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


//postEdit

exports.editPostById= async (req, res) => {
  const postData = req.body;
  const postId = req.params.id


 Post.findById(postId).exec((err, foundPost)=>{
    if(err){
      return res.status(422).send({
        errors:[{title:"Post edit Error!", detail:"post not found"}]
      });
    }
    console.log(foundPost.user, req.currentuser.id)
    if(req.currentuser.id == foundPost.user) {
      foundPost.set(postData);
      foundPost.save((err, foundPost)=>{
        if(err){
          res.status(400).send("something went wrong");
        }
        return res.json(foundPost);
      });
    }

    else {
      return res.status(400).send({
        errors:[{title:"Post edit Error!", detail:"Sorry you are not post owner"}]
      });
    }

  });
 

}

/// GET ALL POSTS

exports.getAllPosts = async (req, res) => {
   
 const posts = await Post.find({});

  if(!posts) {
    return res.status(404).send({
      errors:[{title:"Post found Error!", detail:"post not found"}]
    });
  }
res.send(posts)
}
