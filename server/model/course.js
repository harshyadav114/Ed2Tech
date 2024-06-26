const mongoose=require("mongoose");

const courseSchema = new mongoose.Schema({
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
    whatyouwilllearns:{
        type:[String],
        required:true,
        trim:true
    },
    instructorname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    section:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section'
    }],
    ratingandreview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    studenenrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    ],
    tags:{
        type:[String],
        required:true,
    },
    status:{
        type:String,
        enum:['Draft','Published']
    },
    instructions:{
        type:[String],
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Course",courseSchema);