import React, { useEffect,useState } from 'react';
import Error from "./Error";
import {useParams} from 'react-router-dom';
import {getCategoryCoursePage,getCategory} from '../services/operations/catalogPage';
import Navbar from '../component/common/Navbar';
import CourseSlider from '../component/core/Catalog/CourseSlider';
import CourseCards from '../component/core/Catalog/CourseCards';
import Footer from '../component/common/Footer';
import Reviewslider from '../component/common/Reviewslider';

const Catalog = () => {
    const [categoryid,setcategoryid]=useState(null);
    const [coursedata,setcoursedata]=useState(null);
    const [loading,setloading]=useState(false);
    const[active,setActive]=useState(1)
    const {catalogId}=useParams();
    const getcategorys=async()=>{
        setloading(true)
        try{
            const category=await getCategory();
            const c_id=category.filter((val)=>{return val.name===catalogId.split('-').join(' ')});
            setcategoryid(c_id[0]?._id)
        }catch(error){
            console.log('Category id not found!')
        }
        setloading(false);
    }

    const getcategorycourses=async()=>{
        setloading(true)
        try{
            const category_data=await getCategoryCoursePage({categoryid});
            //console.log(category_data);
            setcoursedata(category_data);
        }catch(error){
            console.log('Category course not found!')
        }
        setloading(false);
    }

    useEffect(()=>{
        getcategorys();
    },[catalogId]);
    useEffect(()=>{
        getcategorycourses();
    },[categoryid]);

    if (loading || !coursedata) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !coursedata.success) {
        return <Error />
      }
  return (
    <>  
        <Navbar></Navbar>
        <div className=''>
        <div className=" bg-richblack-800 px-4">
            
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog / `}
                    <span className="text-yellow-25">{coursedata?.data?.category?.name}</span>
                </p>

                <div className="text-3xl text-richblack-5">
                {coursedata?.data?.category?.name}
                </div>

                <p className="max-w-[870px] text-richblack-200">
                {coursedata?.data?.category?.description}
                </p>
            </div>
        </div>

        <div className=" mx-auto max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={coursedata?.data?.category?.courses}
              />
            </div>
        </div>

        <div className=" mx-auto w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {coursedata?.data?.randomcategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={coursedata?.data?.randomcategory?.courses}
              />
            </div>
        </div>
        <div className=" mx-auto w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 h-">
                {coursedata?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCards course={course} key={i} Height={"h-[30vw]"} />
                  ))}
              </div>
            </div>
          </div>
          </div>
          <Reviewslider/>
          <Footer />
    </>
  )
}

export default Catalog