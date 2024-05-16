const express=require('express');
const router=express.Router();
const OTP=require('../model/otp')

const {signup,login,changePassword,sendotp}=require('../controller/auth');
const {resetPasswordToken,resetPassword}=require('../controller/resetPassword');
const {auth}=require('../middlewares/auth')

router.post('/signup',signup);
router.post('/login',login);
router.post('/sendotp',sendotp);
router.get('/test',async(req,res)=>{
    const otp=await OTP.find({});
    return res.json({
        message:"done",
        otp
    })
})
router.post('/changepassword',auth,changePassword);

router.post('/resetpasswordtoken',resetPasswordToken);
router.post('/resetpassword',resetPassword);

module.exports=router;