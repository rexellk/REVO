import React, { useState } from 'react';
import { Home, Wrench, User, MessageSquare } from 'lucide-react';
import { UserRole, Screen } from './types';
import { DriverDashboard } from './components/DriverDashboard';
import { MechanicDashboard } from './components/MechanicDashboard';
import { AIChatBot } from './components/AIChatBot';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { MessagesScreen } from './components/MessagesScreen';
import { BookingsScreen } from './components/BookingsScreen';
import { ProfileScreen } from './components/ProfileScreen';

function App() {
  // State for simulating routing and auth
  const [userRole, setUserRole] = useState<UserRole>(UserRole.DRIVER);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DRIVER_HOME);
  const [showImageAnalyzer, setShowImageAnalyzer] = useState(false);

  // --- Layout Components ---
  
  const TabBar = () => {
    const isActive = (screen: Screen) => currentScreen === screen;
    const isHomeActive = currentScreen === Screen.DRIVER_HOME || currentScreen === Screen.MECHANIC_HOME;

    return (
      <nav className="absolute bottom-0 left-0 right-0 w-full bg-revo-cream border-t-2 border-revo-navy pb-safe pt-2 px-6 flex justify-between items-center z-40 h-20 shadow-lg">
        <button 
          onClick={() => {
            setCurrentScreen(userRole === UserRole.DRIVER ? Screen.DRIVER_HOME : Screen.MECHANIC_HOME);
          }}
          className={`flex flex-col items-center gap-1 w-16 transition-colors duration-200 ${
            isHomeActive ? 'text-revo-red' : 'text-revo-navy/60 hover:text-revo-navy'
          }`}
        >
          <Home size={24} strokeWidth={isHomeActive ? 3 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
        </button>

        <button 
          onClick={() => setCurrentScreen(Screen.MESSAGES)}
          className={`flex flex-col items-center gap-1 w-16 transition-colors duration-200 ${
            isActive(Screen.MESSAGES) ? 'text-revo-red' : 'text-revo-navy/60 hover:text-revo-navy'
          }`}
        >
          <MessageSquare size={24} strokeWidth={isActive(Screen.MESSAGES) ? 3 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Messages</span>
        </button>

        <button 
          onClick={() => setCurrentScreen(Screen.BOOKINGS)}
          className={`flex flex-col items-center gap-1 w-16 transition-colors duration-200 ${
            isActive(Screen.BOOKINGS) ? 'text-revo-red' : 'text-revo-navy/60 hover:text-revo-navy'
          }`}
        >
          <Wrench size={24} strokeWidth={isActive(Screen.BOOKINGS) ? 3 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Bookings</span>
        </button>

        <button 
          onClick={() => setCurrentScreen(Screen.PROFILE)}
          className={`flex flex-col items-center gap-1 w-16 transition-colors duration-200 ${
            isActive(Screen.PROFILE) ? 'text-revo-red' : 'text-revo-navy/60 hover:text-revo-navy'
          }`}
        >
          <User size={24} strokeWidth={isActive(Screen.PROFILE) ? 3 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Profile</span>
        </button>
      </nav>
    );
  };

  // --- Role Switcher (For Demo Purposes) ---
  const DemoRoleSwitcher = () => (
    <div className="fixed top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
      <button 
        onClick={() => {
          const newRole = userRole === UserRole.DRIVER ? UserRole.MECHANIC : UserRole.DRIVER;
          setUserRole(newRole);
          // Reset to home screen of new role to avoid confusion
          setCurrentScreen(newRole === UserRole.DRIVER ? Screen.DRIVER_HOME : Screen.MECHANIC_HOME);
        }}
        className="bg-revo-navy text-revo-cream text-xs px-3 py-1 rounded-full shadow-xl font-bold border border-revo-cream"
      >
        Switch to {userRole === UserRole.DRIVER ? 'Mechanic' : 'Driver'}
      </button>
    </div>
  );

  // --- Main Render Logic ---

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DRIVER_HOME:
        return <DriverDashboard onAnalyzeImage={() => setShowImageAnalyzer(true)} />;
      case Screen.MECHANIC_HOME:
        return <MechanicDashboard />;
      case Screen.MESSAGES:
        return <MessagesScreen />;
      case Screen.BOOKINGS:
        return <BookingsScreen />;
      case Screen.PROFILE:
        return <ProfileScreen role={userRole} />;
      default:
        return <DriverDashboard onAnalyzeImage={() => setShowImageAnalyzer(true)} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-revo-cream flex justify-center items-center overflow-hidden font-sans text-revo-navy">
      
      {/* Demo Tool */}
      <DemoRoleSwitcher />

      {/* Mobile App Container */}
      <main className="w-full max-w-md h-full md:h-[850px] md:max-h-screen bg-revo-cream relative shadow-2xl overflow-hidden flex flex-col md:rounded-3xl md:border-8 md:border-revo-navy/10">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-revo-cream">
          {renderScreen()}
        </div>

        {/* Navigation */}
        <TabBar />

        {/* Feature: AI Chatbot (Global) */}
        <AIChatBot />

        {/* Feature: Image Analyzer Modal */}
        {showImageAnalyzer && (
          <ImageAnalyzer onClose={() => setShowImageAnalyzer(false)} />
        )}

      </main>
    </div>
  );
}

export default App;