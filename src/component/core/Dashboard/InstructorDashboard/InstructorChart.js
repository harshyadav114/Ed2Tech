import { useEffect, useState } from "react"
import { Chart, registerables,Legend } from "chart.js"
import { Doughnut,Bubble} from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");
  let options = {
    maintainAspectRatio: false,
    plugins:{
    legend:{
      display:true,
    },
  }
  }
  const [opt,setopt]=useState(options)

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)},${Math.random()*1})`
      colors.push(color)
    }
    return colors
  }

  


  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "rgba(255, 255, 250,0.7)"

      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "rgba(255, 255, 250,0.7)"
      },
    ],
  }


  useEffect(()=>{

    

    function listener(e){
      
      if(e.target.innerWidth<1024 && e.target.innerWidth>600){
        //console.log(options.plugins.legend)
        options.plugins.legend.position='right';
        setopt(options)
      }
      else{
        options.plugins.legend.position='top';
        setopt(options)
      }
    }

    window.addEventListener('resize',listener);
    return ()=>{
      window.removeEventListener('resize', listener)
    }
  },[opt])

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6 w-full ">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="min-[480px]:flex gap-4 min-[480px]:flex-row flex-col font-semibold">
        
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto w-[80%] h-[80%] ">
        
        <Doughnut
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={opt}
        />
      </div>
    </div>
  )
}