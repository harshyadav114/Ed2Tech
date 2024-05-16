const User=require("../model/user");
const mailsender = require("../utils/mailsender");
const bcrypt=require("bcrypt");
const crypto = require("crypto");
const {passwordUpdated}=require('../mail/template/passwordupdate');
const resetPassword=require('../mail/template/passwordreset')

exports.resetPasswordToken = async(req,res) =>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found!"
            })
        }

        const token=await crypto.randomBytes(20).toString("hex");
        const url=`https://edulity.vercel.app/resetpassword/${token}`;

        const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				expiration: Date.now() + 10800000,
			},
			{ new: true }
		);

        const mail=await mailsender(
                email,
                "Password Reset",
                resetPassword(url)
        )
        res.json({
			success: true,
			message:"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
    }catch(error){
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
    }
}

exports.resetPassword = async(req,res) =>{
    try{
        const {token,newpass,confirmpass}=req.body;
        if(!newpass || !confirmpass){
            return res.status(400).json({
                success:false,
                message:"All Field are Required!"
            })
        }
        if(newpass !== confirmpass){
            return res.status(400).json({
                success:false,
                message:"Passwords Do not Match!"
            })
        }
        const user= await User.findOne({token:token});
        console.log(user);
        if(!user){
            return res.status(400).json({
				success: false,
				message: "Token is Invalid",
			});
        }
        if(Date.now() > user.expiration){
            return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
        }
        const hashpass=await bcrypt.hash(newpass, 10);
        const updated=await User.findOneAndUpdate({token:token},
            {password:hashpass},
            {new:true})
            const mail=await mailsender(
                user.email,
                "Password Updated",
                passwordUpdated(user.email,user.firstname)
        )

            res.json({
                success: true,
                message: `Password Reset Successful`,
            });
    }catch(error){
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
}