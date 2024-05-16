const RatingAndReview=require('../model/ratingandreview');
const Course=require('../model/course');
const mongoose=require('mongoose')

exports.createRating = async(req,res) =>{
    try{
        const userid=req.user.id;
        const {courseid,rating,review}=req.body;

        const course=await Course.findById({_id:courseid,
        studentenrolled:{$elemMatch :{$eq:userid}}});
        
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Student not Enrolled!"
            })
        }
        const alreadyreviewed=await RatingAndReview.findOne({course:courseid,user:userid});
        if(alreadyreviewed){
            console.log('already')
            return res.status(403).json({
                success:false,
                message:"Course already Reviewed"
            })
        }
        const rnr=await RatingAndReview.create({
            rating,review,
            course:courseid,
            user:userid
        });
        console.log(typeof(rnr._id));
        const courseupdt=await Course.findByIdAndUpdate(courseid,{
                $push:{ratingandreview:rnr._id}
            
        },{new:true});
        console.log(courseupdt)

        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            rnr
        })
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getavgrating=async(req,res)=>{
    try{
        const {courseid}=req.body;
        const course=await Course.findById(courseid);
        if(!course){
            res.status(404).json({
                success:false,
                message:"Course not Found!"
            })
        }
        const rating=await RatingAndReview.aggregate([
            {
                $match:{course:courseid}
            },
            {
                $group:{
                    _id:null,
                    avgrating:{$avg:'$rating'}
                }
            }
        ]);

        if(rating.length>0){
            return res.json(200).status({
                success:true,
                message:"Avg rating fetched!",
                avgrating:rating[0].avgrating
            })
        }
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getallrating=async(req,res)=>{
    try{
        const allrnr=await RatingAndReview.find({})
                        .sort({rating:-1})
                        .populate({
                            path:'user',
                        })
                        .populate('course').exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allrnr,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}