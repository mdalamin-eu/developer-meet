const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchoolSchema = new mongoose.  Schema({
    name:{
        type: String,
        required: true
    },

    id:{
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
        type:number
    }
    
})

module.exports = User = monsoose.model("User", SchoolSchema)