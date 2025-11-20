import React from 'react';
import { Search, Check, CheckCheck } from 'lucide-react';
import { Card } from './SharedUI';

export const MessagesScreen: React.FC = () => {
  const messages = [
    {
      id: 1,
      name: "Mike S.",
      role: "Mechanic",
      avatar: "https://picsum.photos/100/100?random=1",
      lastMessage: "I'm about 10 minutes away. Traffic is a bit heavy on Main St.",
      time: "2m ago",
      unread: 2,
      isOnline: true
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Service Advisor",
      avatar: "https://picsum.photos/100/100?random=2",
      lastMessage: "Did the oil change solve the noise issue you were hearing?",
      time: "1d ago",
      unread: 0,
      isOnline: false
    },
    {
      id: 3,
      name: "Revo Support",
      role: "Support",
      avatar: "https://picsum.photos/100/100?random=3",
      lastMessage: "Your refund for the cancelled booking has been processed.",
      time: "3d ago",
      unread: 0,
      isOnline: false
    }
  ];

  return (
    <div className="pb-24 min-h-full bg-revo-cream">
      <header className="bg-revo-cream p-6 sticky top-0 z-30 border-b border-revo-cream-dark/50">
        <h1 className="text-xl font-black text-revo-navy uppercase tracking-wide mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-revo-navy/40" size={18} />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl text-sm border border-revo-cream-dark focus:outline-none focus:border-revo-navy focus:ring-0 placeholder:text-revo-navy/30 font-medium text-revo-navy"
          />
        </div>
      </header>

      <div className="px-2">
        {messages.map((msg) => (
          <div key={msg.id} className="p-4 hover:bg-white/50 rounded-xl cursor-pointer transition-colors flex gap-4 border-b border-revo-cream-dark/30 last:border-0">
            <div className="relative">
              <img src={msg.avatar} alt={msg.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
              {msg.isOnline && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-revo-navy truncate text-lg">{msg.name}</h3>
                <span className="text-xs font-bold text-revo-navy/40 shrink-0">{msg.time}</span>
              </div>
              <p className={`text-sm truncate ${msg.unread > 0 ? 'font-bold text-revo-navy' : 'text-revo-navy/60 font-medium'}`}>
                {msg.lastMessage}
              </p>
            </div>
            {msg.unread > 0 && (
              <div className="flex flex-col justify-center items-end">
                <span className="bg-revo-red text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  {msg.unread}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};