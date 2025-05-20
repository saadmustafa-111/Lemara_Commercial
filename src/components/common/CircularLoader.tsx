"use client";
import React from "react";

interface CircularLoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({ 
  size = "medium", 
  className = ""
}) => {
  // Increased border width for a bolder spinner
  const sizeClasses = {
    small: "w-6 h-6 border-4",
    medium: "w-10 h-10 border-8",
    large: "w-20 h-20 border-12",
  };

  // Border color mapping for dual-color (blue and white)
  const borderColors = {
    borderTop: "border-t-blue-500",       // Primary color
    borderRight: "border-r-white",        // White accent
    borderBottom: "border-b-blue-200",    // Subtle fade
    borderLeft: "border-l-blue-200",      // Subtle fade
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-solid 
          animate-spin
          border-t-[inherit] border-r-[inherit] border-b-[inherit] border-l-[inherit]
          ${borderColors.borderTop} 
          ${borderColors.borderRight} 
          ${borderColors.borderBottom} 
          ${borderColors.borderLeft}
        `}
        style={{
          borderTopColor: "#3B82F6",    // blue-500
          borderRightColor: "#FFFFFF",  // white
          borderBottomColor: "#BFDBFE", // blue-200
          borderLeftColor: "#BFDBFE",   // blue-200
        }}
      ></div>
    </div>
  );
};

export default CircularLoader;