const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    phone:{
    type:Number
    //required:true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
        ref: "Post"
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model("User", UserSchema)
