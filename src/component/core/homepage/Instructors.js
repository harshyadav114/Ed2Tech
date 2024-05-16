import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png";
import CodeblockSide from './CodeblockSide';

const Instructors = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-20px_-20px_0_0] "
            />
          </div>
          <CodeblockSide 
                            heading1={'Become an'}
                            gradtext={'instructor'}
                            para={"Instructors from around the world teach millions of students on Edulity. We provide the tools and skills to teach what you love."}
                            button1={
                                {
                                    active:true,
                                    to:'/signup',
                                    text:'Continue Lesson',
                                    arrow:true

                                }
                            }
                    />
        </div>
    </div>
  )
}

export default Instructors