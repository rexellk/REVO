import React from 'react';
import { User, Settings, CreditCard, Car, FileText, LogOut, ChevronRight, Shield } from 'lucide-react';
import { UserRole } from '../types';
import { Card, Button } from './SharedUI';

interface ProfileScreenProps {
  role: UserRole;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ role }) => {
  return (
    <div className="pb-24 min-h-full bg-revo-cream">
      <div className="bg-revo-cream p-6 pb-8 border-b border-revo-cream-dark/50">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-revo-cream-dark rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg p-1">
            <img src="https://picsum.photos/200/200?random=99" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-black text-revo-navy mb-1">
            {role === UserRole.DRIVER ? 'Alex Thompson' : 'Mike Stevenson'}
          </h2>
          <p className="text-revo-navy/60 font-medium mb-4 text-sm uppercase tracking-wide">
            {role === UserRole.DRIVER ? 'Premium Member' : 'Master Mechanic • ASE Certified'}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="py-2 px-6 text-xs h-auto bg-white">Edit Profile</Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {role === UserRole.MECHANIC && (
          <Card className="p-4 bg-revo-navy text-white border-none">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full text-white">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Verification Status</h3>
                <p className="text-sm text-white/80 font-medium">Verified • Level 3</p>
              </div>
            </div>
          </Card>
        )}

        <section>
          <h3 className="text-xs font-black text-revo-navy/40 uppercase tracking-widest mb-3 ml-1">
            {role === UserRole.DRIVER ? 'My Garage' : 'Professional'}
          </h3>
          <Card className="divide-y divide-revo-cream-dark/50 bg-white border border-revo-cream-dark">
            {role === UserRole.DRIVER ? (
              <button className="w-full p-4 flex items-center justify-between hover:bg-revo-cream transition-colors">
                <div className="flex items-center gap-3">
                  <Car size={20} className="text-revo-navy/60" />
                  <span className="font-bold text-revo-navy text-sm">My Vehicles</span>
                </div>
                <ChevronRight size={18} className="text-revo-navy/30" />
              </button>
            ) : (
               <button className="w-full p-4 flex items-center justify-between hover:bg-revo-cream transition-colors">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-revo-navy/60" />
                  <span className="font-bold text-revo-navy text-sm">Certifications</span>
                </div>
                <ChevronRight size={18} className="text-revo-navy/30" />
              </button>
            )}
            <button className="w-full p-4 flex items-center justify-between hover:bg-revo-cream transition-colors">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-revo-navy/60" />
                <span className="font-bold text-revo-navy text-sm">Payment Methods</span>
              </div>
              <ChevronRight size={18} className="text-revo-navy/30" />
            </button>
          </Card>
        </section>

        <section>
          <h3 className="text-xs font-black text-revo-navy/40 uppercase tracking-widest mb-3 ml-1">Account</h3>
          <Card className="divide-y divide-revo-cream-dark/50 bg-white border border-revo-cream-dark">
            <button className="w-full p-4 flex items-center justify-between hover:bg-revo-cream transition-colors">
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-revo-navy/60" />
                <span className="font-bold text-revo-navy text-sm">Settings</span>
              </div>
              <ChevronRight size={18} className="text-revo-navy/30" />
            </button>
             <button className="w-full p-4 flex items-center justify-between hover:bg-red-50 text-revo-red transition-colors">
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="font-bold text-sm">Log Out</span>
              </div>
            </button>
          </Card>
        </section>
        
        <div className="text-center text-[10px] font-bold text-revo-navy/30 mt-8 uppercase tracking-widest">
          Version 2.4.0 (Build 2039)
        </div>
      </div>
    </div>
  );
};