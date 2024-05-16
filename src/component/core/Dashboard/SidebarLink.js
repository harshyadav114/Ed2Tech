import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Icons from "react-icons/vsc";


const SidebarLink = ({icon,name,path}) => {
  const location=useLocation();
  const Icon=Icons[icon];
  const [highlight,sethighlight]=useState(false);
  const matchRoute = () =>{
    if(location.pathname===path){
        sethighlight(true);
    }
    else{
      sethighlight(false);
    }
  }

  useEffect(()=>{
    matchRoute();
  },[location])
  return (
    <>
        <NavLink to={path} className={`relative text-sm py-2 font-medium ${
        highlight
          ? "bg-yellow-800 text-yellow-50 border-l-4 border-l-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}>
          <div className={`flex sm:px-4 px-1 gap-2 items-center mx-2`}>
              <Icon className="text-lg"/>
              <p>{name}</p>
          </div>
        </NavLink>
    </>
  )
}

export default SidebarLink