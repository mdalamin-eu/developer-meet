
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
    console.log(err.message);
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

//commentAdd.......{
exports.comment = async (req, res) => {
        
  try {
    const CurrentUser = await User.findById(req.currentuser.id);
    const post  = await Post.findById(req.params.id);
console.log(post)
    const newComment = {
      text:req.body.text,
      name:CurrentUser.name,
      avatar:CurrentUser.avatar
    }

    post.comments.unshift(newComment);
   await  post.save()
   res.status(200).send(post)
  } catch (error) {
     console.log('errors')
  }
}

//.............}  CommentClose


exports.likes = async(req, res) => {
  try{
let post = await Post.findById(req.params.id);
let user = await User.findById(req.currentuser.id)

if(post.likes.filter(like => like.user.toString()== req.currentuser.id).length > 0){
  const removeLike=post.likes.map(like=>like.user.toString())
  .indexOf(req.currentuser.id);
  post.likes.splice(removeLike,1);

  await post.save();
  return res.json(post)
}
post.likes.unshift({user:req.currentuser.id});
post.save();


return res.json(post)
  }catch(err){
    console.log(err.message);
    res.status(500).send("server error 01")

  }
}