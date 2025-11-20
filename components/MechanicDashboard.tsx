import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, Calendar, Wrench, MapPin } from 'lucide-react';
import { Card, Button, Badge } from './SharedUI';

const EARNINGS_DATA = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 250 },
  { day: 'Wed', amount: 180 },
  { day: 'Thu', amount: 320 },
  { day: 'Fri', amount: 290 },
  { day: 'Sat', amount: 450 },
  { day: 'Sun', amount: 150 },
];

export const MechanicDashboard: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="bg-revo-cream p-6 sticky top-0 z-30 shadow-sm border-b border-revo-cream-dark/50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-revo-navy uppercase tracking-tight">Dashboard</h1>
            <p className="text-sm font-medium text-revo-navy/60">Welcome back, Mike</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-revo-cream-dark px-3 py-1.5 rounded-full">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            <span className="text-xs font-bold text-revo-navy uppercase">Online</span>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-revo-navy text-white border-none">
                <div className="flex items-center gap-2 opacity-80 mb-2">
                    <DollarSign size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Weekly Earnings</span>
                </div>
                <p className="text-3xl font-bold">$1,760</p>
            </Card>
            <Card className="p-4 bg-white">
                <div className="flex items-center gap-2 text-revo-navy/60 mb-2">
                    <Wrench size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Jobs Completed</span>
                </div>
                <p className="text-3xl font-bold text-revo-navy">12</p>
            </Card>
        </div>

        {/* Chart */}
        <Card className="p-6 h-64 bg-white">
            <h3 className="font-bold text-revo-navy mb-4 text-xs uppercase tracking-wide">Earnings Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EARNINGS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEDCC0" />
                    <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#0A2342', fontWeight: 600}} 
                        dy={10}
                    />
                    <Tooltip 
                        cursor={{fill: '#FFF8E7'}}
                        contentStyle={{borderRadius: '8px', border: '2px solid #0A2342', boxShadow: 'none', backgroundColor: '#fff'}}
                    />
                    <Bar dataKey="amount" fill="#0A2342" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </Card>

        {/* New Job Request */}
        <div>
            <h3 className="font-bold text-revo-navy mb-4 uppercase tracking-wide">New Requests (1)</h3>
            <Card className="p-0 border-2 border-revo-navy overflow-hidden bg-white">
                <div className="bg-revo-navy p-4 flex justify-between items-center">
                    <span className="text-white font-bold text-xs uppercase tracking-wider">Incoming Request</span>
                    <span className="text-xs font-bold text-revo-red bg-white px-2 py-1 rounded">Respond in 04:59</span>
                </div>
                <div className="p-5">
                    <div className="flex justify-between mb-4">
                        <div>
                            <h4 className="font-bold text-lg text-revo-navy">Brake Pad Replacement</h4>
                            <p className="text-revo-navy/60 font-medium text-sm">2018 Honda Civic • 45k miles</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-xl text-success">$185</p>
                            <p className="text-[10px] font-bold uppercase text-revo-navy/40">Est. Earnings</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-revo-navy mb-6 bg-revo-cream p-4 rounded-xl border border-revo-cream-dark">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-revo-red" />
                        <span>123 Mission St, San Francisco<br/><span className="text-xs text-revo-navy/60 font-medium">2.4 miles away</span></span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline">Decline</Button>
                        <Button variant="primary">Accept Job</Button>
                    </div>
                </div>
            </Card>
        </div>

        {/* Schedule */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-revo-navy uppercase tracking-wide">Upcoming Schedule</h3>
                <Calendar size={18} className="text-revo-navy/40" />
            </div>
            <div className="space-y-3">
                <div className="flex gap-4 items-center">
                    <div className="w-12 text-center">
                        <p className="text-xs font-bold text-revo-navy">2:00</p>
                        <p className="text-xs text-revo-navy/40 font-bold">PM</p>
                    </div>
                    <Card className="flex-1 p-4 border-l-4 border-l-revo-red bg-white">
                        <h5 className="font-bold text-sm text-revo-navy">Oil Change & Inspection</h5>
                        <p className="text-xs font-medium text-revo-navy/60">Toyota Camry • Sarah J.</p>
                    </Card>
                </div>
                <div className="flex gap-4 items-center opacity-50">
                    <div className="w-12 text-center">
                        <p className="text-xs font-bold text-revo-navy">4:30</p>
                        <p className="text-xs text-revo-navy/40 font-bold">PM</p>
                    </div>
                    <Card className="flex-1 p-4 border-l-4 border-l-revo-navy bg-white">
                        <h5 className="font-bold text-sm text-revo-navy">Battery Replacement</h5>
                        <p className="text-xs font-medium text-revo-navy/60">Ford F-150 • Mike T.</p>
                    </Card>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};