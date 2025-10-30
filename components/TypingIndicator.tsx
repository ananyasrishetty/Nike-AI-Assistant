import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
      <div className="flex items-center space-x-1.5">
        <div className="w-2 h-2 bg-gray-500 rounded-full dot-pulse dot-pulse-delay-1"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full dot-pulse dot-pulse-delay-2"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full dot-pulse"></div>
      </div>
    </div>
  </div>
);
