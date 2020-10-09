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
 const isMatched = req.currentuser.id == req.params.id;
  if(isMatched) {
    return res
    .status(400)
    .json ({ errors:[{ msg:"you can't follow you"}]});
  }
    
    else {
      console.log(req.currentuser.id)
          if(user.followers.filter(follow => follow.toString() == req.currentuser.id).length > 0) {
            return res.status(422).send({
              errors: [{ title: "User following Error!", detail: "you already followed the person " }]
          })
        }
         user.followers.unshift({user:req.currentuser.id})
         await user.save()
         res.send(user);
      }
      
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error 00");
}
}