import React from 'react';
import Highlightext from './Highlightext';
import Button from '../../common/Button';
import { FaArrowRight } from 'react-icons/fa6';

const CodeblockSide = ({heading1,gradtext,heading2,para,button1,button2}) => {
  return (
    <div className='lg:w-[40%] w-[100%]'>
        <h1 className='text-4xl font-semibold'>
            {heading1}
            <Highlightext text={gradtext}/>
            {" "}{heading2}
        </h1>
        <p className="text-richblack-300 text-base font-bold mt-3 max-w-full">
            {para}
        </p>

        <div className='flex gap-5 mt-10'>
        <Button active={button1.active} to={button1.to} arrow={button1.arrow}>{button1.text}</Button>
        {button2 && <Button active={button2.active} to={button2.to}>{button2.text}</Button>}
        </div>
        
    </div>
  )
}

export default CodeblockSide