import React, { useEffect,useState } from 'react';

import {useSelector,useDispatch} from 'react-redux';
import { fetchInstructorCourse,deleteCourse } from '../../../../services/operations/course';
import { VscAdd } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import IconBtn from '../../../common/IconBtn';
import {useNavigate} from 'react-router-dom';
import dateformatter from '../../../../utils/dateformatter';
import { Publish_type } from '../../../../utils/constant';
import ConfirmationModal from '../../../common/Modal';
import { setEditcourse } from '../../../../Slicer/courseSlicer';

const Coursediv = () => {
    const {token}=useSelector(state=>state.auth);
    const [courses,setcourses]=useState(null)
    const dispatch=useDispatch();
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();
    const TRUNCATE_LENGTH=30;
    const [ConfirmationModals,setConfirmationModals]=useState(null)
    const fetchcourse=async()=>{
        setloading(true)
        try{
            const res=await fetchInstructorCourse(token);
            dispatch(setcourses(res));
            
        }
        catch(error){
            console.log(error)
        }
        setloading(false);
    }
    const handleCourseDelete=async(courseid)=>{
        try{
            const deleteres=await deleteCourse({courseid},token);
            const res=await fetchInstructorCourse(token);
            if(res){
                setcourses(res)
            }
            setConfirmationModals(null);
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchcourse()
    },[]);
    if(loading){
      return (
        <div className="grid flex-1 place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
  return (
    <><div className='w-full flex flex-col justify-center items-center mt-5 max-md:mr-2 '>
      <div className="mb-14 flex items-center justify-between w-11/12 ">
        <h1 className="text-3xl max-[490px]:text-[1.4rem]  font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          
          onclick={() => navigate("/dashboard/addcourse")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      <div className="rounded-xl border border-richblack-800 min-[470px]:w-11/12 w-full ">
        <div className='md:block hidden'>
          <div className="flex gap-10 rounded-t-md border-b border-b-richblack-800 px-6  py-2 ">
            <div className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </div>
            <div className="flex-2 text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </div>
            <div className="flex-2 text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </div>
            <div className="flex-2 text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </div>
          </div>
        </div>
        <div className=''>
        {courses?.length === 0 ? (
            <div >
              <div className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </div>
            </div>
          ) : (
            courses?.map((course) => (
              <div
                key={course._id}
                className="flex md:flex-row flex-col gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <div className="flex lg:flex-row flex-col flex-1 gap-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className=" aspect-[4/3]  md:w-[17rem] w-full rounded-lg object-cover"
                  />
                  <div className="flex flex-col lg:justify-between max-lg:gap-2">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.title}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.description.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.description
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.description}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {dateformatter(course.createdAt)}
                    </p>
                    {course.status === Publish_type.draft || !course.status  ? (
                      <p className="mt-1 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="mt-1 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex gap-12 max-md:justify-between max-md:items-center max-md:mt-5'>
                <div className="text-sm  font-medium text-richblack-100">
                  2hr 30min
                </div>
                <div className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </div>
                <div className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/editcourse/${course._id}`)
                    }}
                    title="Edit"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 className='min-[470px]:text-lg text-base' />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModals({
                        text1: "Do you want to delete this course?",
                        text2:"All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModals(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line className='min-[470px]:text-lg text-base' />
                  </button>
                </div>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
        {ConfirmationModals && <ConfirmationModal modalData={ConfirmationModals}/>}
    </div>
      
    </>
  )
}

export default Coursediv