import React, { useState } from 'react';
import { ChatIcon } from './components/ChatIcon';
import Chatbot from './components/Chatbot';

// A reliable, embedded SVG component for the featured product image.
const FeaturedProductImage: React.FC = () => (
  <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="shoe-title">
    <title id="shoe-title">Stylized Nike Shoe</title>
    <path d="M768.4 256.7c-24.8-3.3-48.4-9.9-70.4-19.1-103-43.2-192.3-118.8-302.2-132.3-43.1-5.3-88.3 1-130.6 12.8-33.1 9.2-64.6 22.1-94.2 38.6-11.8 6.5-23.2 13.6-34 21.2v72.8c11.6-4.5 23.6-8.5 35.8-11.9 31-8.5 63.3-14.9 96.1-18.7 65.5-7.5 133.5-1.9 198.2 12.3 93.3 20.6 172.4 78.4 259.9 113.5 16.5 6.6 33.3 12.4 50.4 17.3.3-1.8.6-3.6.9-5.4 4.5-31.9 1-64.3-15.4-92z" fill="#E0F2FE" />
    <path d="M125.7 326.6c-27-2.3-54.1-3.3-81.1-2.9v-52.9c22.5.2 44.9.9 67.2 2.3 35.3 2.2 70.8 5.6 105.7 10.9 96.6 14.5 191.5 39.8 281.3 70.9 18.6 6.4 37 12.6 55.4 18.6.6-4.7 1-9.4 1.2-14.2-18.3-6.2-36.6-12.6-54.8-19.1-90.1-32-185.5-58.1-282.6-72.9-32.9-5-66.3-8.3-99.6-10.1-11.6-.6-23.2-1-34.8-1.2v-45.6c11.5.1 23 .3 34.5.8 33.8 1.4 67.8 4.6 101.1 9.9 104.5 16.7 203.4 53.6 295 106.7 13.9 8.1 27.5 16.5 40.8 25.4-3.6 25-13.4 48.7-28.8 69.4-93.1-33.1-189.6-59.9-289.4-74.8-35.3-5.3-71-8.7-106.6-10z" fill="#bae6fd" />
    <path d="M718.9 389.2c-15.8-50.6-52.9-90.1-100.8-109.2-101.4-40.4-213-48-320.8-21.1-22.3 5.5-44.1 12.5-65.4 20.8-14.2 5.5-28.1 11.4-41.6 17.9v69.8c14.1-5.6 28.5-10.7 43.2-15.2 21.2-6.5 42.9-12 65-16.5 108.7-22.3 223-14.2 328.6 19.8 44.4 14.2 82.3 40.2 110.1 76.5 1.2-6.5 2.1-13 2.9-19.6-6.8-9.4-14-18.5-21.8-27.1z" fill="#7DD3FC" />
  </svg>
);


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
            <h2 className="text-2xl font-semibold text-gray-700">Featured Product: Nike Air Vector</h2>
            <div className="w-full h-auto rounded-md my-4 bg-gray-50 p-4">
              <FeaturedProductImage />
            </div>
            <p className="text-gray-600">Discover the perfect fusion of art and innovation. The Air Vector combines futuristic design with unparalleled comfort. Its lightweight construction and responsive cushioning make it ideal for everyday wear. Ask our AI assistant about available colors!</p>
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
