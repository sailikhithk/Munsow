import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login/Login";
import HeaderFooterLayout from "./HeaderFooterLayout";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import Users from "./screens/Users";
import LessonIndex from "./screens/Quiz/LessonIndex";
import GLOBAL_CONSTANTS from "../GlobalConstants";
import LessonView from "./screens/Quiz/LessonView";
import QuizListing from "./screens/QuizListing";
import DashboardRedirection from "./screens/statistics/DashboardRedirection";
import Register from "./screens/Login/Register";
import StudentLogin from "./screens/Login/StudentLogin";
import StudentRegister from "./screens/Login/StudentRegister";

function Url_Routes() {
   
  

  return (
    <BrowserRouter>
      <Routes>
      {
        GLOBAL_CONSTANTS?.loggedIn &&
          <>
          {
            GLOBAL_CONSTANTS?.user_cred?.role_id == 1 ? <>
          <Route excat path="/" element={<HeaderFooterLayout Component={<Dashboard />} /> } />
          <Route excat path="/dashboard" element={<HeaderFooterLayout Component={<DashboardRedirection />} /> } />
          <Route excat path="/quiz" element={<HeaderFooterLayout Component={<QuizListing />} /> } />
          <Route excat path="/users" element={<HeaderFooterLayout Component={<Users />} /> } />
          <Route excat path="/profile" element={<HeaderFooterLayout Component={<Profile/>} /> } />
              
            </>:<>
            <Route excat path="/" element={<HeaderFooterLayout Component={<Dashboard />} /> } />
          <Route excat path="/dashboard" element={<HeaderFooterLayout Component={<DashboardRedirection />} /> } />
          <Route excat path="/lessons" element={<HeaderFooterLayout Component={<LessonIndex/>} /> } />
          <Route excat path="/lesson/:id" element={<HeaderFooterLayout Component={<LessonView/>} /> } />
          <Route excat path="/profile" element={<HeaderFooterLayout Component={<Profile/>} /> } />
            </>
          }
          </>
      }
          <Route excat path="/" element={<Login />} />
          <Route excat path="/studentLogin" element={<StudentLogin />} />
          <Route excat path="/studentRegister" element={<StudentRegister />} />
          <Route exact path="/registration" element ={<Register/>}/>
          <Route excat path="/dashboard" element={<HeaderFooterLayout Component={<Dashboard />} /> } />
          <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Url_Routes;
