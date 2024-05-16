import React from 'react';
import { useState,useEffect } from 'react';
import { MdClose } from "react-icons/md";
import {useSelector} from 'react-redux';

const Chips = ({label,name,placeholder,register,errors,setValue,getValues}) => {
    const [chips,setchips]=useState([]);
    const {course,editcourse}=useSelector(state=>state.course)
    function handlekeydown(e){
        //console.log(e);
        
        if(e.code==='Enter' || e.code==="Comma"){
            const newchip=e.target.value.trim();
            e.preventDefault();
            if (newchip && !chips.includes(newchip))
            setchips([...chips,newchip]);
            e.target.value = ""
        }
    }
    function handledeletechip(index){
        const newchip=chips.filter((_,ind)=> ind!==index)
        setchips(newchip);
    }
    useEffect(()=>{
       
        setValue(name,chips)
    },[chips]);
    useEffect(()=>{
      
        if(editcourse){
            setchips(course?.tags)
        }

        register(name,{required: true, validate: (value) => value.length > 0 })
    },[])
  return (
    <div className="flex flex-col space-y-2">
            <label htmlFor={label} className="text-sm text-richblack-5">{label} <sup className="text-pink-200">*</sup></label>
            <input type="text"
                id={label}
                placeholder={placeholder}
                onKeyDown={handlekeydown}
                className="form-style w-full"
            />
            {
                errors.name && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )
            }
            <div className="flex w-full flex-wrap gap-y-2">
               
                {chips.map((chip, index) => (
                <div
                    key={index}
                    className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                >
                    
                    {chip}
                    
                    <button
                    type="button"
                    className="ml-2 focus:outline-none"
                    onClick={() => handledeletechip(index)}
                    >
                    <MdClose className="text-sm" />
                    </button>
                </div>
                ))}
            </div>
        </div>
  )
}

export default Chips