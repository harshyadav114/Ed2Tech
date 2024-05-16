import React from "react";
import ContactForm from '../component/common/ConstactForm';
import ContactDetails from "../component/core/Contact/ContactDetails";
import Reviewslider from "../component/common/Reviewslider";
import Navbar from "../component/common/Navbar";
import Footer from "../component/common/Footer";

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        
        <div className="lg:w-[60%]">
          <ContactForm flag={true} />
        </div>
      </div>
        <Reviewslider></Reviewslider>
        <Footer/>
    </div>
  )
}

export default Contact