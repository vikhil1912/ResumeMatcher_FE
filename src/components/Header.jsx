import React from 'react';
import { DarkModeToggle } from '../components/DarkModeToggle';

export const Header = ({ user, onLogout, darkMode }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-white drop-shadow">Resume Matcher</h1>
      <p className="mt-2 text-lg text-white/80">Welcome back, {user?.company || 'Recruiter'}!</p>
    </div>
    <div className="flex items-center space-x-4">
      <button
        onClick={onLogout}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          darkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-white/30 hover:bg-white/40 text-white'
        }`}
      >
        Log Out
      </button>
      <DarkModeToggle />
    </div>
  </div>
);
