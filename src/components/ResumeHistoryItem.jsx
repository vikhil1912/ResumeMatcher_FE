import React from "react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResumeHistoryItem = ({ resume, darkMode, onDelete, onStar }) => {
  const navigate = useNavigate();
  const [showFullJD, setShowFullJD] = useState(false);
  return (
    <div
      className={`p-5  rounded-lg border transition-all ${
        darkMode
          ? "bg-gray-700/50 border-gray-600 hover:border-gray-500"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <h3
            className={`font-bold text-lg ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {resume?.fileName}
          </h3>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
              darkMode
                ? "bg-blue-900/30 text-blue-300"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            v{resume?._id}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => navigate("#")}
            className={`p-1.5 rounded-lg bg-blue-500 cursor-pointer  ${
              darkMode ? "hover:bg-gray-600" : "hover:bg-blue-400"
            }`}
            aria-label={resume?.starred ? "Unstar resume" : "Star resume"}
          >
            OPEN
          </button>
          <button
            onClick={(e) => {
              // e.stopPropagation();
              // onDelete();
            }}
            className={`p-1.5 rounded-full ${
              darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
            }`}
            aria-label="Delete resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-2">
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Uploaded: {new Date(resume?.createdAt).toUTCString()}
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <div className="relative group w-full md:w-1/3">
            <iframe
              src={`${resume?.resume?.Resume}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-[250px] rounded border"
            ></iframe>
            <div
              onClick={() => window.open(resume?.resume?.Resume, "_blank")}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
            >
              <div className="flex items-center gap-2 text-lg font-semibold ">
                <ArrowUpRight className="w-5 h-5" />
                OPEN
              </div>
            </div>
          </div>
          <p
            className={`w-full md:w-2/3 font-medium ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {showFullJD
              ? resume?.job_description
              : resume?.job_description?.slice(0, 400) + "..."}
          </p>
          {resume?.job_description?.length > 400 && (
            <button
              onClick={() => setShowFullJD(!showFullJD)}
              className={`mt-2 text-sm font-semibold ${
                darkMode ? "text-white" : "text-black"
              } underline`}
            >
              {showFullJD ? "View Less" : "View More"}
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Match Progress
          </span>
          <span className={darkMode ? "text-blue-300" : "text-blue-600"}>
            {resume?.score?.result}%
          </span>
        </div>
        <div
          className={`w-full rounded-full h-2 ${
            darkMode ? "bg-gray-600" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-2 rounded-full ${
              resume?.score?.result < 40
                ? "bg-red-500"
                : resume?.score?.result < 70
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${resume?.score?.result}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
