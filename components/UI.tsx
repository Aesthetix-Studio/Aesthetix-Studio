import React from 'react';

export const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}> = ({ variant = 'primary', size = 'md', className = '', children, onClick, type = 'button', disabled = false }) => {
  
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-lg shadow-slate-900/20",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600 shadow-lg shadow-indigo-600/20 active:bg-indigo-800",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm sm:px-4 sm:py-2.5",
    md: "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
    xl: "px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl"
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
    <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">{label}</label>
    <input
      className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent transition-colors outline-none ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
      {...props}
    />
    {error && <p className="mt-2 text-xs sm:text-sm text-red-500">{error}</p>}
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; error?: string }> = ({ label, options, error, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2">{label}</label>
    <select
      className={`w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border rounded-md bg-white focus:ring-2 focus:ring-accent focus:border-accent transition-colors outline-none ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
      {...props}
    >
      <option value="" disabled>Select an option</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="mt-2 text-xs sm:text-sm text-red-500">{error}</p>}
  </div>
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string; center?: boolean }> = ({ title, subtitle, center }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">{title}</h2>
    {subtitle && <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

// Typography components for consistent sizing
export const Heading: React.FC<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}> = ({ level, className = '', children }) => {
  const baseStyles = "font-bold text-slate-900 tracking-tight";
  
  const sizes = {
    1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight",
    2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight",
    3: "text-xl sm:text-2xl md:text-3xl leading-tight",
    4: "text-lg sm:text-xl md:text-2xl leading-tight",
    5: "text-base sm:text-lg md:text-xl leading-tight",
    6: "text-sm sm:text-base md:text-lg leading-tight"
  };

  const headingClass = `${baseStyles} ${sizes[level]} ${className}`;
  
  switch (level) {
    case 1:
      return <h1 className={headingClass}>{children}</h1>;
    case 2:
      return <h2 className={headingClass}>{children}</h2>;
    case 3:
      return <h3 className={headingClass}>{children}</h3>;
    case 4:
      return <h4 className={headingClass}>{children}</h4>;
    case 5:
      return <h5 className={headingClass}>{children}</h5>;
    case 6:
      return <h6 className={headingClass}>{children}</h6>;
    default:
      return <h2 className={headingClass}>{children}</h2>;
  }
};

export const Text: React.FC<{
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}> = ({ size = 'base', className = '', children }) => {
  const sizes = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
    xl: "text-xl sm:text-2xl"
  };

  return (
    <p className={`${sizes[size]} ${className}`}>
      {children}
    </p>
  );
};