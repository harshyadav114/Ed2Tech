const jwt=require("jsonwebtoken");
const User=require("../model/user")

exports.auth = async(req,res,next) =>{
    try{
        console.log('hello')
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        console.log(token);
        if(!token){
            return res.status(404).json({
                status:false,
                message:"Token Missing!"
            })
        }

        try{
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            req.user=decode

        }catch(error){
            return res.status(401).json({
                status:false,
                message:"Token not Valid!"
            })
        }
        next();
        
    }catch(error){
        // If there is an error during the authentication process, return 401 Unauthorized response
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        const userid=req.user.id;
        const user=await User.findOne({_id:userid});
        if(user.accounttype !== 'Student'){
            return res.json({
                success:false,
                message:"Protected Route For Student"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success: false, 
            message: `User Role Can't be Verified`
        })
    }
}

exports.isAdmin = async(req,res,next) =>{
    try{
        const userid=req.user.id;
        const user=await User.findOne({_id:userid});
        if(user.accounttype !== 'Admin'){
            return res.json({
                success:false,
                message:"Protected Route For Admin"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success: false, 
            message: `User Role Can't be Verified`
        })
    }
}

exports.isInstructor = async(req,res,next) =>{
    try{
        const userid=req.user.id;
        const user=await User.findOne({_id:userid});
        if(user.accounttype !== 'Instructor'){
            return res.json({
                success:false,
                message:"Protected Route For Instructor"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success: false, 
            message: `User Role Can't be Verified`
        })
    }
}