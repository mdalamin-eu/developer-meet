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
    birthdate:{
        type:Date
    },
    avatar:{
        type:String
    },
    phone:{
    type:Number
    //required:true
    },

    following: [
        {
    
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
        }
    
    ],
    followers: [
        {
    
            user:{ 
                type: Schema.ObjectId, 
                ref: 'User' 
            },
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
        ref: "Post"
        }
    ],
 schools:[
     {
         type: Schema.Types.ObjectId,
         ref: "School"
     }
 ],
    
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = User = mongoose.model("User", UserSchema)
