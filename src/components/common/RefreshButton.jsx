import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const RefreshButton = ({ onClick, isLoading, lastUpdated }) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `Last updated: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {lastUpdated && (
        <span className="text-xs text-gray-500 hidden sm:block">
          {formatTime(lastUpdated)}
        </span>
      )}
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title="Refresh dashboard"
      >
        <ArrowPathIcon 
          className={`h-5 w-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`}
        />
      </button>
    </div>
  );
};

export default RefreshButton;