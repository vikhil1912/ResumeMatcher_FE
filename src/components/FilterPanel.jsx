import React from 'react';

export const FilterPanel = ({ filter, setFilter, jobDescriptions, darkMode }) => (
  <div className={`p-6 rounded-2xl shadow-xl mb-6 border border-white/20 ${darkMode ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-md text-white'}`}>
    <h2 className="text-2xl font-semibold mb-4">Filter Candidates</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block mb-1">Min Score: <span className="font-semibold">{filter.minScore}</span></label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={filter.minScore}
          onChange={e => setFilter({ ...filter, minScore: +e.target.value })}
          className="w-full accent-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">Job Description</label>
        <select
          value={filter.jobId}
          onChange={e => setFilter({ ...filter, jobId: e.target.value })}
          className="w-full px-3 py-2 rounded-md border bg-white/80 text-black"
        >
          <option value="">All Jobs</option>
          {jobDescriptions.map(j => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Experience (Years)</label>
        <select
          value={filter.experience}
          onChange={e => setFilter({ ...filter, experience: e.target.value })}
          className="w-full px-3 py-2 rounded-md border bg-white/80 text-black"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="3">3+</option>
          <option value="5">5+</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Status</label>
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          className="w-full px-3 py-2 rounded-md border bg-white/80 text-black"
        >
          <option value="all">All</option>
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Interview">Interview</option>
        </select>
      </div>
    </div>
  </div>
);
