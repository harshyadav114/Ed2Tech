import React from 'react';
import Template from '../component/core/Auth/Template';
import signupImg from '../assets/Images/signup.webp'
import Navbar from '../component/common/Navbar';

const Signup = () => {
  return (
    <>
      <Navbar></Navbar>
      <Template
        heading={'Join the millions learning to code with StudyNotion for free'}
        para={'Build skills for today, tomorrow, and beyond.'}
        cursive={'Education to future-proof your career.'}
        formtype={'signup'}
        img={signupImg}
    />
    </>
    
  )
}

export default Signup