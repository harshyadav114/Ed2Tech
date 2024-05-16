const nodemailer=require("nodemailer");
require("dotenv").config();
const mailsender = async(email,title,body) =>{
    try{
        const transpoter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        console.log('hiii')
        let info=await transpoter.sendMail({
            from: 'Edulity | Powered by aZinc',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log(info);
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}
module.exports=mailsender;