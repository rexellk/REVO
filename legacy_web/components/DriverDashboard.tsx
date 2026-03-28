import React from 'react';
import { MapPin, Search, Star, Clock, ChevronRight, ShieldCheck, Camera } from 'lucide-react';
import { Button, Card, Icon, Badge } from './SharedUI';
import { Service, Mechanic } from '../types';

const SERVICES: Service[] = [
  { id: '1', title: 'Oil Change', iconName: 'Droplets', priceRange: '$50 - $90', duration: '45m' },
  { id: '2', title: 'Brake Service', iconName: 'Disc', priceRange: '$150 - $300', duration: '2h' },
  { id: '3', title: 'Battery Replace', iconName: 'Zap', priceRange: '$120 - $200', duration: '30m' },
  { id: '4', title: 'Tire Rotation', iconName: 'CircleDashed', priceRange: '$40 - $80', duration: '45m' },
];

const NEARBY_MECHANICS: Mechanic[] = [
  { id: 'm1', name: 'Mike S.', rating: 4.9, completedJobs: 342, isVerified: true, hourlyRate: 85, avatarUrl: 'https://picsum.photos/100/100?random=1', distance: '2.3 mi' },
  { id: 'm2', name: 'Sarah J.', rating: 4.8, completedJobs: 120, isVerified: true, hourlyRate: 75, avatarUrl: 'https://picsum.photos/100/100?random=2', distance: '3.1 mi' },
];

interface DriverDashboardProps {
  onAnalyzeImage: () => void;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ onAnalyzeImage }) => {
  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-revo-cream px-6 pt-8 pb-4 sticky top-0 z-30 shadow-sm border-b border-revo-cream-dark/30">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
             <div className="bg-revo-navy text-revo-cream p-2 rounded-lg">
                <Icon name="Wrench" size={24} />
             </div>
             <span className="text-2xl font-black tracking-tighter text-revo-navy">REVO</span>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-revo-navy p-0.5">
            <img src="https://picsum.photos/100/100?random=99" alt="Profile" className="rounded-full" />
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-revo-navy/50" size={18} />
          <input 
            type="text" 
            placeholder="What service do you need?" 
            className="w-full bg-white pl-10 pr-4 py-3.5 rounded-xl text-sm border-2 border-revo-cream-dark focus:border-revo-navy focus:outline-none text-revo-navy font-medium placeholder:text-revo-navy/40"
          />
        </div>
      </header>

      <div className="p-6 space-y-8">
        
        {/* Insurance / Promo Card - Vintage Style */}
        <div 
          className="bg-revo-navy rounded-2xl p-6 text-revo-cream shadow-xl relative overflow-hidden"
        >
            <div className="relative z-10">
                <h2 className="text-2xl font-black uppercase leading-none mb-4">What our Revo<br/>Mechanics<br/>Should Know<br/>About Coverage</h2>
                <p className="text-sm text-revo-cream/90 font-medium leading-relaxed mb-6 max-w-[70%]">
                    We provide liability protection for all REVO drivers and helpers. This built-in coverage gives both parties confidence.
                </p>
                
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={18} className="text-revo-red" />
                    <span className="font-bold text-sm">Coverage when you're off-duty</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-revo-red" />
                    <span className="font-bold text-sm">Coverage when you're online</span>
                </div>
            </div>
            
            <div className="absolute right-[-20px] bottom-[-20px] opacity-90">
                <Icon name="Shield" size={160} className="text-revo-cream/10" />
            </div>
            <div className="absolute right-4 bottom-4">
                 <h3 className="text-right font-black text-xl leading-none text-revo-cream">IN APP<br/><span className="text-revo-red">INSURANCE</span></h3>
            </div>
        </div>

        {/* AI Feature Banner */}
         <div 
          onClick={onAnalyzeImage}
          className="bg-revo-light border-2 border-revo-navy/10 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-revo-navy transition-colors"
        >
            <div className="bg-revo-red p-3 rounded-xl text-white">
                <Camera size={24} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-revo-navy">Snap & Diagnose</h3>
                <p className="text-xs text-revo-navy/60 font-medium mt-0.5">Use Gemini AI to identify car issues instantly.</p>
            </div>
            <ChevronRight className="text-revo-navy/40" />
        </div>

        {/* Services Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-revo-navy text-lg uppercase tracking-wide">Services</h3>
            <span className="text-revo-red text-sm font-bold uppercase cursor-pointer hover:underline">View All</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map(service => (
              <Card key={service.id} className="p-4 hover:border-revo-navy transition-all cursor-pointer group border-2 border-transparent hover:shadow-md bg-white">
                <div className="h-10 w-10 rounded-lg bg-revo-cream flex items-center justify-center mb-3 text-revo-navy group-hover:bg-revo-navy group-hover:text-white transition-colors">
                  <Icon name={service.iconName} size={20} />
                </div>
                <h4 className="font-bold text-revo-navy">{service.title}</h4>
                <p className="text-xs font-bold text-revo-navy/50 mt-1">{service.priceRange}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Nearby Mechanics */}
        <section>
          <h3 className="font-bold text-revo-navy text-lg mb-4 uppercase tracking-wide">Trusted Revivors</h3>
          <div className="flex flex-col gap-4">
            {NEARBY_MECHANICS.map(mechanic => (
              <Card key={mechanic.id} className="p-5 flex gap-4 items-start border border-revo-cream-dark bg-white">
                <img src={mechanic.avatarUrl} alt={mechanic.name} className="w-16 h-16 rounded-full object-cover border-2 border-revo-cream-dark" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-revo-navy text-lg flex items-center gap-1">
                        {mechanic.name} 
                        {mechanic.isVerified && <Badge variant="blue">Elite</Badge>}
                      </h4>
                      <div className="flex items-center gap-1 text-xs font-medium text-revo-navy/60 mt-1">
                        <Star size={12} className="text-revo-navy fill-revo-navy" />
                        <span className="text-revo-navy">{mechanic.rating}</span>
                        <span>({mechanic.completedJobs} reviews)</span>
                      </div>
                      <p className="text-xs font-medium text-revo-navy/40 mt-1">{mechanic.distance} • 302 tasks overall</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-revo-navy text-lg">${mechanic.hourlyRate}</p>
                      <p className="text-[10px] uppercase font-bold text-revo-navy/40">Per Hour</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Active Booking Teaser (Bottom CTA Style) */}
        <div className="bg-revo-navy rounded-[2.5rem] p-0 mt-4 shadow-xl">
             <div className="p-8">
                <Button variant="secondary" fullWidth className="py-4 text-lg font-black shadow-xl hover:scale-[1.02] transition-transform">Book a Revivor Today</Button>
             </div>
        </div>
      </div>
    </div>
  );
};