import React,{useEffect,useState} from 'react'
import ProgressBar from "@ramonak/react-progress-bar"
import getduration from '../../../../utils/getduration';
const CoursedurationProgress = ({courses,enrolledCourses}) => {
    const [courseprogpercen,setcourseprogpercen]=useState(null);
    const [duration,setduration]=useState(null)
    useEffect(()=>{
     
      let totalvideos=0;
        courses?.section?.forEach((val)=>{totalvideos+=val?.subsection?.length});
        const progressnumber=enrolledCourses?.courseprogress?.filter((prog)=>prog.course===courses._id)[0];
        const percentage=progressnumber?.completedvideos?.length/totalvideos;
        setcourseprogpercen(percentage*100);
        //console.log(percentage)
        const length=getduration(courses,true);
        //console.log(length)
        setduration(length);
    },[])
  return (
    <>
    <div className="w-1/4 sm:px-2 py-3">{duration?.hour || 0 }h {duration?.minute || 0}m {duration?.second || 0}s</div>
    <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
        <p>Progress: {courseprogpercen || 0}%</p>
        <ProgressBar
          completed={courseprogpercen || 0}
          height="8px"
          isLabelVisible={false}
        />
    </div></>
  )
}

export default CoursedurationProgress