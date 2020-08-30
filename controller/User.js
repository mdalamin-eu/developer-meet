
const AWS = require('aws-sdk')
const User = require('../models/User')
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken")
const {registerUserEmail} = require('../helper/sendEmail')
const { check, validationResult } = require("express-validator/check");


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:'eu-central-1'
  })

  const ses = new AWS.SES({apiVersion:'2010-12-01'})


  
  exports.registerAdd= 
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
      exports.registeractivate= async(req, res)=>{
        const {token}=req.body
        if(!token)
        res.status(400).send({
            'message':'sorry token is missing'
        })
        jwt.verify(token,process.env.JWT_SCREET, async(err, decode) =>{
            if(err){
                res.status(404).send({
                    'message':'invalid token'
                })
            }//destructuring kora hocce 
            const {name, email, password, avatar, phone, date} = jwt.decode(token)
            try{
                const existUser=await User.findOne({email})
                if(existUser){
                    return res.status(400).send({
                        'message':'User token allready taken'
                    })
                }
                const user = new User({
                    name, email, password, avatar, phone, date
                })
                user.save((err, newUser=>{
                    if(err){
                        console.log(err)
                    }
                    return res.status(200).send({
                        'message':'You are registerd'
                    })
                }))
            }
            catch(error){
                console.log(error)
            }
        })
    }
    }

   

    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  
  }