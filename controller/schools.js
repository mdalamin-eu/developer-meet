const School = require ('../models/Schools')
const User = require('../models/User')
const gravater = require('gravatar');

const { check, validationResult } = require('express-validator/check')

exports.school= async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try{
        console.log('lolo',req.body.school_id)
        let school = await  School.findOne({school_id:req.body.school_id});
        console.log(school)
        if(school){
            return res
            .status(400)
            .json({ error: [{msg:"School already registerd "}]});
        }
        else{
            newSchool= new School({
                name:req.body.name,
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
