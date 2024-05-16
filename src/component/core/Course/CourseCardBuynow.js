import React, { useEffect } from 'react';
import copy from "copy-to-clipboard";
import {toast} from 'react-hot-toast';
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {buycarddata} from '../../../data/Buycard'

const CourseCardBuynow = ({course,buynow,addToCart,getCourselength,duration}) => {
  const {user}=useSelector(state=>state.profile);
  const navigate=useNavigate();

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
}

useEffect(()=>{
  console.log(course,"   ",buynow)
},[])
  return (
    
        <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 `}
      >
        
        <img
          src={course?.thumbnail}
          alt={course?.title}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {course?.price}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton"
              onClick={
                user && course?.studenenrolled?.includes(user?._id)
                  ? () => navigate("/dashboard/enrolledcourses")
                  : ()=>buynow()
              }
            >
              {user && course?.studenenrolled?.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studenenrolled?.includes(user?._id)) && (
              <button onClick={()=>addToCart()} className="blackButton">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {buycarddata.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    {i===0?<span>{`${duration.hour || 0}h ${duration.minute|| 0}m ${duration.second ||0}s `} {item}</span>:<span>{item}</span>}
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseCardBuynow;