import React from "react";

interface ImpactCoinProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ImpactCoin: React.FC<ImpactCoinProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} inline-block`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle with dark gold border */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="#B8860B"
          strokeWidth="2"
        />

        {/* Inner circle with bright yellow/gold fill */}
        <circle cx="12" cy="12" r="9" fill="#FFD700" />

        {/* Highlight on top-left */}
        <circle cx="9" cy="9" r="2" fill="#FFF8DC" opacity="0.8" />

        {/* IMP text */}
        <text
          x="12"
          y="12"
          fontSize="7"
          fontWeight="bold"
          fill="#8B4513"
          fontFamily="Arial, sans-serif"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          IMP
        </text>

        {/* Subtle shadow */}
        <circle
          cx="12.5"
          cy="12.5"
          r="11"
          fill="none"
          stroke="#000000"
          strokeWidth="0.5"
          opacity="0.1"
        />
      </svg>
    </div>
  );
};
