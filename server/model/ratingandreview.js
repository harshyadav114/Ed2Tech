const mongoose=require("mongoose");

const ratingandreviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        trim:true
    },
    review:{
        type:String,
        required:true,
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    }
})

module.exports=mongoose.model("RatingAndReview",ratingandreviewSchema);