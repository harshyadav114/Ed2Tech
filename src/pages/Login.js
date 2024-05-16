import React from 'react';
import Template from '../component/core/Auth/Template';
import loginImg from "../assets/Images/login.webp";
import Navbar from '../component/common/Navbar'
const Login = () => {
  return (
    <>
      <Navbar></Navbar>

      <Template
        heading={'Welcome Back'}
        para={'Build skills for today, tomorrow, and beyond.'}
        cursive={'Education to future-proof your career.'}
        formtype={'login'}
        img={loginImg}
    />

    </>
    
  )
}

export default Login