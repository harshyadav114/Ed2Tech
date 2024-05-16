import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination,Navigation} from 'swiper/modules';
import "swiper/css";
import CourseCards from './CourseCards';

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={60}
          loop={true}
          modules={[FreeMode, Pagination,Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] mySwiper"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCards  course={course} height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider