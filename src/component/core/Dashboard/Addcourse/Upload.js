import React,{ useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  setduration
}) {
    const [previewsource,setpreviewsource]=useState(viewData?viewData:editData?editData:'');
    const [selectedFile, setSelectedFile] = useState(null);
    const onDrop=(acceptedfiles)=>{
        const file = acceptedfiles[0];
        //console.log(file);
        
        if (file) {
        previewFile(file)
        setSelectedFile(file)
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept: {
            'image/*': ['.png','.jpeg','.jpg','.gif'],
            'video/*': ['.mp4', '.mkv'],
          }})
    const previewFile=(file)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setpreviewsource(reader.result);
            const videoElement = document.createElement('video');
            videoElement.src = reader.result;

            videoElement.onloadedmetadata = () => {
              console.log(videoElement.duration.toFixed(0))
              setduration(videoElement.duration.toFixed(0));
            };
            
        }
    }

    useEffect(()=>{
        register(name,{required:true})
    },[register]);

    useEffect(()=>{
        setValue(name,selectedFile);
    },[selectedFile,setValue]);
    const videoref=useRef();
   
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
            {previewsource?
            (
                <div className="flex w-full flex-col p-6 items-center">
                {!video ? (
                  <img
                    src={previewsource}
                    alt="Preview"
                    className="h-full w-full max-w-[300px] rounded-md object-cover"
                  />
                ) : (
                  <Player aspectRatio="16:9" playsInline src={previewsource} ref={videoref} />
                )}

                {!viewData && (
                    <button
                    type="button"
                    onClick={() => {
                      setpreviewsource("")
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    className="mt-3 text-richblack-400 underline"
                  >
                    Cancel
                  </button>
                )}
                </div>
            )
            :
            (
                <div
                    className="flex w-full flex-col items-center p-6"
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                    <FiUploadCloud className="text-2xl text-yellow-50" />
                    </div>
                    <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                    Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                    <span className="font-semibold text-yellow-50">Browse</span> a
                    file
                    </p>
                    <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                    <li>Aspect ratio 16:9</li>
                    <li>Recommended size 1024x576</li>
                    </ul>
                </div>
                )}
            </div>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required
                </span>
            )}
            </div>
  )
};
