import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const initialCourses = JSON.parse(localStorage.getItem("courses")) || [];
  const initialEnrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  const [courses, setCourses] = useState(initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolledCourses);
  const [courseProgress, setCourseProgress] = useState({}); 


  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const addCourse = (newCourse) => {
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses)); 
  };

  const enrollInCourse = (courseId) => {
    const courseToEnroll = courses.find((course) => course.id === courseId);
    if (!courseToEnroll) {
      toast.error("Course not found!");
      return;
    }

    if (enrolledCourses.some((course) => course.id === courseId)) {
      toast.error("Already enrolled in this course!");
    } else {
      setEnrolledCourses([...enrolledCourses, courseToEnroll]);
      toast.success(`Successfully enrolled in ${courseToEnroll.courseName}`);
    }
  };

  const deleteCourse = (courseId) => {
    setCourses((prevCourses) => prevCourses.filter(course => course.id !== courseId));
    setEnrolledCourses((prevEnrolledCourses) => prevEnrolledCourses.filter(course => course.id !== courseId)); 
    toast.success(`Course ID: ${courseId} deleted successfully!`);

  };

  const deleteEnrolledCourse = (courseId) => {
    const updatedEnrolledCourses = enrolledCourses.filter((course) => course.id !== courseId);
    setEnrolledCourses(updatedEnrolledCourses);
    toast.success(`Enrolled course ID: ${courseId} deleted successfully!`);
  };


  const updateCourseProgress = (courseId, progress) => {
    setCourseProgress((prevProgress) => ({
      ...prevProgress,
      [courseId]: progress,
    }));
  };

  const updateCourse = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
    );
  };

  const markCourseCompleted = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, completed: true } : course
      )
    );
  };
  


  return (
    <CourseContext.Provider
      value={{ courses, enrolledCourses, addCourse, enrollInCourse, deleteCourse, deleteEnrolledCourse, courseProgress, updateCourseProgress, updateCourse, markCourseCompleted }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;

