const Course=require('../model/course');
const Category=require("../model/category");
const Section=require("../model/section");
const SubSection=require("../model/subsection")
const { findById } = require('../model/user');
const {imagetocloudinary}=require("../utils/imageuploader");
const User=require('../model/user');
const mongoose=require('mongoose')
require('dotenv').config();

exports.courseCreate = async(req,res) =>{
    try{
        const {title,description,price,category,tag,whatyouwilllearn,status="Draft",instruction}=req.body;
        const whatyouwilllearns=JSON.parse(whatyouwilllearn);
        
        const tags=JSON.parse(tag);
        const instructions=JSON.parse(instruction);
        console.log(tags,instructions,whatyouwilllearns,title,description,price,category);
        const thumbnail=req.files.thumbnail;
        const userid=req.user.id
        console.log(thumbnail);
       
        if(!title || !description || !price || !category || !tag || !whatyouwilllearn || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required!"
            })
        }
        console.log('hello')
        console.log('hello2')
        const isInstructor=await User.findById({_id:userid});
        if(isInstructor.accounttype !== 'Instructor'){
            return res.json({
                success:false,
                message: "Instructor Details Not Found",
            })
        }
        console.log(isInstructor)
        const validcategory=await Category.findOne({_id:category});
        if(!validcategory){
            return res.status(400).json({
                success:false,
                message:"Category is Not Found"
            })
        }
        
        const image=await imagetocloudinary(thumbnail,process.env.FOLDER_NAME);
        
        const newcourse=await Course.create({
            title,
            description,
            whatyouwilllearns,
            price,
            category:validcategory._id,
            tags,
            instructorname:userid,
            thumbnail:image.secure_url,
            status,
            instructions

        });
        
        const userupdate=await User.findByIdAndUpdate(userid,
            {
                $push:{course:newcourse._id}
            },{new:true});
       
        
      
        const categoryupdt=await Category.findByIdAndUpdate(newcourse.category,
                {
                    $push:{courses:newcourse._id}
                }
        ,{new:true})
        console.log(categoryupdt);
        res.status(200).json({
            success: true,
            data: newcourse,
            userupdate,
            message: "Course Created Successfully",
        });
    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }
}

exports.updateCourse=async(req,res)=>{
    try{
        
        const {courseid}=req.body;
        const course=await Course.findById(courseid);
        const changes=req.body;
        console.log(changes);
        
        if(!course){
            return res.status(404).json({ error: "Course not found" })
        }
        if(req.files){
            const thumbnail=req.files.thumbnail;
            const response=await imagetocloudinary(thumbnail,process.env.FOLDER_NAME);
            course.thumbnail=response.secure_url;
            
        }
        for(let key in changes){
            if(key==='tags' || key==='instructions' || key==='whatyouwilllearns'){
                course[key]=JSON.parse(changes[key]);
            }
            else{
                course[key]=changes[key];
            }
        }
        await course.save();

        const updatedcourse=await Course.findById(courseid)
                                    .populate({
                                        path:'instructorname',
                                        populate:{
                                            path:'additionaldetails'
                                        }})
                                    .populate('category')
                                    .populate({
                                        path:'section',
                                        populate:{
                                            path:'subsection'
                                        }
                                    }).exec()
        

        return res.status(200).json({
            success:true,
            message: "Course updated successfully",
            updatedcourse
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

exports.deleteCourse=async(req,res)=>{
    try{
        const {courseid}=req.body;
        console.log(courseid)
        const course=await Course.findById(courseid);
        console.log(course)
        if (!course){
            return res.status(404).json({ message: "Course not found" })
        }

        for(let sectionId of course.section){
            const section=await Section.findById(sectionId);
            if(section){
                for(let subsectionId of section.subsection){
                    const deletedsubsec=await SubSection.findByIdAndDelete(subsectionId);
                }
            }
            const deletdsection=await Section.findByIdAndDelete(sectionId);
        }

        const enrolledstudent=course.studenenrolled;
        console.log(enrolledstudent,"hdhdkdkd")
        for(let userId of enrolledstudent){
            const userpresent=await User.findById(userId);
            console.log(userpresent,courseid,"dhjgdsjfkdszd")
            if(userpresent){
                const resp=await User.findByIdAndUpdate(userId,{
                    $pull:{course:courseid}
                })
                console.log(resp,"jhjhfjdhdvhhjhuehuehuehue")
            }
        }

        const deletedcourse=await Course.findByIdAndDelete(courseid);


        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
          })
        
    }catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

exports.getInstructorCourse=async(req,res)=>{
    try{
        const userid=req.user.id;
        console.log(userid);
        const user=await User.findById(userid);
       
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found!!"
            })
        }
        const courses=await User.findById({_id:userid},{course:1,_id:0}).populate('course').exec();
        console.log(courses)           
        return res.status(200).json({
            success:true,
            message:"Course fetched!",
            data:courses
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getCourseDetail=async(req,res)=>{
    try{
        const {courseid}=req.body;
        const userid=req.user.id;
        const course=await Course.findOne({_id:courseid})
                                                        .populate('instructorname')
                                                        .populate({
                                                            path:'section',
                                                            populate:{
                                                                path:'subsection'
                                                            }
                                                        })
                                                        .exec();
        
        
        if(course?.instructorname._id != userid){
            return res.status(404).json({
                success:false,
                message:"Edit Course Denied!"
            })
        }
        const coursedetail=await Course.findById(courseid)
                                             
        return res.status(200).json({
            success:true,
            message:"Course fetched!",
            data:coursedetail
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getUnauthorisedCourseDetail=async(req,res)=>{
    try{
        const {courseid}=req.body;
        const course=await Course.findOne({_id:courseid})
                                                .populate({
                                                    path:'section',
                                                    populate:{
                                                        path:'subsection'
                                                    }
                                                })
                                                .populate({
                                                    path:'instructorname',
                                                    populate:{
                                                        path:'additionaldetails'
                                                    }
                                                })
                                                .populate('ratingandreview')
                                                .populate('category')
                                                .exec();
                                             
        return res.status(200).json({
            success:true,
            message:"Course data fetched!",
            data:course,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getEnrolledCourse=async(req,res)=>{
    try{
        const userid=req.user.id;

        const user=await User.findById(userid)
                                .populate({
                                    path:'course',
                                    populate:{
                                        path:'section',
                                        populate:{
                                            path:'subsection'
                                        }
                                    }
                                })
                                .populate('courseprogress')
                                .exec();
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
        }
        console.log(user);

        return res.status(200).json({
            success:true,
            message:"user course data fetched!",
            data:user,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}