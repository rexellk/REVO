import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from './SharedUI';

export const BookingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className="pb-24 min-h-full bg-revo-cream">
      <header className="bg-revo-cream p-6 sticky top-0 z-30 border-b border-revo-cream-dark/50">
        <h1 className="text-xl font-black text-revo-navy uppercase tracking-wide mb-4">My Bookings</h1>
        <div className="flex bg-revo-cream-dark p-1 rounded-xl border border-revo-cream-dark">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'upcoming' ? 'bg-revo-navy text-white shadow-md' : 'text-revo-navy/60 hover:text-revo-navy'
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'past' ? 'bg-revo-navy text-white shadow-md' : 'text-revo-navy/60 hover:text-revo-navy'
            }`}
          >
            History
          </button>
        </div>
      </header>

      <div className="p-6 space-y-4">
        {activeTab === 'upcoming' ? (
          <>
            <Card className="p-0 border-2 border-revo-navy overflow-hidden bg-white">
              <div className="bg-revo-navy p-4 flex justify-between items-center">
                  <span className="text-white font-bold text-xs uppercase tracking-wider">Confirmed Booking</span>
                  <span className="text-xs font-mono text-revo-cream/60">#BK-2938</span>
              </div>
              <div className="p-5">
                  <h3 className="font-black text-xl text-revo-navy mb-1">Oil Change & Filter</h3>
                  <p className="text-sm font-medium text-revo-navy/60 mb-5">Toyota Camry • 2018</p>
                  
                  <div className="space-y-3 text-sm font-medium text-revo-navy mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-revo-red" />
                      <span>Today, Oct 24</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-revo-red" />
                      <span>2:00 PM - 3:00 PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-revo-red" />
                      <span className="truncate">123 Mission St, San Francisco</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" fullWidth>Reschedule</Button>
                    <Button variant="primary" fullWidth>Track</Button>
                  </div>
              </div>
            </Card>

            <Card className="p-5 opacity-75 bg-white">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="warning">Pending</Badge>
                <span className="text-xs text-revo-navy/40 font-medium">#BK-3391</span>
              </div>
              <h3 className="font-bold text-lg text-revo-navy">Brake Inspection</h3>
              <p className="text-sm text-revo-navy/60 mb-4">Toyota Camry • 2018</p>
              <div className="space-y-2 text-sm text-revo-navy">
                 <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-revo-navy/40" />
                  <span>Tomorrow, Oct 25</span>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-5 bg-white">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="success">Completed</Badge>
                <span className="text-xs text-revo-navy/40 font-medium">#BK-1022</span>
              </div>
              <h3 className="font-bold text-lg text-revo-navy">Tire Rotation</h3>
              <p className="text-sm text-revo-navy/60 mb-3">Toyota Camry • 2018</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-revo-navy/60 font-medium">Sep 12, 2023</span>
                <span className="font-black text-revo-navy">$45.00</span>
              </div>
              <Button variant="ghost" className="mt-2 w-full text-xs uppercase font-bold tracking-wider">View Receipt</Button>
            </Card>

            <Card className="p-5 bg-white">
               <div className="flex justify-between items-start mb-3">
                <Badge variant="neutral">Cancelled</Badge>
                <span className="text-xs text-revo-navy/40 font-medium">#BK-0981</span>
              </div>
              <h3 className="font-bold text-lg text-revo-navy">Battery Replacement</h3>
              <p className="text-sm text-revo-navy/60 mb-3">Toyota Camry • 2018</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-revo-navy/60 font-medium">Aug 05, 2023</span>
                <span className="font-bold text-revo-navy/40 line-through">$120.00</span>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};