import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import CourseContext from "../contextapi/CourseProvider";
import { FaEdit, FaTrash, FaVideo } from 'react-icons/fa';

const AdminDashboard = () => {
  const { courses, deleteCourse } = useContext(CourseContext);
  const navigate = useNavigate(); 

  const handleDelete = (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      deleteCourse(courseId);
      toast.success(`Course ID: ${courseId} has been deleted.`);
    }
  };

  const handleEdit = (course) => {
    navigate('/editcourse', { state: { course } });
  };

  return (
    <div className="mt-[94px] p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={`${course.id}-${course.courseName}`}
            className="bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">{course.courseName}</h2>
              <p className="text-gray-600">Duration: <span className="font-medium">{course.duration} hours</span></p>
              <p className="text-gray-600">Date: <span className="font-medium">{new Date(course.date).toLocaleDateString()}</span></p>
              <p className="text-gray-600">Description: <span className="font-medium">{course.description}</span></p>
              <p className="text-gray-600">Category: <span className="font-medium">{course.category}</span></p>
              <p className="text-gray-600">Difficulty: <span className="font-medium">{course.difficulty}</span></p>
              <p className="text-gray-600">Progress: <span className="font-medium">{course.progress}%</span></p>

              {course.videoLink && (
                <div className="mt-4 flex justify-center items-center">
                  <FaVideo className="mr-2 text-blue-600" />
                  <a 
                    href={course.videoLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              )}
            </div>
            <div className="flex justify-between p-4 border-t border-gray-200">
              <button
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center transition-colors duration-200"
                onClick={() => handleEdit(course)} 
              >
                <FaEdit className="mr-2" />
                Edit
              </button>
              <button
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center transition-colors duration-200"
                onClick={() => handleDelete(course.id)}
              >
                <FaTrash className="mr-2" />
                Delete Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
