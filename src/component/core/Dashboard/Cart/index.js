import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from './RenderTotalAmont'

export default function Cart() {
  const { totalcost, totalitems } = useSelector((state) => state.cart)

  return (
    <>
    <div className="flex flex-col gap-5 max-w-maxContent min-w-[200px] w-3/4 mx-auto mt-10 px-5 ">
      <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-medium text-richblack-5">Cart</h1>
      <div className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalitems} Courses in Cart
      </div>
      </div>
      {totalcost > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-x-32  gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
      </div>
    </>
  )
}