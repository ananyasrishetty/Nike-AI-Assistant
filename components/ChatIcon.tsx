import React from 'react';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

interface ChatIconProps {
  onClick: () => void;
}

export const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-sky-500 text-white p-4 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-transform transform hover:scale-110"
      aria-label="Open chat"
    >
      <ChatBubbleIcon />
    </button>
  );
};