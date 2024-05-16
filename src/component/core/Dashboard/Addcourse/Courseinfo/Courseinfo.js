import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';
import { fetchcategories } from '../../../../../services/operations/course';
import Chips from './Chips';
import RequirementsField from './Requirement';
import Upload from '../Upload';
import {useSelector,useDispatch} from 'react-redux';
import { setStep,setCourse,setEditcourse } from '../../../../../Slicer/courseSlicer';
import IconBtn from '../../../../common/IconBtn';
import { MdNavigateNext } from "react-icons/md";
import {createCourse,editCoursedetails} from '../../../../../services/operations/course' 

const Courseinfos = () => {
    const {editcourse,course,editsec}=useSelector(state=>state.course);
   
    const {token}=useSelector(state=>state.auth)
    const dispatch=useDispatch();
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState:{errors}
    }=useForm();
    const [categories,setcategories]=useState([]);
    const [loading,setloading]=useState(false);
    useEffect(()=>{
      console.log(editcourse)
        const getcategories=async()=>{
            setloading(true);
            try{
                const response=await fetchcategories();
                setcategories(response)
                //console.log(categories);
            }catch(error){
                toast.error(error.message)
            }
            setloading(false)
        }
        getcategories();
        if(editcourse){
          
          setValue("courseTitle", course.title)
          setValue("courseDesc", course.description)
          setValue("coursePrice", course.price)
          setValue("courseTags", course.tags)
          setValue("courseBenefits", course.whatyouwilllearns)
          setValue("courseCategory", course.category)
          setValue("courseRequirement", course.instructions)
          setValue("courseImage", course.thumbnail)
          const val=getValues();
         
        }
    },[])

    const formupdated=()=>{
        const value=getValues();
        
        if(
          course.title!==value.courseTitle ||
          course.description!==value.courseDesc ||
          course.price!==value.coursePrice ||
          course.category!==value.courseCategory ||
          course.tags.toString()!==value.courseTags.toString() ||
          course.instructions.toString()!==value.courseRequirement.toString() ||
          course.whatyouwilllearns.toString()!==value.courseBenefits.toString() ||
          course.thumbnail!==value.courseImage
        ){
          return true
        }
        return false
    }
    const onsubmit=async(data)=>{
      if(editcourse){
         
        if(formupdated()){
        
          const value=getValues();
          const formdata=new FormData();
          formdata.append("courseid", course._id);
          if(course.title!==value.courseTitle){
            formdata.append('title', data.courseTitle)
          }
          if(course.description!==value.courseDesc){
            formdata.append('description', data.courseDesc)
          }
          if(course.price!==value.coursePrice){
            formdata.append('price', data.coursePrice)
          }
          if(course.category!==value.courseCategory){
            formdata.append('category', data.courseCategory)
          }
          if(course.tags.toString()!==value.courseTags.toString()){
            formdata.append('tags', JSON.stringify(data.courseTags))
          }
          if(course.whatyouwilllearns.toString()!==value.courseBenefits.toString()){
            formdata.append('whatyouwilllearns', JSON.stringify(data.courseBenefits))
          }
          if(course.instructions.toString()!==value.courseRequirement.toString()){
            formdata.append('instructions', JSON.stringify(data.courseRequirement))
          }
          if(course.thumbnail!==value.courseImage){
            formdata.append('thumbnail', data.courseImage);
          }

          setloading(true)
          const result = await editCoursedetails(formdata, token)
          setloading(false)
          if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
          }
        }
        else{
          toast.error("No changes made to the form")
        }
        return
      }

      const formdata=new FormData();
      formdata.append('title', data.courseTitle)
      formdata.append('description', data.courseDesc)
      formdata.append('price', data.coursePrice)
      formdata.append('category', data.courseCategory)
      formdata.append('tag', JSON.stringify(data.courseTags))
      formdata.append('whatyouwilllearn', JSON.stringify(data.courseBenefits))
      formdata.append('instruction', JSON.stringify(data.courseRequirement))
      formdata.append('thumbnail', data.courseImage);
      setloading(true);
      const response=await createCourse(formdata,token);
      
      if(response){
        dispatch(setStep(2));
        dispatch(setCourse(response))
      }
      setloading(false)
    }
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-6 p-4 max-w-[800px] "
    >
        <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-sm text-richblack-5">Course Title <sup className="text-pink-200">*</sup></label>
            <input type="text"
                id='title'
                placeholder='Enter Course Title'
                {...register('courseTitle',{required:true})}
                className="form-style w-full"
            />
            {
                errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor="desc" className="text-sm text-richblack-5">Course Short Description <sup className="text-pink-200">*</sup></label>
            <textarea
                id='desc'
                placeholder='Enter Description'
                {...register('courseDesc',{required:true})}
                className="form-style resize-x-none min-h-[130px] w-full"
            />
            {
                errors.courseDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course description is required
                    </span>
                )
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="text-sm text-richblack-5">Price <sup className="text-pink-200">*</sup></label>
            <div className='relative w-full'><input type="number"
                id='price'
                placeholder='Enter Price'
                {...register('coursePrice',{required:true})}
                className="form-style w-full pl-10"
            />
            <HiOutlineCurrencyRupee className='absolute top-[25%] text-2xl text-richblack-400 left-2'/>
            </div>
            {
                errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Price is required
                    </span>
                )
            }
        </div>

        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled className=' text-richblack-400' >
            Choose a Category
          </option>
          {!loading &&
            categories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
        </div>
        <Chips
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/*upload*/}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editcourse ? course?.thumbnail : null}
      />

      <RequirementsField
        label="Benefits of the course"
        name="courseBenefits"
        placeholder="Enter Benefits of the course"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <RequirementsField
        label="Requirements/Instructions"
        name="courseRequirement"
        placeholder="Enter Instruction of the course"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        inst={true}
      />

        <div className="flex justify-end gap-x-2">
          {editcourse && (
            <button
              onClick={() =>{ dispatch(setStep(2)); dispatch(editsec(true));}}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          <IconBtn
            disabled={loading}
            text={!editcourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
    </form>
  )
}

export default Courseinfos