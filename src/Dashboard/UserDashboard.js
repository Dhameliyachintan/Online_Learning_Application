import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CourseContext from "../contextapi/CourseProvider";

const UserDashboard = () => {
  const { courses, enrollInCourse } = useContext(CourseContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleEnroll = (courseId) => {
    const course = courses.find((course) => course.id === courseId);

    if (!course) return;

    if (course.enrolled) {
      toast.warn(`You are already enrolled in "${course.courseName}".`);
      return;
    }

    enrollInCourse(courseId);
    toast.success(`Enrolled in course: "${course.courseName}"`);

    navigate(`/courses/${courseId}`); 
  };

  return (
    <div className="mt-[94px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={`${course.id}-${course.courseName}`}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h2 className="text-lg font-bold mb-2">{course.courseName}</h2>
            <p className="text-gray-700">Duration: {course.duration} hours</p>
            <p className="text-gray-700">
              Date: {new Date(course.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">Description: {course.description}</p>
            <p className="text-gray-700">Category: {course.category}</p>
            <p className="text-gray-700">Difficulty: {course.difficulty}</p>
            <p className="text-gray-700">Progress: {course.progress}%</p>
            <p className="text-gray-700">
              Status: <span className={course.enrolled ? 'text-green-600' : 'text-red-600'}>{course.enrolled ? "Enrolled" : "Not Enrolled"}</span>
            </p>
            <div className="flex justify-between mt-4">
              <button
                className={`p-2 ${course.enrolled ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded hover:${course.enrolled ? 'bg-gray-500' : 'bg-blue-700'}`}
                onClick={() => handleEnroll(course.id)}
                disabled={course.enrolled}
              >
                {course.enrolled ? "Enrolled" : "Enroll"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
