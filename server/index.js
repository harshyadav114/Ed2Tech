const express=require("express");
const app=express();
const cors = require("cors");
const {cloudinaryConnect}=require('./config/cloudinary');
const {connect}=require('./config/database');
const userRoutes=require('./routes/user');
const courseRoutes=require('./routes/course');
const contactRoute=require('./routes/contact');
const profileRoute=require('./routes/profile');
const paymentRoute=require('./routes/payment');
const fileUpload=require('express-fileupload');
const { courseCreate } = require("./controller/course");
require("dotenv").config();
const bodyParser = require('body-parser');
var cookieparser = require('cookie-parser')


const port=process.env.PORT || 4000;


app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
app.use(
	cors({
		origin:"https://edulity.vercel.app",
		credentials:true,
	})
)


cloudinaryConnect();
connect();



app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/contact',contactRoute);
app.use('/api/v1/profile',profileRoute);
app.use('/api/v1/payment',paymentRoute);


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
app.listen(port,()=>{console.log("server started at:",port)});