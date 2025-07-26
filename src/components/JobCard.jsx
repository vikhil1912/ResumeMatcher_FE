import React from 'react';

export const JobCard = ({ job, onDelete, darkMode }) => (
  <div className={`p-4 rounded-2xl shadow-xl border border-white/20 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-md text-white'}`}>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <p className="text-sm opacity-80 mt-1">{job.description}</p>
        <p className="text-xs opacity-60 mt-1">Posted on: {job.date}</p>
      </div>
      <button
        onClick={() => onDelete(job.id)}
        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-sm transition"
      >
        Delete
      </button>
    </div>
  </div>
);
