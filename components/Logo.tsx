import React from 'react';

interface LogoProps {
  variant?: 'primary' | 'icon' | 'white' | 'black';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'primary', className = '' }) => {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="40" height="40" rx="10" fill="url(#gradient)" />
        {/* Stylized A with asymmetric cut */}
        <path
          d="M20 8L29 30H25L23 24H17L15 30H11L20 8Z"
          fill="white"
        />
        <path
          d="M18 20H22L20 14L18 20Z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (variant === 'white') {
    return (
      <svg
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.1" />
        <path
          d="M20 8L29 30H25L23 24H17L15 30H11L20 8Z"
          fill="white"
        />
        <path
          d="M18 20H22L20 14L18 20Z"
          fill="white"
          fillOpacity="0.2"
        />
        <text x="50" y="22" fill="white" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">Aesthetix</text>
        <text x="50" y="32" fill="white" fillOpacity="0.7" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" letterSpacing="1.5">STUDIO</text>
      </svg>
    );
  }

  if (variant === 'black') {
    return (
      <svg
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="40" height="40" rx="10" fill="#0F172A" />
        <path
          d="M20 8L29 30H25L23 24H17L15 30H11L20 8Z"
          fill="white"
        />
        <path
          d="M18 20H22L20 14L18 20Z"
          fill="#0F172A"
        />
        <text x="50" y="22" fill="#0F172A" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">Aesthetix</text>
        <text x="50" y="32" fill="#64748B" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" letterSpacing="1.5">STUDIO</text>
      </svg>
    );
  }

  // Primary variant
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="url(#primaryGradient)" />
      <path
        d="M20 8L29 30H25L23 24H17L15 30H11L20 8Z"
        fill="white"
      />
      <path
        d="M18 20H22L20 14L18 20Z"
        fill="url(#primaryGradient)"
      />
      <text x="50" y="22" fill="#0F172A" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">Aesthetix</text>
      <text x="50" y="32" fill="#64748B" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" letterSpacing="1.5">STUDIO</text>
      <defs>
        <linearGradient id="primaryGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
      </defs>
    </svg>
  );
};
