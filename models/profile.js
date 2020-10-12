
//Hey Mr. Miraz I have some questions . So please go down slowly and give my questions answer ): 


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
experience: [
    {
        title: {
            type: String,
            required: true       //if i don't add exprince on my profile. it will be create any problem? bcoz It's have required:true !!
    },
        company:{
            type: String,
            required: true
    },
        location: {
            type: String
    },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },

        current: {
            type: Boolean,
            default: false   //why default and false?
        },
        description: {
            type: String
        }
    }
],
})