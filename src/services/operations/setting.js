import {settingsEndpoints} from '../Apiendpoints';
import {apiconnector} from '../Apiconnector'
import {toast} from 'react-hot-toast';
import { setuser } from '../../Slicer/profileSlicer';
import {logout} from '../operations/auth'

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
}=settingsEndpoints

export const profileimageUpdate=(token,formdata)=>{
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            const response=await apiconnector("POST",UPDATE_DISPLAY_PICTURE_API,formdata,
            {
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`,
            });
            //console.log(response);
            toast.success("Display Picture Updated Successfully");
            dispatch(setuser(response.data.updatedUser))
        }catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
            toast.error(error.message)
        }
        toast.dismiss(toastId)
    }
}

export const updateProfile=(token,formdata)=>{
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            //console.log(formdata)
            const response=await apiconnector("POST",UPDATE_PROFILE_API,formdata,
            {
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`,
            });
            //console.log(response);
            toast.success("Profile Updated Successfully");
            dispatch(setuser(response.data.userupdt))
        }catch(error){
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
            toast.error(error.message)
        }
        toast.dismiss(toastId)
    }
}

export const changePassword=async(token,formdata)=>{
    
        const toastId = toast.loading("Loading...")
        try{
            const response=await apiconnector("POST",CHANGE_PASSWORD_API,formdata,
            {
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`,
            });
            //console.log(response);
            toast.success("Password Updated Successfully");
        }catch(error){
            console.log("CHANGE_PASSWORD_API ERROR............", error)
            toast.error("Could Not Update Password")
            toast.error(error.message)
        }
        toast.dismiss(toastId)
    
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiconnector("POST", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        //console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }