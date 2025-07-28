import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';

export const AnalysisResultsPage = () => {
  const { analysisId } = useParams(); // Only keep `id` here
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { user } = useAuth();

  const { data: HrResultData, isLoading, error } = useQuery({
    queryKey: ["HrHistory", analysisId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/hr/history/${analysisId}`);
      return response.data;
    },
    enabled: !!analysisId, // ensure it doesn't run with undefined id
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading data</p>;
  if (!HrResultData) return <p className="text-center mt-10">No data found.</p>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/recruiter')}
            className={`px-4 py-2 rounded-lg flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'}`}
          >
            ← Back to Dashboard
          </button>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Analysis Results
          </h1>
          <div className="w-24"></div>
        </div>

        {/* JD Summary */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Job Description
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {HrResultData?.JDId?.description}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Analyzed on: {new Date(HrResultData?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Resumes List */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Matching Resumes ({HrResultData?.MatchedResumes?.length || 0})
          </h2>

          {HrResultData?.MatchedResumes?.map((resumeObj, index) => {
            const resume = resumeObj.resumeId;
            const score = resumeObj.score?.result;

            return (
              <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}>
                <h3 className="font-medium">
                  {resume?.Resume?.split("/")?.pop() || "Unnamed Resume"}
                </h3>
                <p>Score: {score}%</p>
                <a
                  href={resume?.Resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
