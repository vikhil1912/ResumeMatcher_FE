export const JDHistoryItem = ({ item, darkMode, onViewResumes }) => {
  return (
    <div className={`p-4 rounded-lg border transition-all ${
      darkMode ? 'bg-gray-700/50 border-gray-600 hover:border-gray-500' 
             : 'bg-white/10 border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <span className={`text-xs px-2 py-1 rounded ${
              darkMode ? 'bg-gray-600 text-gray-300' : 'bg-white/20 text-white'
            }`}>
              {item.date}
            </span>
            <span className={`ml-2 text-xs px-2 py-1 rounded ${
              darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-500/20 text-blue-600'
            }`}>
              {item.topResumes.length} resumes
            </span>
          </div>
          
          <p className={`mb-3 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>
            {item.jdText}
          </p>
        </div>
        
        <button
          onClick={onViewResumes}
          className={`px-4 py-2 rounded-lg font-medium ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
              : 'bg-blue-500 hover:bg-blue-400 text-white'
          } transition`}
        >
          View Resumes
        </button>
      </div>
    </div>
  );
};