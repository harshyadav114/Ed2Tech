const Course=require("../model/course");
const Section=require('../model/section');
const SubSection=require('../model/subsection');

exports.createSection = async(req,res) =>{
    try{
        const {title,courseid}=req.body;
        if(!courseid || !title){
            return res.status(400).json({
                success:false,
                message:"Data Missing!"
            })
        }
        const section=await Section.create({title});
        const updatedCourse=await Course.findByIdAndUpdate(courseid,
            {
                $push:{
                    section:section._id
                }
            },{new:true}).populate({
                path:'section',
                populate:{path:'subsection'}
            })
            
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
            section
        });
    }catch(error){
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

exports.updateSection = async(req,res) =>{
    try{
        const {title,sectionid,courseid}=req.body;
        if(!title){
            return res.status(400).json({
                success:false,
                message:"Data Missing!"
            })
        }
        const updatedsection=await Section.findByIdAndUpdate(sectionid,
            {title},
            {new:true});
        const course = await Course.findById(courseid)
        .populate({
            path:"section",
            populate:{
                path:"subsection",
            },
        })
        .exec();

        res.status(200).json({
            success: true,
            message: "Section Updated successfully",
            data:course,
            updatedsection
        });
    }catch(error){
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

exports.deleteSection = async(req,res) =>{
    try{
        const {sectionid,courseid}=req.body;
        const pullsection=await Course.findByIdAndUpdate(courseid,
            {
                $pull:{
                    section:sectionid
                }
            });
        const section = await Section.findById(sectionid);
        console.log(sectionid, courseid);
        if(!section) {
            return res.status(404).json({
                success:false,
                message:"Section not Found",
            })
        }
        await SubSection.deleteMany({_id:{$in:section.subsection}});
        await Section.findByIdAndDelete(sectionid);

		const course = await Course.findById(courseid).populate({
			path:"section",
			populate: {
				path: "subsection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});

    }catch(error){
        console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}