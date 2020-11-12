const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchoolSchema = new mongoose.  Schema({
    school_name:{
        type: String,
        required: true
    },

    school_id:{
        type: Number,
        required: true,
        unique: true
    },

    degree:{
    type:String,
    required:true
    },

    fieldofstudy:{
    type: String,
    required:true
    },

    to:{
    type:String
    },

    from:{
    type:String
    },
    
    current:{
        type: Boolean,
        default: false
    },

    address:{
        type: String
    }
    
})

module.exports = School = mongoose.model("School", SchoolSchema)