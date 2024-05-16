import React from 'react'
import { useState } from 'react';
import { Forgotpassword } from '../services/operations/auth';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"

const Forgotpasswords = () => {
    const [email,setemail]=useState('');
    const [change,setchange]=useState(false);
    const dispatch=useDispatch();
    const { loading } = useSelector((state) => state.auth)
    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(Forgotpassword(email));
        setchange(true);
    }
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] max-md:w-full flex flex-col items-center ">
        {loading ?
        (<div className="spinner"></div>)
        :
      (
        change?
            (<div className="max-w-[500px] p-4 lg:p-8">
            <div  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Check email</div>
            <div className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">We have sent the reset email to {email}</div>
            <div
                className={`w-full text-center text-[0.8rem] sm:text-[1rem] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]  bg-yellow-50 text-black hover:shadow-none hover:scale-95 transition-all duration-200 `}
                onClick={()=>{dispatch(Forgotpassword(email))}}>
                        Resend email 
            </div>
            <div className="flex items-center justify-between mt-5  ">
                    <Link to="/login">
                    <p className="flex items-center gap-x-2 text-richblack-5">
                        <BiArrowBack /> Back To Login
                    </p>
                    </Link>
                </div>
            </div>
        ):
        (
            <div className="max-w-[500px] p-4 lg:p-8">
            <div className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Reset your password</div>
            <div className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"</div>
            <form onSubmit={submithandler}>
                <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        placeholder="Enter email address"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        <button
                            className={`w-full mt-7 text-center text-[0.8rem] sm:text-[1rem] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] flex gap-3 items-center bg-yellow-50 text-black hover:shadow-none hover:scale-95 transition-all duration-200 `}
                            type='submit'>
                            Reset password
                        </button>
                    </label>
                </form>
                <div className="flex items-center justify-between mt-5  ">
                    <Link to="/login">
                    <p className="flex items-center gap-x-2 text-richblack-5">
                        <BiArrowBack /> Back To Login
                    </p>
                    </Link>
                </div>
                </div>
        )
        )}
        
    </div>
  )
}

export default Forgotpasswords