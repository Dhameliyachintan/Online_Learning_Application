import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./form/Authprovider";

const Navbar = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role);
    }
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setUserRole(null);
    navigate("/login");
    toast.success("Successfully logged out!");
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Habit Tracker Application</h2>
        <nav>
          <ul className="flex space-x-6">
            {userRole === "admin" && (
              <>
                <li>
                  <Link
                    to="/adminDashboard"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addCourse"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Add Course
                  </Link>
                </li>
              </>
            )}

            {userRole === "user" && (
              <>
                <li>
                  <Link
                    to="/userDashboard"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/enrolledCourse"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Enrolled Course
                  </Link>
                </li>
              </>
            )}

            {!login ? (
              <li>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
