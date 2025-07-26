import React from 'react';

export const TabNavigation = ({ activeTab, setActiveTab}) => (
  <div className="flex justify-around border-b border-white/20 mb-8 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
    {['candidates', 'jds', 'bookmarks'].map(tab => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 py-3 text-center text-sm sm:text-base font-semibold transition ${
          activeTab === tab
            ? 'text-white border-b-2 border-white bg-white/20'
            : 'text-white/70 hover:text-white'
        }`}
      >
        {tab === 'jds' ? 'Job Descriptions' : tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);
