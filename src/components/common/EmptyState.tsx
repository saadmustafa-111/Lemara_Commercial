"use client";

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Favourite Properties Yet",
  subtitle = "Properties you mark as favourites will appear here",
  icon,
  actionLabel = "Browse Properties",
  actionLink = "/listings"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        {icon || <Heart className="h-10 w-10 text-gray-400" />}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 max-w-md mb-8">{subtitle}</p>
      <Link
        href={actionLink}
        className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
      >
        {actionLabel}
      </Link>
    </div>
  );
};

export default EmptyState;
