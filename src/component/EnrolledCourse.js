import React, { useContext } from "react";
import CourseContext from "../contextapi/CourseProvider";

const EnrolledCourse = () => {
  const { enrolledCourses } = useContext(CourseContext); 

  // const handleResumeLesson = (videoLink) => {
  //   window.open(videoLink, "_blank");
  // };

  return (
    <div className="container mx-auto px-4 mt-[94px]">
      <h1 className="text-3xl font-bold mb-6 text-center">Enrolled Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p className="text-center text-gray-700">No courses enrolled yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={`${course.id}-${course.courseName}`}
              className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-2 text-center">{course.courseName}</h2>
              <p className="text-gray-700">
                Duration: <span className="font-medium">{course.duration} hours</span>
              </p>
              <p className="text-gray-700">
                Date: <span className="font-medium">{new Date(course.date).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Description: <span className="font-medium">{course.description}</span>
              </p>
              <p className="text-gray-700">
                Category: <span className="font-medium">{course.category}</span>
              </p>
              <p className="text-gray-700">
                Difficulty: <span className="font-medium">{course.difficulty}</span>
              </p>
              <p className="text-gray-700">
                Progress: <span className="font-medium">{course.progress}%</span>
              </p>

              {/* <div className="flex justify-end mt-4">
                <button
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
                  onClick={() => handleResumeLesson(course.videoLink)} 
                >
                  <FaPlay className="mr-2" />
                  Resume Lesson
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;
