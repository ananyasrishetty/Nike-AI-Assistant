import React from 'react';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

interface ChatIconProps {
  onClick: () => void;
}

export const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-110"
      aria-label="Open chat"
    >
      <ChatBubbleIcon />
    </button>
  );
};
