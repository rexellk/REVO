import React from 'react';
import * as Lucide from 'lucide-react';

// --- Icons ---
export const Icon = ({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) => {
  const LucideIcon = (Lucide as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} />;
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  fullWidth?: boolean;
  iconName?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', fullWidth = false, iconName, className = "", ...props 
}) => {
  const baseStyle = "flex items-center justify-center px-4 py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-revo-navy text-revo-cream hover:bg-opacity-90 shadow-md",
    secondary: "bg-revo-red text-white hover:bg-red-800 shadow-md",
    outline: "bg-transparent border-2 border-revo-navy text-revo-navy hover:bg-revo-navy/5",
    danger: "bg-revo-red text-white hover:bg-red-800",
    ghost: "bg-transparent text-revo-navy hover:bg-revo-navy/5"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} 
      {...props}
    >
      {iconName && <Icon name={iconName} className="mr-2" size={18} />}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-revo-light rounded-2xl shadow-sm border border-revo-cream-dark/50 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-bold text-revo-navy uppercase tracking-wide">{label}</label>}
    <input 
      className={`w-full px-4 py-3 rounded-xl border-2 border-revo-cream-dark bg-white focus:border-revo-navy focus:ring-0 outline-none transition-all text-revo-navy placeholder:text-revo-navy/40 ${className}`}
      {...props}
    />
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'neutral' | 'blue' }> = ({ children, variant = 'neutral' }) => {
  const styles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
    neutral: "bg-revo-cream-dark text-revo-navy",
    blue: "bg-revo-navy text-white"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};