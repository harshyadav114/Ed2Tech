const express=require('express');
const router=express.Router();
const {capturePayment,verifyPayment,sendPaymentSuccessEmail}=require('../controller/payment');
const {auth,isStudent}=require('../middlewares/auth');

router.post('/capturepay',auth,isStudent,capturePayment);
router.post('/verifypay',auth,isStudent,verifyPayment);
router.post('/sendpaymail',auth,isStudent,sendPaymentSuccessEmail);


module.exports=router;