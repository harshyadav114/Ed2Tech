const OTP=require('../model/otp')
const User=require('../model/user');
const bcrypt=require('bcrypt');
const Profile=require('../model/profile');
const otpGenerator = require('otp-generator')
const jwt=require('jsonwebtoken');
const mailsender=require('../utils/mailsender');
const {passwordUpdated}=require('../mail/template/passwordupdate')


exports.signup = async(req,res) =>{
    try{
        const {firstname,lastname,email,contact,accounttype,password,confirmpassword,otp}=req.body;


        if(!firstname || !lastname ||!email || !contact || !password ||!confirmpassword || !accounttype || !otp){
                return res.status(400).json({
                    success:false,
                    message:"All Fields Are Required!"
                })
        }


        if(password !== confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Passwords Do Not Match!"
            })
        }


        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"Email Already In Use!"
            })
        }


        const recentotp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentotp.length === 0){
            return res.status(400).json({
                success:false,
                message:"Entered OTP is Not Valid!"
            })
        }
        else if(recentotp[0].otp !== otp){
            return res.status(400).json({
                success:false,
                message:"Entered OTP is Wrong!"
            })
        }


        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Hasing failed!"
            })
        }

        const profileDetails= await Profile.create({
            gender: null,
            dob: null,
            contact,
            about: null,

        })
        const user = await User.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedpassword,
            contact:contact,
            accounttype:accounttype,
            additionaldetails: profileDetails._id,
            image:"",

        })

        return res.status(200).json({
            success:true,
            user,
            message:"User Created Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Creation Failed!"
        })
    }
}


exports.sendotp = async(req,res) =>{
    try{
        const {email} = req.body;
       

        const validuser = await User.findOne({email});
     
       if(validuser){
            console.log('hello')
            return res.status(400).json({
                status:false,
                message:"User Already Registered!"
            })
        }

        let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        let uniques = await OTP.find({otp});
        while(uniques.length!==0){
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            console.log(otp);
            uniques = await OTP.find({otp});
        }
        
        const data1=await OTP.find({});
        const otpresponse = await OTP.create({
            email:email,
            otp:otp
        });

        return res.status(200).json({
            success:true,
            message:"OTP Entry success",
            otp
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"OTP Entry Fail"
        })
    }
}


exports.login =  async(req,res) =>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All Fields Required!"
            })
        }

        const validuser= await User.findOne({email}).populate('additionaldetails').exec();
        if(!validuser){
            return res.staus(400).json({
                status:false,
                message:"USer Not Registered!"
            })
        }
        console.log(validuser);
        if(await bcrypt.compare(password,validuser.password)){

            const payload={email,
                id:validuser._id,
                accounttype:validuser.accounttype
            }
            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"48h"
            })


            validuser.token=token;
            validuser.password=undefined;

            const options={
                expires: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly:true
            }
            res.cookie('token',token,options).json({
                success: true,
                token,
                validuser,
                message: `User Login Success`,
              })
        }
        else {
            return res.status(401).json({
              success: false,
              message: `Password is incorrect`,
            })
          }
    }
    catch(error){
        console.error(error)
    // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
    })
    }
}


exports.changePassword = async(req,res) =>{
    try{
        const userid=req.user.id;
        const {oldpass,newpass}=req.body;

        if(!oldpass || !newpass){
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required!"
            })
        }
        const user=await User.findOne({_id:userid});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found!"
            })
        }
        if(!await bcrypt.compare(oldpass, user.password)){
            return res.status(400).json({
                success:false,
                message:"Password is Wrong!"
            })
        }

        const hashpass=await bcrypt.hash(newpass, 10);
        const response=await User.findByIdAndUpdate({_id:userid},{password:hashpass},{new:true});

        const mail=await mailsender(
            user.email,
            "Password Updated",
            passwordUpdated(user.email,user.firstname)
    )

        return res.status(200).json({
            success:true,
            message:"Password Changed!"
        })

    }catch(error){
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
       })
    }
}