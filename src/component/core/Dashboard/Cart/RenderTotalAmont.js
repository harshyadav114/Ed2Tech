import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {createorder} from '../../../../services/operations/payment'
import IconBtn from "../../../common/IconBtn"
import { useEffect, useState } from "react"


export default function RenderTotalAmount() {
  const { totalcost, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [courseid,setcourseid]=useState([]);

  useEffect(()=>{
    let arr=[]
    cart?.map((course)=>arr.push({courseId:course._id}));
    //console.log(arr);
    setcourseid(arr)
  },[])

  const buynow=async()=>{
    //console.log(courseid)
    await createorder(token,courseid,user,navigate,dispatch)
  }

  return (
    <div className="min-w-[200px] max-w-maxContent rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {totalcost}</p>
      <IconBtn
        text="Buy Now"
        onclick={buynow}
        customClasses="w-full justify-center"
      />
    </div>
  )
}