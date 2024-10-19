import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseContext from "../contextapi/CourseProvider";

export default function Addcourse() {
  const navigate = useNavigate();
  const { addCourse } = useContext(CourseContext);

  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !courseName ||
      !duration ||
      !date ||
      !description ||
      !category ||
      !difficulty
    ) {
      setError("Please fill in all fields correctly.");
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setError("");

    const newLearningEntry = {
      courseName,
      duration: Number(duration),
      date: new Date(date),
      description,
      category,
      difficulty,
      videoLink,
      progress: progress,
      id: Date.now(),
    };

    addCourse(newLearningEntry);
    toast.success("Course entry created successfully!");
    resetForm();
    navigate("/userdashboard");
  };

  const resetForm = () => {
    setCourseName("");
    setDuration("");
    setDate("");
    setDescription("");
    setCategory("");
    setDifficulty("");
    setProgress(0);
    setVideoLink("");
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto mt-[94px] p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create a New Course Entry
      </h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name:
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (in hours):
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration in hours"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date:
            </label>
            <input
              type="date"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of the course"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Progress (%):
            </label>
            <input
              type="number"
              min="0"
              max="100"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              placeholder="Enter progress in percentage"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Link:
            </label>
            <input
              type="url"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Enter the video link"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
