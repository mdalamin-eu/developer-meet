const express = require("express");
const router = express.Router();
const Auth = require("../middleware/authguard")
const Profile = require("../models/Profile");
const User = require("../models/User")


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

    try {

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

        newProfile = new Profile({
           company,
           website,
           location,
           bio,
           skills,
           handle,
           status,
           githubusername

          });
              const existHandle= await Profile.findOne({handle:profileFields.handle});
              if(existHandle){
                  return res.status(404)
                  .json({errors:[{msg:"The handle already exists"}]});
              }
    
          await newProfile.save();
    } catch (error) {
        
    }

}

