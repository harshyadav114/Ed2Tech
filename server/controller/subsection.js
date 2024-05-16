const Section=require('../model/section');
const SubSection=require('../model/subsection');
const {imagetocloudinary}=require('../utils/imageuploader');

exports.createSubsection = async(req,res) =>{
    try{
        const {title,description,timeduration,sectionid}=req.body;
        const video=req.files.video;

        if(!video || !title || !description || !timeduration){
            return res.status(400).json({
                success:false,
                message:"Data Missing!"
            })
        }
        console.log(video);

        const videourl=await imagetocloudinary(video,process.env.FOLDER_NAME);
        console.log(videourl)
        const subsection=await SubSection.create({
            title,
            description,
            timeduration,
            videourl:videourl.secure_url
        });

        const updatedSection=await Section.findByIdAndUpdate(sectionid,
            {
                $push:{
                    subsection:subsection._id
                }
            },
            {new:true})
            .populate('subsection')

            return res.status(200).json({ success: true, data: updatedSection })

    }catch(error){
        console.error("Error creating new sub-section:", error)
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}

exports.updateSubsection = async(req,res) =>{
    try{
        const {title,description,timeduration,subsectionid,sectionid}=req.body;
        const video=req.files?.video;
        const subsection=await SubSection.findById({_id:subsectionid});
        console.log(subsection);
        if(title){
            subsection.title=title;
        }
        if(description){
            subsection.description=description;
        }
        if(timeduration){
            subsection.timeduration=timeduration;
        }
        if(video){
            const videourl=await imagetocloudinary(video,process.env.FOLDER_NAME);
            subsection.videourl=videourl.secure_url;
        }
        await subsection.save();

        const updatedsection= await Section.findById(sectionid).populate('subsection');

        return res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedsection,
          })
    }catch(error){
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while updating the section",
        })
    }
}

exports.deleteSubsection = async(req,res) =>{
    try{
    const { subsectionid, sectionid } = req.body;
    console.log(subsectionid,sectionid)
    await Section.findByIdAndUpdate(
      { _id: sectionid },
      {
        $pull: {
          subsection: subsectionid,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subsectionid })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionid).populate(
      "subsection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
    }catch(error){
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
        })
    }
}