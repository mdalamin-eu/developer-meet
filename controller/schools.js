const School = require ('../models/Schools')
const User = require('../models/User')
const gravater = require('gravatar'); //it's for photo

const { check, validationResult } = require('express-validator/check')

exports.school= async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try{
        console.log('lolo',req.body.school_id ) 
        let school = await  School.findOne({school_id:req.body.school_id}); //body means it's bodyParsher
        console.log(school)
        if(school){
            return res
            .status(400)
            .json({ error: [{msg:"School already registerd "}]});
        }
        else{
            newSchool= new School({
                school_name:req.body.name,
                school_id:req.body.school_id,
                address:req.body.address,
                email:req.body.email,
                phone: req.body.phone
              });

        await newSchool.save();
        res.send(newSchool)

        }

    } 
    catch (err){
        console.error(err.message);
        res.status(500).send('server error 3');
    }

}


//last one for added for school of users

exports.schoolAddByUser= async(req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        
        let school = await  School.findById(req.params.id);
        if(!school){
            return res
            .status(400)
            .json({ error: [{msg:"School not found "}]});
        }
        else {
           console.log(req.currentuser.id)
          User.update(
            { _id: req.currentuser.id },
            { $push: { schools:  req.params.id} },
            () => {}
          );
              
        }
       
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error 4");
    }
}


//  Find School by code
exports.schoolBycode=  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
  
      let school =await School.findOne({school_id:req.params.code})
  
      if (!school) {
        return res
          .status(400)
          .json({ errors: [{ msg: " The school not found " }] });
      } else {
  
        res.send(school)
    
      }
    }
  
   catch (err) {
      console.error(err.message);
      res.status(500).send("Server error 2");
    }
  
  }


  //Delete Schools BY id


  // exports.DeleteEdu = async (req, res) => {
  //   try{
  //     console.log(req.params.id)
  //     const school = await School.findOne({school_id:req.params.id});
  //     console.log('jjj', school)

  //     if(!school){
  //       return res.status(404).json({msg:"the school not exists"});
  //     }

  //     if (school.user.toString() !== req.user.id) {
  //       return res.status(404).json({msg:"You are not authrized"});
  //     }

  //     await school.remove();
  //     res.json({msg:"the school delete successfully"});

  //   }catch(err){
  //     res.status(500).send("server error B")
  //   }
  // }


  //Education
exports.Education= async (req, res)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
      return res.status(400).json({errors: errors.array()});
  }
const {
   school_name,
   school_id,
   degree,
   fieldofstudy,
   from,
   to,
   current,
   address
} = req.body;

const newEdu = {
  school_name,
  school_id,
  degree,
  fieldofstudy,
  from,
  to,
  current,
  address
};
try {
  const education = await School.findOne({user: req.user.id});
  if (!education) {
    res.status(404).send({msg:"User profile not found"});
  }
  profile.education.unshift(newEdu); //unshift mane hocche ekta object a data dukano.
  await education.save();
  res.json(profile);
}catch (error) {
  console.log(error);
}
}


//Delete Education

exports.deleteEdu = async (req, res) => {
  try{
    const eduDelete=  await School.findOne({ user: req.user.id });

  }catch(err){
    res.status(500).send("server error")
  }
}