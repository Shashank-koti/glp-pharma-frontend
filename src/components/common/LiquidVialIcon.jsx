import React from 'react';

export default function LiquidVialIcon({ size = 20, className = '', strokeWidth = 1.8, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Top Cap */}
      <rect x="7" y="2.5" width="10" height="3" rx="0.5" />
      {/* Neck lines */}
      <path d="M8.8 5.5v1.5 M15.2 5.5v1.5" />
      {/* Vial Body with Rounded Corners */}
      <rect x="6.5" y="7" width="11" height="14" rx="2" />
      {/* Liquid Vial Label / Badge with Wave Meniscus */}
      <path d="M8.5 12.2c1.8 -0.8 4.2 1.3 7 1.4v4.9h-7z" />
    </svg>
  );
}
