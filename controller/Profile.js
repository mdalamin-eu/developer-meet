const express = require("express");
const router = express.Router();
const Auth = require("../middleware/authguard")
const Profile = require("../models/Profile");
const User = require("../models/User")
const { check, validationResult}= require("express-validator/check")

exports.Profile = async (req, res) => { 
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        handle,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        snapchat
    } = req.body

    const profileFields = {};
    profileFields.user = req.currentuser.id;
if(company) profileFields.company = company;
if(website) profileFields.website = website;
if(location) profileFields.location = location;
if(bio) profileFields.bio = bio;
if(skills) profileFields.skills =skills;
if(handle) profileFields.handle = handle;
if(status) profileFields.status = status;
if(githubusername) profileFields.githubusername = githubusername;
if(skills) {
    console.log('lol',skills)
    profileFields.skills = skills.map(skill => skill.trim());

}
profileFields.social = {};
if(youtube) profileFields.social.youtube=youtube;
if(twitter) profileFields.social.twitter=twitter;
if(facebook) profileFields.social.facebook = facebook;
if (linkedin) profileFields.social.linkedin = linkedin;
if (instagram) profileFields.social.instagram = instagram;
if(snapchat) profileFields.social.snapchat = snapchat;


    try {
        const profileIsmatched = await Profile.findOne({user:req.currentuser.id}); 
        if(profileIsmatched) {
            const existHandle= await Profile.findOne({handle:profileFields.handle});
            if(existHandle){
                return res.status(404)
                .json({errors:[{msg:"The handle already exists"}]});
            }
            else {
                const Updateprofile = await Profile.findOneAndUpdate(
                    {user:req.currentuser.id},
                    {$set:profileFields},
                    {new:true})
                 return   res.json(Updateprofile)
            }
       
        }

        else {
            newProfile = new Profile(profileFields);

            const existHandle= await Profile.findOne({handle:profileFields.handle});
            if(existHandle){
                return res.status(404)
                .json({errors:[{msg:"The handle already exists"}]});
            }
  
       const prof =  await newProfile.save();
      return  res.send(prof);
        }
    
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error")
    }

}

exports.Myprofile= async(req, res)=>{
    try{
        // populate user means we joing user
        const myprofile= await Profile.findOne({user: req.currentuser.id}).populate("user");
        if (!myprofile) {
            return res.status(400).json({msg:"There is no profile for this user"});
        }
        res.json(myprofile);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error")
    }
}


exports.Experience = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()});
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try{
        const editExp= await Profile.findOne({user: req.currentuser.id});
        editExp.experience.unshift(newExp);
        await editExp.save();
        res.json(editExp);
    }catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}


exports.DeleteExp = async (req, res) =>{
    console.log("dd", req.params.id)

    try{
       
      const expDelete =  await Profile.findOne({user:req.currentuser.id}); //1st i checked profile of user


      const expId= expDelete.experience.map(exp => exp._id.toString());// take exp Id 
      console.log("sim", expId)
      const removeIndex = expId.indexOf(req.params.id); //remove exp
      console.log("kpk", removeIndex)
      if (removeIndex ===-1){
          res.status(500).json({msg:"not found"});
      }
      expDelete.experience.splice(removeIndex, 1);
      
      await expDelete.save();
          
       res.json(expDelete)
       
    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
}