import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseContext from "../contextapi/CourseProvider";

const EditCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const { updateCourse } = useContext(CourseContext);
  const [courseData, setCourseData] = useState(course);

  const categories = [
    "Programming",
    "Design",
    "Data Science",
    "Business",
    "Marketing",
    "Health & Fitness",
    "Personal Development",
    "Others",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    setCourseData(course);
  }, [course]);

  if (!course) {
    navigate("/userDashboard");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(courseData);
    navigate("/userDashboard");
  };

  return (
    <div className="mt-[94px] p-4">
      <h2 className="text-lg font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block">Duration (hours)</label>
          <input
            type="number"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block">Video Link</label>
          <input
            type="url"
            name="videoLink"
            value={courseData.videoLink || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="https://example.com/video"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            name="category" 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={courseData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Difficulty:
          </label>
          <select
            name="difficulty" 
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={courseData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select difficulty level
            </option>
            {difficulties.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
