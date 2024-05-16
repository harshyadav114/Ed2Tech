import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import Highlightext from '../component/core/homepage/Highlightext';
import Button from '../component/common/Button';
import Banner from '../assets/Images/banner.mp4';
import Codeblock from '../component/core/homepage/Codeblock';
import CodeblockSide from '../component/core/homepage/CodeblockSide';
import Time from '../component/core/homepage/Time';
import Learnlanguage from '../component/core/homepage/Learnlanguage';
import Instructors from '../component/core/homepage/Instructors';
import Navbar from '../component/common/Navbar';
import Explore from '../component/core/homepage/Explore';
import Reviewslider from '../component/common/Reviewslider';
import Footer from '../component/common/Footer';
const Home = () => {
  return (
    <>
        <Navbar></Navbar>
            {/*part1*/}
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>

                <Link to={'/signup'} className='flex '>
                  <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                  </div>
                </Link>
                
                <div className="text-center text-4xl font-semibold">
                    Empower Your Future with
                    <Highlightext text={"Coding Skills"} />
                </div>

                <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className="mt-6 flex flex-row gap-7">
                    <Button active={true} to={'/signup'}>Learn More</Button>
                    <Button active={false} to={'/login'}>Book a Demo</Button>
                </div>

                <div className="mx-3 my-7 shadow-[15px_-20px_20px_-10px_rgba(17,138,178,0.5)]">
                    <video
                        className="shadow-[17px_15px_rgba(255,255,255)]"
                        muted
                        loop
                        autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                <div className='w-11/12 flex lg:gap-40 gap-20 justify-center items-center my-20 lg:flex-row flex-col relative'>
                    <CodeblockSide 
                            heading1={'Unlock our'}
                            gradtext={'coding potential'}
                            heading2={'with our online courses'}
                            para={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                            button1={
                                {
                                    active:true,
                                    to:'/signup',
                                    text:'Try it Yourself',
                                    arrow:true

                                }
                            }
                            button2={
                                {
                                    active:false,
                                    to:'/signup',
                                    text:'Learn More'
                                }
                            }
                    />
                    <Codeblock
                        code={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        codeColor={"text-yellow-25"}
                    />
                    
                </div>

                <div className='w-11/12 lg:gap-40 gap-20 flex justify-center items-center lg:my-10 my-1 lg:flex-row flex-col-reverse relative'>
                    <Codeblock
                        code={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        codeColor={"text-white"}
                    />
                    <CodeblockSide 
                            heading1={'Start'}
                            gradtext={'coding in seconds'}
                            para={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            button1={
                                {
                                    active:true,
                                    to:'/signup',
                                    text:'Continue Lesson',
                                    arrow:true

                                }
                            }
                            button2={
                                {
                                    active:false,
                                    to:'/signup',
                                    text:'Learn More'
                                }
                            }
                    />
                    
                </div>
                <Explore/>
        </div>

        <div className="bg-pure-greys-5 text-richblack-700 flex flex-col justify-center items-center">
            <div className="homepage h-[320px] w-full"/>
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <Highlightext text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[1rem] font-normal">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </Button>
            </div>
          </div>
        </div>
            <Time/>
            <Learnlanguage/>
        </div>

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

        <Instructors/>

        
        
      </div>
      <Reviewslider/>
      <Footer/>

    </>
  )
}

export default Home