import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { getUnauthenticatedCourseDetail } from '../services/operations/course';
import { addtocart,removefromcart } from '../Slicer/cartSlicer';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import {useParams,useNavigate} from 'react-router-dom';
import Error from './Error';
import Navbar from '../component/common/Navbar';
import RatingStar from '../component/common/RatingStar';
import GetAvgRating from '../utils/GetAvgRating';
import dateformatter from '../utils/dateformatter';
import CourseCardBuynow from '../component/core/Course/CourseCardBuynow';
import { Account_type } from '../utils/constant';
import {toast} from 'react-hot-toast';
import ConfirmationModal from '../component/common/Modal';
import { pascalCase } from "pascal-case";
import { BsBrush } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { hourminsec } from '../utils/Minsec';
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import CourseAccordionBar from '../component/core/Course/CourseAccordionBar';
import Footer from '../component/common/Footer';
import { FaSmoking } from "react-icons/fa6";
import { createorder } from '../services/operations/payment';
import getduration from '../utils/getduration';

const CourseDetailed = () => {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector(state=>state.profile);
    const {cart}=useSelector(state=>state.cart);
    const {paymentloading}=useSelector(state=>state.course);
    const dispatch=useDispatch();
    const[loading,setloading]=useState((false));
    const [course,setcourse]=useState(null);
    const [avgrating,setavgrating]=useState(null);
    const [ConfirmationModals,setConfirmationModals]=useState(null);
    const [width,setwidth]=useState(null);
    const [show,setshow]=useState(false);
    const [showdesc,setshowdesc]=useState(false)
    const courseId=useParams();
    const [duartion,setduration]=useState(0);
    const navigate=useNavigate();

    const CustomHeading1 = ({ children }) => <h1 className=' bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold mb-4 size-md'>{children}</h1>;
    const CustomList = ({ children }) => <ol className='my-11'>{children}</ol>;
    const CustomListItem = ({ children }) => <li className='mb-2 italic '>{children}</li>;
    const strng = ({ children }) => <strong className=' bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>{children}</strong>;
    const para = ({ children }) => <p className=' text-richblack-200 mb-2'>{children}</p>;
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
        !isActive.includes(id)
            ? isActive.concat([id])
            : isActive.filter((e) => e != id)
        )
    }

    const getCourseData=async()=>{
        
        setloading(true)
        try{
            //console.log('hello')
            const course_data=await getUnauthenticatedCourseDetail(courseId);
            //console.log(course_data);
            setcourse(course_data);
        }catch(error){
            console.log(error,"error occured in course data fetching")
        }
        setloading(false);
    }
    

    useEffect(()=>{
        function listener(e){
           //console.log(e);
            setwidth(e.target.innerWidth);
        }

        window.addEventListener('resize', listener);

        return ()=>{
            window.removeEventListener('resize', listener)
        }
    },[])
    useEffect(()=>{
        
        getCourseData();
        
    },[courseId]);
    useEffect(()=>{
        //console.log(course?.data?.description)
        const avgrate=GetAvgRating(course?.data?.ratingandreview);
        setavgrating(avgrate)
    },[course]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
        let lectures = 0;
       
        course?.data?.section?.forEach((sec) => {
        lectures += sec.subsection.length || 0;
        })
        
        setTotalNoOfLectures(lectures);
        const lengthres=getduration(course)
        //console.log(lengthres)
        setduration(lengthres);
    }, [course]);

    

    if(loading || !course){
        return(
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if(!course.success){
        return(
            <Error/>
        )
    }
    const addToCart=()=>{
        if(user && user?.accounttype===Account_type.instructor){
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        
        if(token){
            
            dispatch(addtocart(course?.data));
            
            return;
        }

        setConfirmationModals({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModals(null),
        })
    }
    const buynow=async()=>{
        if (token) {
            await createorder(token, [courseId], user, navigate, dispatch)
            return
          }
          setConfirmationModals({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModals(null),
          })
    }
    const getCourselength=()=>{

    }
    if (paymentloading) {
        // console.log("payment loading")
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
  return (
    <>
        <Navbar/>
        <div className={`relative w-full bg-richblack-800`}>
            <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>
                <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                    <div className="relative block max-h-[30rem] lg:hidden">
                        <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                        <img
                            src={course?.data?.thumbnail}
                            alt="course thumbnail"
                            className="w-full aspect-video object-cover"
                       
                        />
                    </div>
                    <div
                        className={`z-30 my-5 w-full flex flex-col items-start gap-4 py-5 text-lg text-richblack-5`}
                        >
                        <div>
                            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                            {course?.data?.title}
                            </p>
                        </div>
                        <div className='text-sm text-richblack-400'>{course?.data?.description?.replace('#','').replace('1.','').replace('~','').substr(0,300)}{`...`}</div>
                        <div className="text-md flex flex-wrap items-center gap-2">
                            <span className="text-yellow-25">{avgrating}</span>
                            <RatingStar Review_Count={avgrating} Star_Size={24} />
                            <span>{`(${course?.data?.ratingandreview?.length} reviews)`}</span>
                            <span>{`${course?.data?.studentenrolled?.length || 0} students enrolled`}</span>
                        </div>
                        <div>
                            <p className="">
                            Created By <span className=' text-blue-50 font-semibold'>{`${pascalCase(course?.data?.instructorname?.firstname)} ${pascalCase(course?.data?.instructorname?.lastname)}`}</span>
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-5 text-lg">
                            <p className="flex items-center gap-2">
                            {" "}
                            <BiInfoCircle /> Created at {dateformatter(course?.data?.createdAt)}
                            </p>
                            <p className="flex items-center gap-2">
                            {" "}
                            <HiOutlineGlobeAlt /> English
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                        <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                            Rs. {course?.data?.price}
                        </p>
                        <button className="yellowButton" onClick={()=>buynow()}>
                            Buy Now
                        </button>
                        <button className="blackButton">Add to Cart</button>
                    </div>
                </div>
                <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                    <CourseCardBuynow
                        course={course?.data}
                        setConfirmationModals={setConfirmationModals}
                        addToCart={addToCart}
                        buynow={buynow}
                        getCourselength={getCourselength}
                        duration={duartion}
                    />
                </div>
            </div>
        </div>

        <div className="mx-auto px-4 text-start text-richblack-5 lg:w-[1260px] w-full  ">
                <div className="mx-auto min-w-[300px] max-w-maxContentTab lg:mx-0 xl:max-w-[810px] ">
                
                <div className="my-8 border border-richblack-600 p-8 pb-12 relative h-fit">
                    <p className="text-3xl font-semibold">What you'll learn</p>
                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-14 items-start text-richblack-300 ">
                            {width>=1024 ?
                                (course?.data?.whatyouwilllearns?.map((sec,ind)=>(
                                    <p className='flex items-center gap-3'><BsBrush />{sec}</p>
                                )))
                                :
                                (
                                    course?.data?.whatyouwilllearns?.map((sec,ind)=>(
                                     show ? (<p className='flex items-center gap-3'><BsBrush />{sec}</p>) : (ind<=4 && <p className='flex items-center gap-3'><BsBrush />{sec}</p>)
                                    ))

                                    
                                )
                            }
                            {
                                width<1024 && <div className='mt-5 flex gap-2 items-center text-richblue-200 absolute bottom-3 translate-x-7' onClick={()=>setshow(!show)}>Show {show?'less':'more'} <p className=' text-sm'><IoIosArrowDown /></p> </div>
                            }
                    </div>
                </div>

                <div className="max-w-[830px] ">
                <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2">
                    <div className="flex gap-2 items-center  text-richblack-200 ">
                    <div>
                        {course?.data?.section?.length} {`section(s)`}
                    </div>
                    <div className='text-xl font-semibold text-richblack-600'>.</div>
                    <div>
                        {totalNoOfLectures} {`lecture(s)`}
                    </div>
                    <div className='text-xl font-semibold text-richblack-600 '>.</div>
                    <div>{`${duartion.hour || 0}h ${duartion.minute ||0}m ${duartion.second || 0}s`} total length</div>
                    </div>
                    <div>
                    <button
                        className="text-yellow-25"
                        onClick={() => setIsActive([])}
                    >
                        Collapse all sections
                    </button>
                    </div>
                </div>
                </div>
                </div>

                <div className="py-4">
                {course?.data?.section?.map((sec, index) => (
                    <CourseAccordionBar
                    sec={sec}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                    />
                ))}
            </div>

            <div className={`mt-4 py-4 flex flex-col gap-3`}>
              <p className="text-[28px] font-semibold">Description</p>
              <div className={`${showdesc?'line-clamp-none':'line-clamp-[7]'}`}>
                            <Markdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: CustomHeading1,
                                    ol: CustomList,
                                    li: CustomListItem,
                                    strong:strng,
                                    p:para
                                  }}
                            >
                            {course?.data?.description}
                            </Markdown>
                </div>
              <div className='flex gap-2 items-center text-richblue-200 cursor-pointer' onClick={(()=>setshowdesc(!showdesc))}>Show {showdesc?'less':'more'} <p className=' text-sm'><IoIosArrowDown /></p></div>
              
            </div>


            <div className=" mt-4 py-4 flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Requirements</p>
              <div className=' text-richblack-200 flex flex-col gap-1 '>
              {
                course?.data?.instructions?.map((req,ind)=>(
                    <div className='flex items-center gap-3'><p><FaSmoking /></p>{req}</div>
                ))
              }
              </div>
            </div>

            <div className="mb-12 mt-4 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-2">
                <img
                  src={
                    course?.data?.instructorname?.image
                      ? course?.data?.instructorname?.image
                      : `https://api.dicebear.com/7.x/bottts/svg?seed=${course?.data?.instructorname?._id}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${pascalCase(course?.data?.instructorname?.firstname)} ${pascalCase(course?.data?.instructorname?.lastname)}`}</p>
              </div>
              <p className="text-richblack-50">
                {course?.data?.instructorname?.additionaldetails?.about}
              </p>
            </div>

            
            </div>
          </div>
        <Footer/>

        {ConfirmationModals && <ConfirmationModal ConfirmationModals={ConfirmationModals} />}
    </>
  )
}

export default CourseDetailed