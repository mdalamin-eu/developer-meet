const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchoolSchema = new mongoose.  Schema({
    name:{
        type: String,
        required: true
    },

    school_id:{
        type: Number,
        required: true,
        unique: true
    },

    address:{
        type: String
    },

    email:{
        type: String
    },

    phone:{
        type:Number
    }
    
})

module.exports = School = mongoose.model("School", SchoolSchema)