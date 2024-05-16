import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx";
import {deleteSection,deleteSubSection} from '../../../../../services/operations/course';
import { setCourse } from '../../../../../Slicer/courseSlicer';
import { useEffect,useRef } from 'react';
import SubsectionModal from './SubsectionModal';
import ConfirmationModal from '../../../../common/Modal';

const Nestedview = ({handleEditSectionName}) => {
    const dispatch=useDispatch();
    const {course}=useSelector(state=>state.course);
    const {token}=useSelector(state=>state.auth);
    const [modal,setmodal]=useState(null);
    const [loading,setloading]=useState(false);
    const [addSubSection,setAddSubsection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);
    const [ConfirmationModals,setConfirmationModals]=useState(null);
    const ref=useRef();
   
    const handleDeleteSection=async(id)=>{
        setloading(true);
        const response=await deleteSection({sectionid:id,courseid:course._id},token);
        //console.log(response);
        if(response){
            dispatch(setCourse(response));
        }
        setloading(false);
        setmodal(null);
    }
    useEffect(()=>{
        //console.log(course)
        if(ref.current){
          //console.log(ref.current)
        }
    },[course]);
    const handleDeleteSubSection=async(sectionid,subsectionid)=>{
        setloading(true);
        //console.log('deletesubsec')
        const response=await deleteSubSection({sectionid,subsectionid},token);
        //console.log(response);
        if(response){
          const updatedsection=course?.section.map((sec)=>(
            sec._id===sectionid ? response : sec
          ));
          const updatedcourse={...course,section:updatedsection};
          //console.log(updatedcourse)
          dispatch(setCourse(updatedcourse))
        }
        setConfirmationModals(false);
        setloading(false);
    }
  return (
    <>
    <div className="rounded-lg bg-richblack-700 py-4 px-8">
        {
            course?.section?.map((sec,ind)=>(
                <details key={sec?._id} open={ind===0} ref={ref} >
                    <summary className={`flex cursor-pointer items-center justify-between ${!(ind===course?.section?.length-1) && ref.current?ref.current.target?.open && 'border-b-2':'' } border-b-richblack-600 py-3`}>
                        <div className="flex items-center gap-x-3">
                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                            <p className="font-semibold text-richblack-50">
                            {sec.title}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <button
                                onClick={()=>handleEditSectionName(sec._id,sec.title)}
                            >
                            <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            <button
                                onClick={()=>{
                                    setmodal({
                                        text1:'Delete this Section?',
                                        text2:'All the lectures in this section will be deleted',
                                        btn1Text:'Delete',
                                        btn2Text:'Cancel',
                                        btn1Handler:() => handleDeleteSection(sec._id),
                                        btn2Handler:()=>{setmodal(null)}
                                    }
                                    )
                                }}
                            >
                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                            <span className="font-medium text-richblack-300"></span>
                            <span className="font-medium text-richblack-300">|</span>
                            <AiFillCaretDown className={`text-xl text-richblack-300`} />
                        </div>
                        </summary>
                        <div className="px-6 pb-4">
            
              {sec?.subsection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionid: sec._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModals({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                          handleDeleteSubSection(sec._id,data._id),
                          btn2Handler: () => setConfirmationModals(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
        
              <button
                onClick={() => setAddSubsection(sec._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
                </details>
            ))
        }
        
        
    </div>
    {addSubSection ? (
        <SubsectionModal
          modal={addSubSection}
          setmodal={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubsectionModal
          modal={viewSubSection}
          setmodal={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubsectionModal
          modal={editSubSection}
          setmodal={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
    {modal ? <ConfirmationModal modalData={modal}/>:<></>}
    {ConfirmationModals ? <ConfirmationModal modalData={ConfirmationModals}/>:<></>}
    </>
  )
}

export default Nestedview