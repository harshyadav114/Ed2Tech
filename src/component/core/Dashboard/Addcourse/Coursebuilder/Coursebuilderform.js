import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { setCourse,setStep,setEditcourse } from '../../../../../Slicer/courseSlicer';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
import Nestedview from './Nestedview';
import { MdNavigateNext } from "react-icons/md";
import {
    addSection,
    editSection,
} from '../../../../../services/operations/course';
import {toast} from 'react-hot-toast'

const Coursebuilderform = () => {
    const {course,editsec}=useSelector(state=>state.course);
    const {token}=useSelector(state=>state.auth);
    const [editSectionname,seteditSectionname]=useState(null);
    const [loading,setloading]=useState(false);
    const dispatch=useDispatch();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },

    }=useForm();

    const onSubmit=async(data)=>{

        if(editSectionname){
            setloading(true);
            const result=await editSection({title:data.sectionName,courseid:course._id,sectionid:editSectionname},token);
            //console.log(result);
            dispatch(setCourse(result));
            setValue('sectionName','')
            seteditSectionname(null)
            setloading(false);
        }
        else{
            setloading(true);
            const result=await addSection({title:data.sectionName,courseid:course._id},token);
            //console.log(result);
            dispatch(setCourse(result));
            setValue('sectionName','')
            seteditSectionname(null)
            setloading(false);
        }
    }
    const cancelEdit=()=>{
        seteditSectionname(null)
        setValue('sectionName','')
    }
    const goBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditcourse(true))
    }
    const goToNext=()=>{
        if (course?.section.length === 0) {
            toast.error("Please add atleast one section")
            return
          }
          if (
            course?.section.some((section) => section.subsection.length === 0)
          ) {
            toast.error("Please add atleast one lecture in each section")
            return
          }
          dispatch(setStep(3))
    }
    const handleEditSectionName=(sectionid,sectionname)=>{
        if(sectionid===editSectionname){
            cancelEdit();
            return
        }
        setValue('sectionName',sectionname);
        seteditSectionname(sectionid);
    }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
            <IconBtn
               text={editSectionname ? "Edit Section Name" : "Create Section"}
               disabled={loading}
               type='submit'
               outline={true}
            >
                <IoAddCircleOutline size={20} className="text-yellow-50" />
            </IconBtn>
            {editSectionname && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
        </form>

        {
            course?.section?.length>0 && <Nestedview handleEditSectionName={handleEditSectionName}/>
        }

        <div className="flex justify-end gap-x-3">
            <button
            onClick={goBack}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
            Back
            </button>
            <IconBtn disabled={loading} text="Next" onclick={goToNext}>
            <MdNavigateNext />
            </IconBtn>
        </div>
    </div>
  )
}

export default Coursebuilderform