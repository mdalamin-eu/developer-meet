const User = require ('../models/User')

const { check, validationResult }= require("express-validator/check");



exports.following= async(req, res) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}

try {
    let user = await  User.findById(req.params.id)
  if(!user) {
        return res
        .status(400)
        .json ({ errors:[{ msg:"not found user"}]});
    }

                          //self follow stop -- start-------{
  let currentuser = await  User.findById(req.currentuser.id)
 const isMatched = req.currentuser.id == req.params.id;
  if(isMatched) {
    return res
    .status(400)
    .json ({ errors:[{ msg:"you can't follow you"}]});
  }
                                  //--------}self follow stop --close



                                  //unfollow start -----{
    else {
    
          if(user.followers.filter(follow => follow.user.toString() == req.currentuser.id).length > 0) {

            const removeFollowers= user.followers
            .map(follower => follower.user.toString())
            .indexOf(req.currentuser.id);
            user.followers.splice(removeFollowers, 1);
            
            const removeFollowing = currentuser.following
            .map(following => following.user.toString())
            .indexOf(req.params.id);
            currentuser.following.splice(removeFollowing, 1);
            await currentuser.save();
            await user.save();
           return res.json(currentuser);
        }
        if(user.followers.filter(follow => follow.user.toString() == req.currentuser.id).length == 0) {
          user.followers.unshift({user:req.currentuser.id})
          currentuser .following.unshift({user:req.params.id})
          await user.save()
          await currentuser.save()
          res.send(currentuser);
        }

        return res.json(user)
        
      }
                                      //---------}unfollow close
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server error 00");
}
}