
const AWS = require('aws-sdk')
const User = require('../models/User')
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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
  

    const { name, email, password, phone } = req.body;
    

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
          avatar,
          phone
        });

        const salt= await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(password, salt)
        console.log(user.phone)
      
        const payload = { id: user.id, name: user.name, avatar: user.avatar, password:user.password, phone:user.phone, email:user.email, date:user.date}; //create jwt
   
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
    }

   catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  
  }
//registerSendApiDone








//Activate start
exports.registeractivate= async(req, res)=>{
  const {token}= req.body
  console.log(req.body.token)
  if(!token)
  
  res.status(400).send({
   'message':'sorry token is missing'
  })
  jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, async(err, decode)=>{
    if(err){
      res.status(404).send({
        'message':'invalid token'
      })
    }
    const { name, email, phone, password, avatar, date } = jwt.decode(token)
    console.log('simnumber', phone)
    // console.log(jwt.decode(token))

    try{
      const existUser= await User.findOne({email})
      console.log(existUser)

      if (existUser){
        return res.status(400).send({
          'message':'User allready register'
        })
      }
      const user= new User({
        name, email, phone,  password, avatar, date
      })
      
      
      
      user.save((err, newUser=>{
        if(err){
          res.send(err)
          // console.log(err)

        }
        console.log('usernew', newUser)
        const payload = { id: user.id, name: user.name, avatar: user.avatar, user:email }; //create jwt

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ 
            'message':'You are registerd',
            token
           });
        });
      
      }))
    }
    catch(error){
      console.log(error)
    }
  })
}







//LoginFrom 

exports.Login = async (req, res)=>{
  const {email, password} = req.body

  try{
    const findUser = await User.findOne({email})
    console.log('UserLogin',findUser)
    if(!findUser){
      res.status(404).send({
        'message':"Sorry user not found register first"

      })
      
    }


 const isMatch= await bcrypt.compare(password, findUser.password)

 if(!isMatch){
  
    //if(findUser.password !== password){
      res.status(400).send({
        'message':'Sorry password did not matched'
      })
    }

    const user = {id:findUser.id, name:findUser.name, email:findUser.email, loggedin:true}
    console.log(user)
    jwt.sign(user, process.env.JWT_SECRET,{expiresIn:'1h'},(err, token) => {
      if(err){
        res.status(500).send({
          'message':"Something went wrong"
        })
      }
      res.status(200).send({
        user, 
        token
      })
    })
  } catch(error){

  }
}
exports.auth =  async (req, res)=>{
try {
  const user = await User.findById(req.currentuser.id)
  res.json(user)
} catch (error) {
  res.status(500).json({msg:"Server Errors"})
}
}
exports.resetpasswordemailsend= 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User not registerd" }] });
    } 
    
    else {

      const payload = { email:user.email}; //create jwt
 
      const token = jwt.sign(payload, process.env.JWT_RESET_PASSWORD,{
        expiresIn:'5h'
      })
         //Send email
         const params = registerUserEmail(token, email)         
         const sendEmailOnRegister = ses.sendEmail(params).promise();
         sendEmailOnRegister.then(data => {
         
            res.json({
              message:`Email has been sent to ${email}, Follow the instructions to compelete your reset password`
            })
             
            }).catch(error =>{
              
               res.json({
                 message:'something went wrong please try again'
               })
            
              })
    }
  }

 catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

}

// reset password final step
exports.resetpassword= async(req, res)=>{
  const { password}= req.body;
  const token = req.header('x-auth-token');
  if(!password)
  {
    res.status(400).send({
      'message':'password is required'
    })
  }
  if(!token)
  
  res.status(400).send({
   'message':'sorry token is missing'
  })
  jwt.verify(token,process.env.JWT_RESET_PASSWORD, async(err, decode)=>{
    if(err){
      res.status(404).send({
        'message':'invalid token'
      })
    }
    const {email } = jwt.decode(token)
    
    // console.log(jwt.decode(token))

    try{
      const existUser= await User.findOne({email})

      if (!existUser){
        return res.status(400).send({
          'message':'somethign went wrong'
        })
      }
      const salt= await bcrypt.genSalt(10)
      const haspassword= await bcrypt.hash(password, salt)
  
      existUser.set({password:haspassword})
      console.log('after set', existUser)
    existUser.save((err, newdata=>{
         if(err){
           res.send(err)
       console.log(err)
         }
         res.send({'msg':'your password reset successfully'})
       }))
      
    }
    catch(error){
      console.log(error)
    }
  })
}

//postCount
exports.userById=  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    let user =await User.findById(req.params.id).populate("posts",["text"]).populate("schools",["name"]).populate("following",["name","avatar"]);
    console.log('any post', user)
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: " The user not found " }] });
    } else {

      res.send(user)
         //Send email
         
    }
  }

 catch (err) {
    console.error(err.message);
    res.status(500).send("Server error 2");
  }

}