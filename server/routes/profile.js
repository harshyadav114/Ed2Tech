const express=require('express');
const router=express.Router();

const {profileUpdate,deleteAccount,updatedProfileImage,getinstructorDashboard}=require('../controller/profile');
const {auth,isInstructor}=require('../middlewares/auth');

router.post('/profileUpdate',auth,profileUpdate);
router.post('/deleteAccount',auth,deleteAccount);
router.post('/updatedProfileImage',auth,updatedProfileImage);
router.get('/instructordashboard',auth,isInstructor,getinstructorDashboard);


module.exports=router;