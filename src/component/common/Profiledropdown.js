import React from 'react';
import { useState,useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link,useNavigate } from 'react-router-dom';
import {logout} from '../../services/operations/auth';
import useOnclickOutside from '../../hooks/useOnclickOutside';
import { useEffect } from 'react';

const Profiledropdown = () => {
  const [open,setopen]=useState(false);
  const {user}=useSelector((state)=> state.profile);
  const [image,setimage]=useState(user?.image)
  const ref=useRef();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    setimage(user?.image)
  },[user])

  useOnclickOutside(ref,()=>setopen(false));
  return (
    <button className="relative" onClick={() => setopen(true)}>
          <div  className="flex items-center gap-x-1">
            <div className='aspect-square w-[30px] rounded-full bg-richblack-700 flex items-center justify-center border-richblack-400 border-[1px] '>
              <img src={image} alt="Profile" className='aspect-square w-[25px] rounded-full object-cover '/>
            </div>
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </div>
          {
            open && <div 
            className="absolute top-[140%] -right-[50%] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
            ref={ref}
            >
            <Link to="/dashboard/myprofile" onClick={() => setopen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setopen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
            </div>
          }
    </button>
  )
}

export default Profiledropdown