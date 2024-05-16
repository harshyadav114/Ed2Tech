import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";

const Button = ({active,to,children,arrow,onclick}) => {
  return (
    <Link to={to}>
        <div
        className={`text-center text-[0.8rem] sm:text-[1rem] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] flex gap-3 items-center ${
          active ? "bg-yellow-50 text-black " : "bg-richblack-800"
        } hover:shadow-none hover:scale-95 transition-all duration-200 `}
       onClick={onclick}>
        {children}
        <span className='text-[0.5rem] sm:text-[0.65rem]'>{arrow && <FaArrowRight/>}</span>
      </div>
    </Link>
  )
}

export default Button