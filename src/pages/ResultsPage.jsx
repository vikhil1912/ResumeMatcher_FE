import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  BadgeCheck,
  Briefcase,
  FolderOpen,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import ResultPageSkeleton from "../components/skeletons/ResultPageSkeleton";
import ResultLoading from "../components/skeletons/resultLoading";

const scoreTemplate = [
  {
    label: "Skills Score",
    key: "skill_score",
    icon: <BadgeCheck className="w-5 h-5 text-blue-600" />,
  },
  {
    label: "Degree Score",
    key: "degree_score",
    icon: <GraduationCap className="w-5 h-5 text-green-600" />,
  },
  {
    label: "Experience Score",
    key: "experience_score",
    icon: <Briefcase className="w-5 h-5 text-yellow-600" />,
  },
  {
    label: "Project Score",
    key: "project_score",
    icon: <FolderOpen className="w-5 h-5 text-purple-600" />,
  },
];

let suggestions = [
  "Add more technical skills relevant to the JD.",
  "Include recent certifications.",
  "Quantify your achievements in experience section.",
  "Highlight key projects with tech stack used.",
];

export const ResultPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const { historyid } = useParams();

  const { data: historyData, isLoading } = useQuery({
    queryKey: [`history-${historyid}`],
    queryFn: async () =>
      await axiosInstance.get(`/student/history/${historyid}`),
  });

  const { data: suggestionsData, isLoading: isSuggestionLoading } = useQuery({
    queryKey: [`suggestion-${historyid}`],
    queryFn: async () => await axiosInstance.get(`/suggestion/${historyid}`),
  });

  const scores =
    !isLoading && historyData
      ? scoreTemplate.map((item) => {
          const raw = historyData.data.score[item.key] ?? 0;
          return {
            label: item.label,
            score: Math.round(raw * 100), // Convert to integer percentage
            icon: item.icon,
          };
        })
      : scoreTemplate.map((item) => ({
          label: item.label,
          score: 0,
          icon: item.icon,
        }));

  const finalScore = historyData?.data?.score?.result;
  suggestions = suggestionsData?.data?.suggestions;
  useEffect(() => {
    if (!isLoading && historyData) {
      const timeout = setTimeout(() => {
        setProgress(scores.map((s) => s.score));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, historyData]);

  if (isLoading || isSuggestionLoading) return <ResultLoading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 flex flex-col items-center">
      <div>
        <button
          onClick={() => navigate("/student")}
          className="bg-blue-700 cursor-pointer p-2 rounded-lg"
        >
          Home
        </button>
        <h1 className="text-3xl block md:text-4xl font-bold mb-6 text-center">
          Resume vs JD Match Result
        </h1>
      </div>

      <div className="flex gap-6 w-full max-w-3xl">
        {scores.map((item, i) => (
          <div
            key={i}
            className="w-full flex  flex-col justify-center items-center gap-6"
          >
            <div className="relative w-16 h-16">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#374151"
                  strokeWidth="10"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="transparent"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress[i] / 100 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {progress[i]}%
              </div>
            </div>
            <div className="flex items-center justify-center">
              {item.icon}
              <span className="ml-2 w-32">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <div className="flex justify-center items-center gap-3">
          <Brain className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-semibold">Final Match Score</h2>
        </div>
        <motion.div
          className="mt-4 w-40 h-40 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          {finalScore.toFixed(0)}%
        </motion.div>
      </div>

      <div className="mt-12 w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-600 pb-2">
          🔍 AI Suggestions
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {suggestions?.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultPage;
