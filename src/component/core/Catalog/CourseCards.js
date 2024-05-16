import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/GetAvgRating';
import RatingStar from '../../common/RatingStar';

const CourseCards = ({course,height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(()=>{
        //console.log(course)
        const rating=GetAvgRating(course?.ratingandreview);
        setAvgReviewCount(rating);
    },[course])
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${height} aspect-video w-full rounded-xl object-cover `}
              
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.title}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstname} {course?.instructor?.lastname}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStar Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingandreview?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CourseCards