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
    posts: [
        {
            type: Schema.Types.ObjectId,
        ref: "Post"
        }
    ],
    followers:[
     {
            type: Schema.Types.ObjectId,
            ref: "users"
        
     }
 ],

 following:[
    {
           type: Schema.Types.ObjectId,
           ref: "users"
       
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
