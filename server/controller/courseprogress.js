const mongoose = require("mongoose")
const Section=require('../model/section')
const SubSection=require('../model/subsection')
const CourseProgress = require('../model/courseprogress')
const Course=require('../model/course')

exports.updateCourseProgress = async (req, res) => {
  const { courseid, subsectionid } = req.body
  const userId = req.user.id

  try {
    
    const subsection = await SubSection.findById(subsectionid)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    let courseProgress = await CourseProgress.findOne({
      course: courseid,
      user: userId,
    })

    if (!courseProgress) {
      
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
   
      if (courseProgress.completedvideos.includes(subsectionid)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      
      courseProgress.completedvideos.push(subsectionid)
    }

  
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}