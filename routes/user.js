const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const AWS = require('aws-sdk')
const User = require('../models/User')
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken")
const {registerUserEmail} = require('../helper/sendEmail')


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:'eu-central-1'
  })

  const ses = new AWS.SES({apiVersion:'2010-12-01'})

// @access Public

router.get("/", (req, res) => res.send("User Route"));


router.post(
    "/register",
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exist" }] });
        } else {
          const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
          });
          user = new User({
            name,
            email,
            password,
            avatar
          });
  
        
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt
     
          const token = jwt.sign(payload, process.env.JWT_ACCOUNT_ACTIVATION,{
            expiresIn:'5h'
          })
             //Send email
             const params = registerUserEmail(token, email)         
             const sendEmailOnRegister = ses.sendEmail(params).promise();
             sendEmailOnRegister.then(data => {
             
                res.json({
                  message:`Email has been sent to ${email}, Follow the instructions to compelete your registration`
                })
                 
                }).catch(error =>{
                    console.log('Ses email on register', error);
                   res.json({
                     message:'sorry We could not veryfiy your email'
                   })
                
                  })
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );

module.exports = router;