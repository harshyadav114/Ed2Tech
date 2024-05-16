const mongoose=require("mongoose");

const subsectionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    videourl:{
        type:String,
    },
    timeduration:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("SubSection",subsectionSchema);