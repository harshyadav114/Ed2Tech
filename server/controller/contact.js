const mailsender=require('../utils/mailsender');
const {contactUsEmail}=require('../mail/template/contactform');

exports.contactUsEmail=async(req,res)=>{
    try{

        const {email,firstname,lastname,phone,countrycode,message}=req.body;
        const response=await mailsender(
            email,
            "Your Data send successfully",
            contactUsEmail(email,firstname,lastname,phone,countrycode,message)
            );
            console.log("Email Res ", response)
            return res.json({
            success: true,
            message: "Email send successfully",})

    }catch(error){
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
    }
}