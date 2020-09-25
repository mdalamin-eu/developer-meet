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

    else {
        if (
            user.following.filter(following => following.user.toString() === req.currentuser.id)
              .length === 0
          ) {
            User.update(
              { _id: req.params.id },
              { $addToSet: { followers: req.currentuser.id } },
              () => {}
            );
      User.update(
        { _id: req.currentuser.id },
        { $addToSet: { following:  req.params.id} },
        () => {}
      );
          }
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error 2");
}
}