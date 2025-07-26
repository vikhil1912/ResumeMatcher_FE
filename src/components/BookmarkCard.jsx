import React from 'react';

export const BookmarkCard = ({ b, jobTitle, onRemove, onView, darkMode }) => (
  <div className={`p-4 rounded-2xl shadow-xl border border-white/20 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-md text-white'}`}>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{b.name}</h3>
        <p className="text-sm opacity-80">Applied for: {jobTitle}</p>
      </div>
      <div className="flex space-x-3 items-center">
        <button
          onClick={() => onView(b)}
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-sm transition"
        >
          View
        </button>
        <button onClick={() => onRemove(b)} className="text-yellow-400 text-3xl">
          ★
        </button>
      </div>
    </div>
  </div>
);
