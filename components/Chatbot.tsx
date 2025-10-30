import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Chat, FunctionResponse } from '@google/genai';
import { initChat } from '../services/geminiService';
import { getOrderStatus } from '../services/mockApi';
import { Message, Role } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';
import { TypingIndicator } from './TypingIndicator';
import { NikeSwooshIcon } from './icons/NikeSwooshIcon';

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: Role.MODEL, text: "Welcome to Nike! I can help with product questions or check your order status. What can I do for you today?" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chat = initChat();
    if (chat) {
        chatRef.current = chat;
    } else {
        setError("Chat service is unavailable. Please ensure the API key is configured correctly.");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    if (!chatRef.current) {
        setError("Cannot send message. Chat is not initialized.");
        return;
    }

    const userMessage: Message = { role: Role.USER, text: userInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      let response = await chatRef.current.sendMessage({ message: currentInput });
      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        const functionResponsesForApi: FunctionResponse[] = [];

        for (const fc of functionCalls) {
            if (fc.name === 'getOrderStatus') {
                const result = await getOrderStatus(fc.args.orderNumber as string);
                functionResponsesForApi.push({
                    id: fc.id,
                    name: fc.name,
                    response: { result },
                });
            }
        }
        
        if (functionResponsesForApi.length > 0) {
            response = await chatRef.current.sendMessage({
                toolResponse: { functionResponses: functionResponsesForApi },
            });
        }
      }

      const modelMessage: Message = { role: Role.MODEL, text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = "Sorry, I'm having trouble connecting. Please try again later.";
      setError(errorMessage);
      setMessages(prev => [...prev, { role: Role.MODEL, text: errorMessage }]);
      console.error("Gemini API error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[calc(100%-2rem)] sm:w-full max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white rounded-t-2xl flex-shrink-0">
        <div className="flex items-center space-x-3">
            <NikeSwooshIcon />
            <h2 className="font-bold text-lg">Nike Assistant</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close chat">
          <CloseIcon />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl whitespace-pre-wrap ${msg.role === Role.USER ? 'bg-black text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          {error && !isLoading && <p className="text-red-500 text-sm px-2">{error}</p>}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t bg-white rounded-b-2xl flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            disabled={isLoading || !!error}
            aria-label="Chat input"
          />
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            disabled={!userInput.trim() || isLoading || !!error}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
