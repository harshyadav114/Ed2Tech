import React from 'react';
import Highlightext from '../homepage/Highlightext';
import Button from '../../common/Button'

const Learninggrid = () => {
    const LearninggridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];
  return (
    <div className='mx-auto w-[350px] grid xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 '>
        {
            LearninggridArray.map((element,ind)=>(
                <div className={`h-[294px] ${element.order===-1 &&'xl:col-span-2 bg-transparent'}  ${element.order%2===1 &&'bg-richblack-700'} ${element.order%2===0 &&'bg-richblack-800'} ${element.order===3 && 'xl:col-start-2'}`}>
                    {
                        element.order===-1?
                        (
                          <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                          <div className="text-4xl font-semibold ">
                            {element.heading}
                            <Highlightext text={element.highlightText} />
                          </div>
                          <p className="text-richblack-300 font-medium">
                            {element.description}
                          </p>
          
                          <div className="w-fit mt-2">
                            <Button active={true} linkto={element.BtnLink}>
                              {element.BtnText}
                            </Button>
                          </div>
                        </div>
                        ) :
                        (
                          <div className="p-8 flex flex-col gap-8">
                          <h1 className="text-richblack-5 text-lg">{element.heading}</h1>
          
                          <p className="text-richblack-300 font-medium">
                            {element.description}
                          </p>
                        </div>
                        )
                    }
                </div>
            ))
        }

    </div>
  )
}

export default Learninggrid