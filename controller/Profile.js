const express = require("express");
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
    profileFields.skills = skills.split(",").map(skill => skill.trim());

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
        const myprofile= await Profile.findOne({user: req.currentuser.id}).populate("user",["name","avatar"]);
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

//Delete Experience 
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


  //Education
  exports.Education= async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({errors: errors.array()});
    }
  const {
     school_name,
     degree,
     fieldofstudy,
     from,
     to,
     current,
     address
  } = req.body;
  console.log('hmm',req.body)
  const newEdu = {
    school_name,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    address
  };
  try {
    const edu = await Profile.findOne({user: req.currentuser.id});
    if (!edu) {
      res.status(404).send({msg:"User profile not found"});
    }
    edu.education.unshift(newEdu); //unshift mane hocche ekta object a data dukano.
    await edu.save();
    res.json(edu);
  }catch (error) {
    console.log(error);
  }
  }
  
  
  //Delete Education
  
  exports.deleteEdu = async (req, res) => {
    try{
      const eduDelete=  await Profile.findOne({ user: req.currentuser.id });
      const eduId = eduDelete.education.map(edu => edu._id.toString());
      const removeIndex = eduId.indexOf(req.params.id);
      if(removeIndex === -1) {
          return res.status(500).send("Server error ED1")
      }
      eduDelete.education.splice(removeIndex, 1);
      await eduDelete.save();
      res.json(eduDelete);
    }catch(err){
      res.status(500).send("server error ED2")
    }
  }


  exports.handle = async (req, res) => {
      try {
        const profile = await Profile.findOne({
            handle: req.params.handle_name
        }).populate("user",["name","avatar"]);
        if(!profile) {
            return res.status(404).json({msg:"Profile not found"});
        };
        res.json(profile);
      }
      catch(error) {
          return res.status(5000).json({msg:"Server errors"});
      }
  }

  //Profiles
exports.profiles=async(req, res) => {
    try {
        const profiles = await Profile.find({}).populate("user",["name","avatar"]);
        res.json(profiles);
    }catch (error) {
        
        res.status(500).json({msg:"Server Error"});
    }
};
