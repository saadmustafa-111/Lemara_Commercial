"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavourites, FavouriteProperty } from '@/hooks/useFavourites';

interface FavouriteButtonProps {
  property: FavouriteProperty | any;
  variant?: 'default' | 'outline' | 'card';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ 
  property, 
  variant = 'default', 
  size = 'md',
  className = ''
}) => {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const isFavourited = isFavourite(property.id);
  
  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavourited) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'p-1.5 rounded-full',
    md: 'p-2 rounded-full',
    lg: 'p-3 rounded-full'
  };
  
  // Icon size classes
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  // Variant classes
  const variantClasses = {
    default: isFavourited 
      ? 'bg-red-500 text-white hover:bg-red-600' 
      : 'bg-white text-gray-500 hover:text-red-500 hover:bg-gray-100',
    outline: isFavourited
      ? 'border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-50'
      : 'border-2 border-gray-300 bg-transparent text-gray-500 hover:border-red-500 hover:text-red-500',
    card: isFavourited
      ? 'bg-white/90 backdrop-blur-sm shadow-md text-red-500'
      : 'bg-white/90 backdrop-blur-sm shadow-md text-gray-500 hover:text-red-500'
  };
  
  return (
    <button
      type="button"
      onClick={handleToggleFavourite}
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        transition-colors duration-200
        ${className}
      `}
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart 
        className={`${iconSizeClasses[size]} ${isFavourited ? 'fill-current' : ''}`} 
      />
    </button>
  );
};

export default FavouriteButton;
