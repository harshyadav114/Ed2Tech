import React from 'react';
import Changeimage from './Changeimage';
import Changedetails from './Changedetails';
import Changepassword from './Changepassword';
import Deleteaccount from './Deleteaccount';

const Setting = () => {
  return (
    <div className='w-full relative'>
        <h1 className="text-3xl font-medium text-richblack-5 absolute top-6 left-10">
            Edit Profile
        </h1>

        <div className='flex flex-col lg:w-[67%] gap-6 mt-24 lg:ml-40 w-[90%] mx-auto '>
                <Changeimage/>
                <Changedetails/>
                <Changepassword/>
                <Deleteaccount/>
        </div>
    </div>
    
  )
}

export default Setting