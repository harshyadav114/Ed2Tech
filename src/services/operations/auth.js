import { authendpoints } from "../Apiendpoints";
import {setloading,settoken,setsignupdata} from '../../Slicer/authSlicer';
import { apiconnector } from "../Apiconnector";
import {toast} from 'react-hot-toast';
import {setuser} from '../../Slicer/profileSlicer'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
}=authendpoints;
export const sendotp = (email,navigate,userData) =>{
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setloading(true));
        try{//
            const response=await apiconnector('POST',SENDOTP_API,{email});
            toast.success("OTP Sent Successfully")
            navigate("/verifyemail")
        }catch(error){
            console.log("SENDOTP API ERROR..", error);
            toast.error(error.response.data.message);
            toast.error("Could Not Send OTP");
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export const login = (email,password,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading('loading...');
        dispatch(setloading(true));
        try{
            const response=await apiconnector('POST',LOGIN_API,{email,password});
            //console.log(response)
            dispatch(settoken(response.data.token));
            const image=response.data.validuser.image?response.data.validuser.image:`https://api.dicebear.com/7.x/bottts/svg?seed=${response.data.validuser._id}`;
            //console.log(image);
            response.data.validuser.image=image;
            dispatch(setuser(response.data.validuser));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.validuser));

            toast.success('Logged in');
            navigate('/');

        }catch(error){
            console.log("LOGIN API ERROR..", error);
            toast.error(error.response.data.message);
            toast.error("Login failed");
        }
        toast.dismiss(toastId);
        dispatch(setloading(false))
    }
}

export const signup = (accounttype,
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
    otp,
    contact,
    navigate) =>{
    return async(dispatch)=>{
        const toastId=toast.loading('loading...');
        dispatch(setloading(true));
        try{
            //console.log(otp,firstname,lastname,email,password,confirmpassword,accounttype,contact);
            const response=await apiconnector('POST',SIGNUP_API,{firstname,lastname,email,password,accounttype,otp,contact,confirmpassword});
            //console.log(response);


            toast.success('Signup Successful');
            navigate('/login');

        }catch(error){
            console.log("LOGIN API ERROR..", error);
            toast.error(error.response.data.message);
            toast.error("Login failed");
        }
        toast.dismiss(toastId);
        dispatch(setloading(false))
    }
    }

    export const Forgotpassword = (email) =>{
        return async(dispatch)=>{
            const toastId=toast.loading('loading...');
            dispatch(setloading(true));
            try{
                const response=await apiconnector('POST',RESETPASSTOKEN_API,{email});
                //console.log(response);
    
    
                toast.success('Reset Email Sent');
    
            }catch(error){
                console.log("RESET PASSWORD TOKEN Error", error);
                toast.error(error.response.data.message);
                toast.error("Failed to send email for resetting password");
            }
            toast.dismiss(toastId);
            dispatch(setloading(false))
        }
        }

        export const Resetpassword = (newpass,confirmpass,token,navigate)=>{
            return async(dispatch)=>{
                const toastId=toast.loading('loading...');
                dispatch(setloading(true));
                try{
                    const response=await apiconnector('POST',RESETPASSWORD_API,{newpass,confirmpass,token});
                    //console.log(response);
        
                    toast.success('Password has been reset successfully');
                    navigate('/login');
        
                }catch(error){
                    console.log("RESET PASSWORD TOKEN Error", error);
                    toast.error(error.response.data.message);
                    toast.error("Unable to reset password");
                }
                toast.dismiss(toastId);
                dispatch(setloading(false))
            }
        }

export const logout = (navigate)=>{
        return async(dispatch)=>{
                
                try{
                    
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                    dispatch(settoken(null));
                    dispatch(setuser(null));

                    toast.success('Logout successfully');
                    
        
                }catch(error){
                    toast.error("Logout failed");
                }
        }
}