import React from 'react';

export const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}> = ({ variant = 'primary', size = 'md', className = '', children, onClick, type = 'button', disabled = false }) => {
  
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-slate-800 focus:ring-slate-900 shadow-lg shadow-slate-900/20",
    secondary: "bg-accent text-white hover:bg-indigo-700 focus:ring-indigo-600 shadow-lg shadow-indigo-600/20",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }> = ({ label, error, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      className={`w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent transition-colors outline-none ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; error?: string }> = ({ label, options, error, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select
      className={`w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent transition-colors outline-none ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
      {...props}
    >
      <option value="" disabled>Select an option</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string; center?: boolean }> = ({ title, subtitle, center }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);