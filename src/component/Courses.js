import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import CourseContext from '../contextapi/CourseProvider';

const Courses = () => {
  const { courseId } = useParams(); 
  const { courses, markCourseCompleted } = useContext(CourseContext);
  const course = courses.find(course => course.id === parseInt(courseId)); 

  if (!course) {
    return <div>Course not found!</div>;
  }

  const handleMarkCompleted = () => {
    markCourseCompleted(course.id); 
  };

  return (
    <div className="flex flex-col items-center p-4 mt-[94px]">
      <h1 className="text-2xl font-bold mb-4">{course.courseName}</h1>
      {course.videoLink && (
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>     
          <h2 className="text-xl font-semibold z-20 text-white text-center">Watch Video:</h2>
          <iframe
            className="mt-2 z-20"
            width="560"
            height="315"
            src={course.videoLink.replace("watch?v=", "embed/")}
            title={course.courseName}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <button
        className="mt-4 p-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleMarkCompleted}
      >
        Mark as Completed
      </button>
    </div>
  );
};

export default Courses;
