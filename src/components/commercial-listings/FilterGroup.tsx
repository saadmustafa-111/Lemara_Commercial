"use client";

import { Filter } from 'lucide-react';

interface FilterGroupProps {
  title?: string;
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterGroup({ 
  title, 
  filters, 
  activeFilter, 
  onFilterChange 
}: FilterGroupProps) {
  return (
    <div className="filter-group">
      {title && (
        <div className="flex items-center mb-2">
          <Filter size={16} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button 
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-6 py-2 rounded-lg transition duration-300 ${
              activeFilter === filter 
                ? 'bg-[#00a0d1] text-white shadow-sm' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
