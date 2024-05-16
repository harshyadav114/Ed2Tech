import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {useSelector,useDispatch} from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import { setCourse } from '../../../../../Slicer/courseSlicer';
import {toast} from 'react-hot-toast';
import { addSubSection,editSubSection } from '../../../../../services/operations/course';



const SubsectionModal = ({modal,setmodal,add=false,view=false,edit=false}) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    }=useForm();

    const [loading,setloading]=useState(false);
    const {token}=useSelector(state=>state.auth);
    const {course}=useSelector(state=>state.course);
    const dispatch=useDispatch();
    const[duration,setduration]=useState(false)

    useEffect(()=>{
        if(view || edit){
            setValue('lectureTitle',modal.title);
            setValue('lectureDesc',modal.description);
            setValue('lectureVideo',modal.videourl);
        }
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
          currentValues.lectureTitle !== modal.title ||
          currentValues.lectureDesc !== modal.description ||
          currentValues.lectureVideo !== modal.videourl
        ) {
          return true
        }
        return false
      }

      const handleEditSubsection = async () => {
        const currentValues = getValues();
        //console.log(currentValues)
        const formData = new FormData()
        formData.append("sectionid", modal.sectionid)
        formData.append("subsectionid", modal._id)
        if (currentValues.lectureTitle !== modal.title) {
          formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modal.description) {
          formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modal.videourl) {
          formData.append("video", currentValues.lectureVideo);
          formData.append('timeduration',duration);
        }
        setloading(true)
        //console.log('good')
        const result = await editSubSection(formData, token);
        //console.log(result)
        if (result) {
          
          const updatedCourseContent = course.section.map((section) =>
            section._id === modal.sectionid ? result : section
          )
          const updatedCourse = { ...course, section: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setmodal(null)
        setloading(false)
      }
    
      const onSubmit = async (data) => {
        //console.log(data);
        if (view) return
        
        if (edit) {
          if (!isFormUpdated()) {
            toast.error("No changes made to the form")
          } else {
            handleEditSubsection()
          }
          return
        }
    
        const formData = new FormData()
        formData.append("sectionid", modal)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        formData.append('timeduration',duration);

        setloading(true)
        const result = await addSubSection(formData, token);
        //console.log(result);
        if (result) {
          // update the structure of course
          const updatedCourseContent = course.section.map((sec) =>
            sec._id === modal ? result : sec
          )
          //console.log(updatedCourseContent)
          const updatedCourse = { ...course, section: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setmodal(null)
        setloading(false)
      }
      useEffect(()=>{
        //console.log(course);
      },[course])

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-800 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => setmodal(null)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
            <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modal.videourl : null}
            editData={edit ? modal.videourl : null}
            setduration={setduration}
          />
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
        </div>
    </div>
  )
}

export default SubsectionModal