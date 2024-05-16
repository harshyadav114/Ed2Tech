import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import dateformatter from "../../../utils/dateformatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <>
    <div className='flex flex-col w-full h-[calc(100vh - 3.5rem)]  justify-center relative'>
      <h1 className="text-3xl font-medium text-richblack-5 absolute top-6 left-10">
        My Profile
      </h1>
      <div className='flex flex-col lg:w-[67%] gap-6 mt-24 lg:ml-40 w-[90%] mx-auto '>
      
      <div className="flex flex-col gap-2 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-5 lg:px-12 sm:px-6 px-3">
        
        <div className='flex w-full items-center justify-between'>
        <div className="aspect-square sm:w-[90px] w-[60px] rounded-full border-b-2 border-richblack-600 flex items-center justify-center ">
          <img
              src={user?.image}
              alt={`profile-${user?.firstname}`}
              className="aspect-square sm:w-[78px] w-[55px] rounded-full object-cover "
            />
        </div>
          <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          className=''
        >
          <RiEditBoxLine />
        </IconBtn>
        </div>
          <div className="space-y-1">
            <p className=" capitalize text-clamphead font-semibold text-richblack-5">
              {user?.firstname + " " + user?.lastname}
            </p>
            <p className=" text-clamplight text-richblack-300">{user?.email}</p>
          </div>
        
        
      </div>
      <div className=" flex flex-col sm:gap-2 gap-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-5 lg:px-12 sm:px-6 px-3">
        <div className="flex w-full items-center justify-between">
          <p className=" text-clamphead font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionaldetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-clamplight font-medium capitalize`}
        >
          {user?.additionaldetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="flex flex-col gap-7 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-5 lg:px-12 sm:px-6 px-3">
        <div className="flex w-full items-center justify-between">
          <p className="text-clamphead font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between sm:flex-row flex-col ">
          <div className="text-clamplight flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-richblack-600">First Name</p>
              <p className=" font-medium text-richblack-5 capitalize">
                {user?.firstname}
              </p>
            </div>
            <div>
              <p className="mb-2  text-richblack-600">Email</p>
              <p className=" font-medium text-richblack-5 ">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-richblack-600">Gender</p>
              <p className=" font-medium text-richblack-5 capitalize">
                {user?.additionaldetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 text-clamplight">
            <div>
              <p className="mb-2  text-richblack-600">Last Name</p>
              <p className=" font-medium text-richblack-5 capitalize">
                {user?.lastname}
              </p>
            </div>
            <div>
              <p className="mb-2  text-richblack-600">Phone Number</p>
              <p className=" font-medium text-richblack-5">
                {user?.additionaldetails?.contact ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2  text-richblack-600">Date Of Birth</p>
              <p className="font-medium text-richblack-5 capitalize">
                {dateformatter(user?.additionaldetails?.dob) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}