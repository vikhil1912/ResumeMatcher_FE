import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';

export const AnalysisResultsPage = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { user } = useAuth();

  // In a real app, you would fetch this data based on analysisId
  const [analysisData, setAnalysisData] = React.useState({
    jdText: "Sample job description text...",
    date: "2024-05-20",
    resumes: [
      {
        id: 1,
        name: "John_Doe_Resume.pdf",
        score: 92,
        content: "Detailed resume content...",
        skills: ["React", "Node.js", "TypeScript"],
        experience: "5 years",
        education: "MIT Computer Science"
      },
      // More resume data...
    ]
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/recruiter')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
            }`}
          >
            ← Back to Dashboard
          </button>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Analysis Results
          </h1>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        {/* JD Summary */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Job Description
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {analysisData.jdText}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Analyzed on: {analysisData.date}
          </p>
        </div>

        {/* Resumes List */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Matching Resumes ({analysisData.resumes.length})
          </h2>
          
          {analysisData.resumes.map((resume) => (
            <div 
              key={resume.id}
              className={`p-6 rounded-xl shadow-md transition-all hover:shadow-lg ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
              } border`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {resume.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resume.score >= 80 
                        ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                        : resume.score >= 60 
                          ? (darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800')
                          : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
                    }`}>
                      Match Score: {resume.score}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // You could implement a resume viewer here
                    alert(`Would show full resume for: ${resume.name}`);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                      : 'bg-blue-500 hover:bg-blue-400 text-white'
                  }`}
                >
                  View Full Resume
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience</h4>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{resume.experience}</p>
                </div>

                <div>
                  <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Education</h4>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{resume.education}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};