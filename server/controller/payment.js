const {instance}=require('../config/Razorpay');
const Course=require('../model/course');
const User=require('../model/user')
const mongoose=require('mongoose');
const crypto=require('crypto');
const mailsender=require('../utils/mailsender');
const {paymentSuccessEmail}=require('../mail/template/paymentsuccess');
const {courseEnrollmentEmail}=require('../mail/template/courseenrollment')
const CourseProgress=require('../model/courseprogress');


exports.capturePayment=async(req,res)=>{
    const {courses}=req.body;
    const userid=req.user.id;
   
    if(courses?.length===0){
        return res.json({
            success:false,
            message:"No course selected for purchase "
        })
    }

    let amount=0;

    for(let courseid of courses){
        let individualcourse
      
        try{
            individualcourse=await Course.findById(courseid.courseId);
            console.log(individualcourse)
            if(!individualcourse){
                return res.status(404).json({
                    success:false,
                    message:'No course found'
                })
            }

            const uid=new mongoose.Types.ObjectId(userid);
           
            if(individualcourse.studenenrolled.includes(uid)){
                return res
                    .status(200)
                    .json({ success: false, message: "Student is already Enrolled" })
            }


            amount+=individualcourse.price;
            
            console.log(amount)
        }catch(error){
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    const options={
        amount:amount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString()
    }

    try{
        const resp=await instance.orders.create(options);
        console.log(resp);
        res.status(200).json({
            success: true,
            data: resp,
          })
    }catch(error){
        console.log(error)
        res
        .status(500)
        .json({ success: false, message: "Could not initiate order." })
    }
}

exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userid = req.user.id;     
    console.log(razorpay_order_id)
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userid
      ) {
        return res.status(400).json({ success: false, message: "Payment Failed" })
      }

      let body = razorpay_order_id + "|" + razorpay_payment_id
      console.log(body);
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")
        console.log(expectedSignature)
        if (expectedSignature === razorpay_signature) {
            console.log('yessss')
            await enrollStudents(courses, userid, res)
            return res.status(200).json({ success: true, message: "Payment Verified" })
        }

        return res.status(200).json({ success: false, message: "Payment Failed" })
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
    const { orderid, paymentid, amount } = req.body
    
    const userid = req.user.id
  
    if (!orderid || !paymentid || !amount || !userid) {
      return res.status(400).json({ success: false, message: "Please provide all the details" })
    }
    console.log(userid,orderid,paymentid,amount)
    
    const enrolledStudent = await User.findById(userid)
    console.log(enrolledStudent)
      const resp=await mailsender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstname} ${enrolledStudent.lastname}`,
          amount / 100,
          orderid,
          paymentid
        ));
        return res.json({
            success:true,
            data:resp
        })
      
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }

const enrollStudents=async(courses,userid,res)=>{
    console.log("hellooo",courses,userid)
    if (!courses || !userid) {
        return res
          .status(400)
          .json({ success: false, message: "Please Provide Course ID and User ID" })
    }

    for(let courseid of courses){
        try{
            const courseupdt=await Course.findByIdAndUpdate(
                courseid.courseId,
                {$push:{
                    studenenrolled:userid
                }},
                {new:true}
            )
            console.log(courseupdt)
            if (!courseupdt) {
                return res
                  .status(500)
                  .json({ success: false, error: "Course not found" })
            }
            console.log('guru')
            const courseprog=await CourseProgress.create({
                user:userid,
                course:courseid.courseId,
                completedvideos:[]
            })
            console.log(courseprog)
            const userupdt=await User.findByIdAndUpdate(
                userid,
                {
                    $push:{
                        course:courseid.courseId,
                        courseprogress:courseprog._id
                    }
                },
                {new:true}
            );
            console.log(userupdt)

            const emailResponse = await mailsender(
                userupdt.email,
                `Successfully Enrolled into ${courseupdt.title}`,
                courseEnrollmentEmail(
                  courseupdt.title,
                  `${userupdt.firstname} ${userupdt.lastname}`
                )
              )
              console.log("Email sent successfully: ", emailResponse.response)
        }catch(error){
            return res.status(400).json({ success: false, error: error.message })
        }
    }

}