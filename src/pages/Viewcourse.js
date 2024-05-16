import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom";
import VideoDetailsSidebar from "../component/core/viewcourse/VideoDetailsSidebar";
import CourseReviewModal from "../component/core/viewcourse/CourseReviewModal";
import { getUserEnrolledCourses } from "../services/operations/course";
import {
    setEntireCourseData,
    setCourseSectionData,
    setTotalNoOfLectures,
    setCompletedLectures,
} from '../Slicer/viewCourseSlicer';


export default function Viewcourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false);
  const[loading,setloading]=useState(false);


  const getCourseDetail=async()=>{
    setloading(true)
    try{
        const coursedata=await getUserEnrolledCourses(token);
        const course=coursedata?.course?.filter((cour)=>cour._id===courseId)[0];
        
        const section=course?.section;
        const totallecture=course?.section?.reduce((acc,sec)=>{ return acc+=sec?.subsection?.length},0);
        const completevideo=coursedata?.courseprogress?.filter((cour)=>cour?.course===courseId)[0]?.completedvideos;
        //console.log(section)

        dispatch(setEntireCourseData(course));
        dispatch(setCourseSectionData(section));
        dispatch(setTotalNoOfLectures(totallecture));
        dispatch(setCompletedLectures(completevideo));
        
        
    }catch(error){
        console.log(error);
    }
    setloading(false)
  }

  useEffect(()=>{
    getCourseDetail();
  },[]);

  if(loading){
    return(
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
    )
  }


  return (
    <>
      <div className="relative flex md:flex-row flex-col-reverse h-screen w-screen max-md:justify-between ">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className=" flex flex-col justify-center mx-auto w-full lg:w-[80%] aspect-auto lg:px-10  px-5 ">
            <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}