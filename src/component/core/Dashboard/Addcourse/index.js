import { useEffect, useState } from "react"
import RenderSteps from "./RenderSteps";
import {setCourse,setEditcourse,setStep} from '../../../../Slicer/courseSlicer';
import {useSelector,useDispatch} from 'react-redux';

export default function AddCourse() {
  const dispatch=useDispatch();
  const[loading,setloading]=useState(false)
  useEffect(()=>{
    setloading(true)
        dispatch(setCourse(null));
        dispatch(setStep(1));
        dispatch(setEditcourse(false));
        setloading(false)
  },[])

  if(loading){
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <>
      <div className="flex w-full  items-start gap-x-6 lg:mx-20 sm:mx-10 max-sm:mx-3 max-[410px]:mx-2  ">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Course
          </h1>
          <div className="flex-1">
          <RenderSteps />
          </div>
        </div>
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}