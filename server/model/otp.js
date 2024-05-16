const mongoose=require("mongoose");
const mailsender=require('../utils/mailsender');
const emailTemplate=require('../mail/template/emailverifiction');

const otpSchema= new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
        
    },
    createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
    
});

async function sendemail(email,otp){
    try{
        const response = await mailsender(email,"verfication email",emailTemplate(otp));
        console.log("Email sent successfully: ", response);
        return ;
    }
    catch(error){
        console.log("Error occurred while sending email: ", error);
		throw error;
    }
}

otpSchema.pre('save',async function(next){
    if(this.isNew){
        await sendemail(this.email,this.otp);
    }
    next();
})
const temp=mongoose.model('OTP',otpSchema);
module.exports=temp;