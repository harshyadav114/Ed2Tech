const User=require('../model/user');
const Profile=require('../model/profile');
const Course=require('../model/course');
const {imagetocloudinary}=require('../utils/imageuploader');
const { Mongoose } = require('mongoose');

exports.profileUpdate = async(req,res) =>{
    try{
        const {
            firstname="",
            lastname="",
            dob="",
            gender="",
            about="",
            contact=""} = req.body;
            const userid=req.user.id;
            console.log(typeof(dob));
        const updateduser=await User.findByIdAndUpdate({_id:userid},
            {
                firstname,
                lastname
            },
            {new:true});
        console.log(updateduser);
        const profile=await Profile.findById(updateduser.additionaldetails);
        
        profile.dob=dob;
        profile.gender=gender;
        profile.contact=contact;
        profile.about=about;
        await profile.save();
        console.log(profile);

        const userupdt=await User.findById(userid)
            .populate('additionaldetails')
            .exec();

            return res.json({
                success: true,
                message: "Profile updated successfully",
                userupdt,
              })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
  }
}

exports.deleteAccount = async(req,res) =>{
    try{
        const id=req.user.id;
        
        const user=await User.findById({_id:id});
        console.log(user);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
              })
        }

        const deletedprofile=await Profile.findByIdAndDelete({_id:user.additionaldetails});

        for(let courseId of user.course){
            const deletedusercourse=await Course.findByIdAndUpdate({_id:courseId},
                {
                    $pull:{studentenrolled:id}
                },{new:true});
        }
        const deletedUser=await User.findByIdAndDelete({_id:id});
        return res.json({
            success: true,
            message: "Account Deleted successfully",
            deletedUser,
          })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.updatedProfileImage = async(req,res) =>{
    try{
        console.log('hello');
        const id=req.user.id;
        console.log(id);
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
              })
        }
        const image=req.files.profileimage;
        console.log(image)
        if(!image){
            return res.status(404).json({
                success: false,
                message: "Profile Image not found",
              })
        }
        const imageobj=await imagetocloudinary(image,process.env.FOLDER_NAME,1000,1000);
        console.log(imageobj,'haha');
        const updatedUser=await User.findByIdAndUpdate({_id:id},{image:imageobj.secure_url});

        return res.json({
            success: true,
            message: "Image Updated successfully",
            updatedUser
          })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.getinstructorDashboard=async(req,res)=>{
    try {
        const courseDetails = await Course.find({ instructorname: req.user.id })
    
        const courseData = courseDetails.map((course) => {
          const totalStudentsEnrolled = course.studenenrolled.length
          const totalAmountGenerated = totalStudentsEnrolled * course.price
    
          const courseDataWithStats = {
            _id: course._id,
            courseName: course.title,
            courseDescription: course.description,
            totalStudentsEnrolled,
            totalAmountGenerated,
          }
    
          return courseDataWithStats
        })
    
        res.status(200).json({ courses: courseData })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
      }
}
