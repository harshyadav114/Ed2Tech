import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import {createorder} from '../../../../services/operations/payment'
import { removefromcart } from "../../../../Slicer/cartSlicer"
import { useNavigate} from 'react-router-dom'

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  return (
    <div className="flex flex-1 flex-col max-w-maxContent min-w-[150px] w-full">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex flex-wrap items-start max-sm:flex-col h-full  ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row ">
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.title}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{course?.ratingandreview?.length}</span>
                <ReactStars
                  count={5}
                  value={course?.ratingandreview?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">
                  {course?.ratingandreview?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:items-center space-y-2 max-sm:flex-row-reverse justify-between max-sm:w-full">
            <button
              onClick={() => dispatch(removefromcart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}