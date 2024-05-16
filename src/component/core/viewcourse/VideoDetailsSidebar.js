import IconBtn from "../../common/IconBtn"
import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subsectionId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewcourse);

    const sectionOpenhandler=()=>{
        if(!courseSectionData.length){
            return
        }
        const currsectionid=courseSectionData?.filter((sec)=>sec._id===sectionId)[0];
        const currsubsectionid=currsectionid?.subsection?.filter((subsec)=>{return subsec._id === subsectionId})[0];
        setActiveStatus(currsectionid);
        setVideoBarActive(currsubsectionid);
    }
    const onCheckedHandler=(id)=>{
        if(completedLectures.findIndex((lec)=>lec._id===id)){
            return true;
        }
        else{
            return false;
        }
    }
    useEffect(()=>{
        sectionOpenhandler()
    },[location.pathname,courseSectionData,courseEntireData])
  return (
    <>
        <div className="flex md:h-[calc(100vh-3.5rem)] md:min-h-screen md:w-[320px] md:max-w-[350px] md:min-w-[150px] w-full flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            <div className="flex w-full items-center justify-between ">
            <div
                onClick={() => {
                navigate(`/dashboard/enrolledcourses`)
                }}
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                title="back"
            >
                <IoIosArrowBack size={30} />
            </div>
            <IconBtn
                text="Add Review"
                customClasses="ml-auto"
                onclick={() => setReviewModal(true)}
            />
            </div>
            <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} / {totalNoOfLectures}
            </p>
            </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto max-md:w-[80%] max-md:mx-auto">
            {courseSectionData.map((course, index) => (
            <div
                className="mt-2 cursor-pointer text-sm text-richblack-5"
                onClick={() => setActiveStatus(course)}
                key={index}
            >
                
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                    {course?.title}
                </div>
                <div className="flex items-center gap-3">
                    
                    <span
                    className={`${
                        activeStatus._id === course?._id
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                    >
                    <BsChevronDown />
                    </span>
                </div>
                </div>

                
                {activeStatus._id === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                    {course.subsection.map((topic, i) => (
                    <div
                        className={`flex gap-3  px-5 py-2 ${
                        videoBarActive._id === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        } `}
                        key={i}
                        onClick={() => {
                        navigate(
                            `/viewcourse/${courseEntireData?._id}/section/${course?._id}/subsection/${topic?._id}`
                        )
                        setVideoBarActive(topic)
                        }}
                    >
                        <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {onCheckedHandler(topic._id)}}
                        />
                        {topic.title}
                    </div>
                    ))}
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar