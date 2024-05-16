import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Codeblock = ({code,gradcolor,codeColor}) => {
    
  return (
    
    
    <div className='h-fit code-border flex flex-row py-3 leading-[1.1rem] sm:leading-6 relative w-[100%] lg:w-[40%] bg-transparent '>
        <div className='circle1 lg:w-3/5 lg:h-3/5 w-1/2 h-1/2'></div>
        <div className='text-center flex flex-col w-[10%] min-w-max select-none text-richblack-400 font-inter font-bold text-[0.7rem] sm:text-sm z-10'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={`w-[90%] flex flex-col font-bold font-mono text-[0.7rem] sm:text-sm ${codeColor}`}>
        <TypeAnimation
            sequence={[code, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: 'block'
            }}
            omitDeletionAnimation={true}
          />
        </div>
    </div>
  )
}

export default Codeblock