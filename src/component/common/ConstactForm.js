import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect,useState } from 'react';
import Countrycode from '../../data/countrycode.json';
import {apiconnector} from '../../services/Apiconnector';
import { contactusEndpoint } from '../../services/Apiendpoints';
import {toast} from 'react-hot-toast'



const ConstactForm = ({flag}) => {
    const [loading,setloading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstname:'',
                lastname:'',
                email:'',
                phone:'',
                message:''
            })
        }
    },[reset,isSubmitSuccessful])

    async function submitcontactform(data){
        const toastid=toast.loading("Loading...");
        try {
            setloading(true);
            const res = await apiconnector(
              "POST",
              contactusEndpoint.CONTACT_US_API,
              data
            )
            //console.log("Email Res - ", res)
            setloading(false);
            toast.success("Form submitted")
          } catch (error) {
            //console.log("ERROR MESSAGE - ", error.message)
            setloading(false)
            toast.error("Form discarded")
          }
          toast.dismiss(toastid)
    }
  return (
    <div className={`w-11/12 max-w-[600px] mx-auto ${flag && 'py-10 px-16 border border-richblack-500 rounded-xl'}  `}>
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 flex justify-center w-full">
            <form onSubmit={handleSubmit(submitcontactform)} className='flex flex-col gap-7'>
                <div className='flex gap-4'>
                    <label className='w-[50%]'>
                        <p className='text-[14px] text-richblack-5 pb-2'>First name</p>
                        <input type="text" name='firstname' placeholder="Enter first name" {...register('firstname',{required:true})} className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none' />
                        {errors.firstname && <span className="-mt-1 text-[12px] text-yellow-100">Please enter your name.</span>}
                    </label>
                    <label className='w-[50%]'>
                        <p className='text-[14px] text-richblack-5 pb-2'>Last name</p>
                        <input type="text" name='lastname' placeholder="Enter last name" {...register('lastname')} className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none' />
                        
                    </label>
                </div>
                
                <label>
                        <p className='text-[14px] text-richblack-5 pb-2'>Email</p>
                        <input type="email" name='email' placeholder="Enter email" {...register('email',{required:true})} className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none' />
                        {errors.email && <span className="-mt-1 text-[12px] text-yellow-100">Please enter your email.</span>}
                </label>

                <label>
                        <p className='text-[14px] text-richblack-5 pb-2'>Phone Number</p>
                        <div className='flex gap-4'>
                            
                            <select name="countrycode" id="countrycode" type='text' {...register("countrycode", { required: true })} className='w-[14%] rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'>
                                   { Countrycode.map((country,ind)=>(
                                        <option key={ind} value={country.code} selected >
                                            <span>{country.code}{' '}</span>
                                            <span>{' '}-{' '}</span>
                                            <span>{' '}{country.country}</span>
                                        </option>

                                    ))
                                   }
                            </select>
                            
                            <input
                                type="number"
                                name="phonenumber"
                                id="phonenumber"
                                placeholder="12345 67890"
                                {...register("phone", {
                                    required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                    },
                                    maxLength: { value: 12, message: "Invalid Phone Number" },
                                    minLength: { value: 10, message: "Invalid Phone Number" },
                                })}
                                className='w-[85%] rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                                />
                                {errors.phone && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        {errors.phone.message}
                                    </span>)}
                        </div>
                </label>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="lable-style">
                    Message
                    </label>
                    <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                    {...register("message", { required: true })}
                    />
                    {errors.message && (
                    <div className="-mt-1 text-[12px] inline  text-yellow-100">
                        Please enter your Message.
                    </div>
                    )}
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
                >
                    Send Message
                </button>

                
            </form>
      </div>
    </div>
  )
}

export default ConstactForm