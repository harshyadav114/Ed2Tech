import { apiconnector } from '../Apiconnector';
import {toast} from 'react-hot-toast';
import {catalogData} from '../Apiendpoints';

const {
    CATALOGPAGEDATA_COURSE_API,
    CATALOGPAGEDATA_API
}=catalogData

export const getCategoryCoursePage=async(formdata)=>{
    let course={};
    try{
        course=await apiconnector('POST',CATALOGPAGEDATA_COURSE_API,formdata);
        //console.log(course?.data?.data);
       
    }catch(error){
        console.log("CATALOGPAGEDATA_COURSE_API API ERROR............", error)
    }
    return course?.data;
}

export const getCategory=async()=>{
    let response=[];
    try{
        response=await apiconnector('GET',CATALOGPAGEDATA_API);
        console.log(response?.data?.data);
        
    }catch(error){
        console.log("CATALOGPAGEDATA_COURSE_API API ERROR............", error)
        
    }
    return response?.data?.data;
}