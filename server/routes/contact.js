const express=require('express');
const router=express.Router();
const {contactUsEmail}=require('../controller/contact')

router.post('/emailres',contactUsEmail);

module.exports=router;