import React from 'react';
import {useSelector} from 'react-redux'
import { FaCheck } from "react-icons/fa";
import Courseinfos from './Courseinfo/Courseinfo';
import Coursebuilderform from './Coursebuilder/Coursebuilderform';
import PublishCourse from './publish/Publish';
const RenderSteps = () => {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
        id: 1,
        title: "Course Information",
        },
        {
        id: 2,
        title: "Course Builder",
        },
        {
        id: 3,
        title: "Publish Here",
        },
    ]

  return (
    <>
        <div className="relative mb-2 flex w-full max-w-[800px] justify-center">
        {steps.map((item,index) => (
          <>
            <div
              className="flex flex-col items-center "
              key={index}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full max-w-[800px] select-none justify-between">
        {steps.map((item,ind) => (
          <>
            <div
              className="flex flex-col max-md:min-w-[50px] max-xl:min-w-[200px] xl:min-w-[150px] 2xl:min-w-[190px]  items-center gap-y-2"
              key={ind}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      {step === 1 && <Courseinfos />}
      {step === 2 && <Coursebuilderform />}
      {step === 3 &&  <PublishCourse /> }
    </>
  )
}

export default RenderSteps