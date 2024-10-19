import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import { useState } from "react";
import Home from "./pages/Home.js";
import Navbar from "./component/Navbar.js";
import UserDashboard from "./Dashboard/UserDashboard.js";
import { CourseProvider } from "./contextapi/CourseProvider.js";
import { ToastContainer } from "react-toastify";
import EditCourse from "./component/EditCourse.js";
import AdminDashboard from "./Dashboard/AdminDashboard.js";
import Addcourse from "./component/AddCourse.js";
import EnrolledCourse from "./component/EnrolledCourse.js";
import { AuthProvider } from "./component/form/Authprovider.js";
import Courses from "./component/Courses.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthProvider>
      <Router>
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes({ isAuthenticated, onLogin }) {
  const location = useLocation();

  const shouldShowHeader = !["/login", "/registration"].includes(
    location.pathname
  );

  return (
    <div className="App">
      {shouldShowHeader && <Navbar />}
      <AuthProvider>
        <CourseProvider>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/addcourse" element={<Addcourse />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/enrolledcourse" element={<EnrolledCourse />} />
            <Route path="/courses/:courseId" element={<Courses />} />
            <Route path="/editcourse" element={<EditCourse />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />
        </CourseProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
