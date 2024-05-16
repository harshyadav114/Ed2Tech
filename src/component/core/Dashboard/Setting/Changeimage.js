import React from 'react';
import { useSelector,useDispatch } from "react-redux";
import { useRef,useState } from 'react';
import IconBtn from '../../../common/IconBtn';
import { FiUpload } from "react-icons/fi";
import {profileimageUpdate} from '../../../../services/operations/setting';

const Changeimage = () => {
const { user } = useSelector((state) => state.profile);
const dispatch=useDispatch();
const fileref=useRef();
const [preview,setpreview]=useState();
const [loading,setloading]=useState(false);
const [image,setimage]=useState()

const handleclick = () =>{
  fileref.current.click();
}
const handlefilechange = (e) =>{
  //console.log(e);
  const file=e.target.files[0];
  if(file){
    setimage(file);
    previewimg(file)
  }
}
const previewimg = (file) =>{
  const reader=new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = ()=>{
    //console.log(reader.result);
    setpreview(reader.result);
  }
  
}
const handleFileUpload=async()=>{
    try{
      setloading(true);
      const formdata=new FormData();
      formdata.append("profileimage",image);
      //console.log(formdata);
      //console.log(user.token)
      dispatch(profileimageUpdate(user?.token,formdata)).then(()=>setloading(false));

    }catch(error){
      setloading(false);
      console.log("ERROR MESSAGE - ", error.message)
    }
}
  return (
    <div className="flex flex-col gap-2 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-5 lg:px-12 sm:px-6 px-2 text-richblack-5">
        <div className='flex w-full items-center sm:gap-4 gap-2'>
        <div className="aspect-square sm:w-[70px] w-[50px] min-w-[40px] rounded-full  border-richblack-600 flex items-center justify-center ">
          <img
              src={preview || user?.image}
              alt={`profile-${user?.firstname}`}
              className="aspect-square sm:w-[78px] w-[55px] rounded-full object-cover "
            />
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-clamphead'>Change Profile Picture</p>
          <div className='flex gap-3'>
              <input type='file' ref={fileref} onChange={handlefilechange} className='hidden' accept='image/png,image/jpg,image/gif,image/jpeg' >

              </input>
              <button onClick={handleclick} className=' text-clamphead cursor-pointer rounded-md bg-richblack-700 py-2 lg:px-9 sm:px-7 px-3 font-semibold text-richblack-50' disabled={loading}>Select</button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-clamphead text-richblack-900" />
                )}
              </IconBtn>
          </div>
        </div>
        <div>
            <div></div>
            <div>
                
            </div>
        </div>

        </div>
    </div>
  )
}

export default Changeimage