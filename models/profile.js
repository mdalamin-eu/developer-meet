const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ProfileSchema = new mongoose. Schema({
user:{
    type: Schema.Types.ObjectId,
    ref: "user"
},
handle: {
    type: String,
    required: true,
    max:40
},
company:{
    type: String
},
website:{
    type: String
},
status:{
    type: String,   //what is status?
    required: true
},
skills:{
    type: [String],  //why we use this []
    required: true
},
bio:{
    type:String
},
githubusername:{
    type:String
},

})