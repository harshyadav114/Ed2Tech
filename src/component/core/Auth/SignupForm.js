import React from 'react'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Account_type } from '../../../utils/constant';
import Tab from '../../common/Tab';
import {useSelector,useDispatch} from 'react-redux';
import { setsignupdata,setloading } from '../../../Slicer/authSlicer';
import {toast} from 'react-hot-toast';
import { sendotp } from '../../../services/operations/auth';
import {useNavigate} from 'react-router-dom';


const SignupForm = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const [formdata,setformdata]=useState({
        firstname:'',
        lastname:'',
        contact:'',
        email:'',
        password:'',
        confirmpassword:''
    });
    const [accounttype,setaccounttype]=useState(Account_type.student);
    const {firstname,lastname,email,password,confirmpassword,contact}=formdata;
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const {signupdata}=useSelector(state=>state.auth);
    function changehandler(e){
        setformdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault()

        if (password !== confirmpassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        dispatch(setloading(true));
        const userData={
            ...formdata,
            accounttype
        }
        //console.log(userData);
        dispatch(setsignupdata(userData));
        //console.log(signupdata);
        dispatch(sendotp(email,navigate,userData));

        setformdata(()=>({
            firstname:'',
            lastname:'',
            contact:'',
            email:'',
            password:'',
            confirmpassword:''
        }));
        setaccounttype(Account_type.student);


    }
    const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: Account_type.student,
        },
        {
          id: 2,
          tabName: "Instructor",
          type: Account_type.instructor,
        },
      ]
  return (
    <>
    <Tab tabData={tabData} field={accounttype} setField={setaccounttype} />
    <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstname"
              value={firstname}
              onChange={changehandler}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastname"
              value={lastname}
              onChange={changehandler}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={changehandler}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Contact <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="contact"
            value={contact}
            onChange={changehandler}
            placeholder="Enter contact number"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
     
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={changehandler}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] ${showPassword?'bg-white text-black':'bg-richblack-800 text-richblack-5'} p-[12px] pr-10 `}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              value={confirmpassword}
              onChange={changehandler}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem]  p-[12px] pr-10 ${showConfirmPassword?'bg-white text-black':'bg-richblack-800 text-richblack-5'}`}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
        </form>
    </>
  )
}

export default SignupForm