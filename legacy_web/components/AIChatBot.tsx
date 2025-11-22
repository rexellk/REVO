import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Bot, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Button } from './SharedUI';

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Hi! I\'m RevoBot. Ask me about car maintenance, strange noises, or booking a mechanic.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const responseText = await sendChatMessage(messages, userMsg.text);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-24 right-4 z-50 bg-revo-navy text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 group border-2 border-revo-cream"
        >
          <Sparkles size={24} className="animate-pulse text-revo-cream" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold uppercase tracking-wide text-sm">Ask AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-4 z-50 w-[calc(100%-32px)] md:w-[360px] h-[500px] max-h-[60vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-revo-navy animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-revo-navy p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Bot size={20} className="text-revo-cream" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wide text-revo-cream">RevoBot</h3>
                <p className="text-[10px] text-revo-cream/70 font-medium">Powered by Gemini 3 Pro</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-revo-cream scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border ${
                    msg.role === 'user'
                      ? 'bg-revo-navy text-white border-revo-navy rounded-tr-sm'
                      : 'bg-white text-revo-navy border-revo-cream-dark rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-revo-cream-dark p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-revo-navy rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-revo-navy rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-revo-navy rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-revo-cream-dark">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 bg-revo-cream border border-revo-cream-dark rounded-full px-4 py-2.5 text-sm focus:border-revo-navy focus:bg-white transition-all outline-none text-revo-navy placeholder:text-revo-navy/40 font-medium"
                disabled={isThinking}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isThinking}
                className="bg-revo-red text-white p-2.5 rounded-full hover:bg-red-800 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};