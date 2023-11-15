import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Invokecsr from './pages/Invokecsr';
import Invokesch from './pages/Invokesch';
import Enroll from './pages/Enroll';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentRegistration from './pages/StudentRegistration'
import CompanyRegistration from './pages/CompanyRegistration'
import StuDashboard from './pages/StuDashboard'
import StudentUpdateData from './pages/Student_UpdateData'
import AboutUs from './pages/AboutUs'

function App() {
  const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0 });
      // scroll to the top of the browser window when changing route
      // the window object is a normal DOM object and is safe to use in React.
    }, [location]);
  };

  //console.log(account);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <Home useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/StudentRegistration" element=
            {<StudentRegistration useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/Login" element=
            {<Login useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/StudentDashboard"  element=
            {<StuDashboard useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/StudentUpdateData"  element=
            {<StudentUpdateData useScrollToTop={useScrollToTop} />}
          />
<Route exact path="/CompanyRegistration" element=
            {<CompanyRegistration useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/invokecsr"  element=
            {<Invokecsr useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/invokesch"  element=
            {<Invokesch useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/enroll"  element=
            {<Enroll useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/register"  element=
            {<Register useScrollToTop={useScrollToTop} />}
          />
          <Route exact path="/AboutUs"  element=
            {<AboutUs useScrollToTop={useScrollToTop} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

