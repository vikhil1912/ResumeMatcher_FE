import React from 'react';

export const ResumeHistoryItem = ({ resume, darkMode, onDelete, onStar }) => {
  return (
    <div className={`p-5 rounded-lg border transition-all ${darkMode ? 'bg-gray-700/50 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {resume.fileName}
          </h3>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
            v{resume.id}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
            className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
            aria-label={resume.starred ? "Unstar resume" : "Star resume"}
          >
            {resume.starred ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
            aria-label="Delete resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-2">
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Uploaded: {resume.uploadDate}
        </p>
        <p className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          {resume.job}
        </p>
      </div>

      <div className="mb-3">
        <h4 className={`font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Improvements:
        </h4>
        <ul className={`list-disc pl-5 space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {resume.improvements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className={`font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Remaining suggestions:
        </h4>
        <ul className={`list-disc pl-5 space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {resume.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Match Progress</span>
          <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>{resume.progress}%</span>
        </div>
        <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
          <div 
            className={`h-2 rounded-full ${
              resume.progress < 40 ? 'bg-red-500' :
              resume.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${resume.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};