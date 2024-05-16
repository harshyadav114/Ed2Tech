import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Openroute from "./component/core/Auth/Openroute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verifyemail from "./pages/Verifyemail";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpasswords from "./pages/Resetpassword";
import About from './pages/About';
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Myprofile from "./component/core/Dashboard/Myprofile";
import Setting from "./component/core/Dashboard/Setting/Setting";
import Privateroute from "./component/core/Auth/Privateroute";
import { Account_type } from "./utils/constant";
import {useSelector,useDispatch} from 'react-redux';
import AddCourse from "./component/core/Dashboard/Addcourse";
import Coursediv from "./component/core/Dashboard/InstructorCourse";
import Editcourse from "./component/core/Dashboard/Editcourse/Editcourse";
import Error from "./pages/Error";
import Catalog from "./pages/Catalog";
import Cart from "./component/core/Dashboard/Cart";
import CourseDetailed from "./pages/CourseDetail";
import EnrollCourse from "./component/core/Dashboard/Enrolledcourse";
import Instructors from "./component/core/Dashboard/InstructorDashboard/Instructor";
import VideoDetails from "./component/core/viewcourse/VideoDetails";
import Viewcourse from "./pages/Viewcourse";
function App() {
  const {user}=useSelector(state=>state.profile);
  
  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
          <Routes>
            <Route path="*" element={<Error/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/catalog/:catalogId" element={<Catalog/>}></Route>
            <Route path="/courses/:courseId" element={<CourseDetailed/>}></Route>
            <Route path="/login" element={<Openroute><Login/></Openroute>}></Route>
            <Route path="/signup" element={<Openroute><Signup/></Openroute>}></Route>
            <Route path="/verifyemail" element={<Openroute><Verifyemail/></Openroute>}></Route>
            <Route path="/forgotpassword" element={<Openroute><Forgotpassword/></Openroute>}></Route>
            <Route path="/resetpassword/:id" element={<Openroute><Resetpasswords/></Openroute>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route element={<Privateroute><Dashboard/></Privateroute>}>
                  <Route path='/dashboard/myprofile' element={<Myprofile/>}/>
                  <Route path='/dashboard/settings' element={<Setting/>}/>

                  {
                    user && Account_type.instructor===user.accounttype &&
                    <>
                      <Route path='/dashboard/addcourse' element={<AddCourse/>}/>
                      <Route path='/dashboard/mycourse' element={<Coursediv/>}/>
                      <Route path='/dashboard/editcourse/:courseId' element={<Editcourse/>}/>
                      <Route path='/dashboard/instructor' element={<Instructors/>}/>

                    </>
                  }
                  {
                    user && Account_type.student===user.accounttype &&
                    <>
                      <Route path='/dashboard/cart' element={<Cart/>}/>
                      <Route path='/dashboard/enrolledcourses' element={<EnrollCourse/>}/>
                    </>
                  }
            </Route>
            <Route element={
                <Privateroute>
                  <Viewcourse />
                </Privateroute>
              }>

              {
                user?.accounttype === Account_type.student && (
                  <>
                  <Route 
                    path="viewcourse/:courseId/section/:sectionId/subsection/:subsectionId"
                    element={<VideoDetails />}
                  />
                  </>
                )
              }

            </Route>
          </Routes>
      </div>
    </>
  );
}

export default App;
