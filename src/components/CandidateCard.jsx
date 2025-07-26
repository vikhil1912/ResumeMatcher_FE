import React from 'react';

export const CandidateCard = ({ c, jobTitle, onView, onToggle, darkMode }) => {
  // Determine score color
  const scoreColor =(darkMode)?(c.score >= 80 ? 'text-green-400' :
    c.score >= 50 ? 'text-yellow-400' :
    'text-red-400'):
    (c.score >= 80 ? 'text-green-600' :
    c.score >= 50 ? 'text-yellow-300' :
    'text-red-600');

  // Shared pill style
  const pillStyle = 'inline-block px-3 py-1 rounded-lg bg-white/20 text-base font-semibold';

  return (
    <div className={`p-4 rounded-2xl shadow-xl border border-white/20 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-md text-white'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{c.name}</h3>
          <p className="text-sm opacity-80">Applied for: {jobTitle}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onView(c)}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-sm transition"
          >
            View
          </button>
          <button onClick={() => onToggle(c)} className="text-yellow-400 text-3xl">
            {c.bookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-base">
        <div>
          <span className={`${pillStyle} ${scoreColor}`}>Score: {c.score}</span>
        </div>
        <div>
          <span className={pillStyle}>Exp: {c.experience} yrs</span>
        </div>
        <div>
          <span className={pillStyle}>{c.status}</span>
        </div>
        <div>
          <span className={pillStyle}>Applied: {c.appliedDate}</span>
        </div>
      </div>
    </div>
  );
};
