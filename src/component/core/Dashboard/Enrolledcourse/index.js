import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../../services/operations/course";
import CoursedurationProgress from "./CoursedurationProgress";
import getduration from "../../../../utils/getduration"

export default function EnrollCourse() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      //console.log(res)
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <div className="w-full 2xl:max-w-maxContent max-w-maxtab px-5 max-[450px]:px-1 min-w min flex flex-col mt-5 max-md:mr-2 mx-auto">
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses?.course ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses?.course?.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5 ">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="min-[480px]:w-[45%] px-5 py-3">Course Name</p>
            <p className="min-[480px]:w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses?.course?.map((courses, i, arr) => (
            <div
              className={`flex sm:items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] max-sm:flex-col max-sm:items-start cursor-pointer items-center gap-4 max-sm:gap-2 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/viewcourse/${courses?._id}/section/${courses.section?.[0]?._id}/subsection/${courses.section?.[0]?.subsection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={courses.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{courses.title}</p>
                  <p className="text-xs text-richblack-300">
                    {courses.description.length > 50
                      ? `${courses.description.slice(0, 50)}...`
                      : courses.description}
                  </p>
                </div>
              </div>
              <CoursedurationProgress courses={courses} enrolledCourses={enrolledCourses}/>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}