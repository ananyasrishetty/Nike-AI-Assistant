import React, { useState } from 'react';
import { ChatIcon } from './components/ChatIcon';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="font-sans">
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">YOUR ULTIMATE NIKE EXPERIENCE</h1>
          <p className="text-gray-600 text-lg">Explore the latest in athletic footwear and apparel. Have a question? Our AI assistant is here to help you gear up.</p>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">Featured Product: The Nike Air Max</h2>
            <img src="https://picsum.photos/seed/nike/800/400" alt="Featured Product" className="w-full h-auto rounded-md my-4"/>
            <p className="text-gray-600">A sneaker icon. Our AI can tell you more about the latest Air Max drops, colorways, and technology. Try asking "What are the newest Air Max shoes?".</p>
          </div>
      </div>
      
      {isChatOpen ? (
        <Chatbot onClose={toggleChat} />
      ) : (
        <ChatIcon onClick={toggleChat} />
      )}
    </div>
  );
};

export default App;