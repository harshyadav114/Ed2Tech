const mailsender=require("../utils/mailsender");

exports.test = async(req,res) =>{
    try{
        const {email,title,body}=req.body;
        console.log(email);

        const mail=mailsender(email,title,body);
        return res.status(200).json({
            data:mail,
            message:"mail send"
        })
    }
    catch(error){
        console.log(error.message);
    }

}