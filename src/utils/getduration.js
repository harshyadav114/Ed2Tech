import { hourminsec } from "./Minsec";
export default function getduration(course,flag=false){
        let length = 0;
        if(!flag){
        course?.data?.section?.forEach((sec) => {console.log(sec)
            sec?.subsection?.forEach((subsec)=>{
                length += parseInt(subsec?.timeduration)
            })
        })}
        else{
            course?.section?.forEach((sec) => {console.log(sec)
                sec?.subsection?.forEach((subsec)=>{
                    length += parseInt(subsec?.timeduration)
                })
            })
        }
        const lengthres=hourminsec(length);
        return lengthres;
}