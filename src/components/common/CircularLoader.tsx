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
  // Size mapping
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-25 h-25 border-10",
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-full border-t-transparent border-blue-500 animate-spin`}
        style={{ 
          borderTopColor: 'transparent',
          borderColor: '#00a0d1'
        }}
      ></div>
    </div>
  );
};

export default CircularLoader;