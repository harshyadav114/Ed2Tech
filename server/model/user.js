const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        trim:true
    },
    accounttype:{
        type:String,
        required:true,
        enum:['Student','Instructor','Admin']
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    additionaldetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    courseprogress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress'
    }],
    image:{
        type:String,
    },
    token:{
        type:String,
    },
    expiration:{
        type:Date,
    },

},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema);