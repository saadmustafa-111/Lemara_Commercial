"use client";

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface ListingActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
}

export default function ListingActionsModal({ isOpen, onClose, listingId }: ListingActionsModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Listing Actions</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-2">
          <Link 
            href={`/dashboard/admin/commercial-listings/edit/${listingId}`} 
            className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Edit Listing
          </Link>
          <Link 
            href={`/dashboard/admin/commercial-listings/view/${listingId}`}
            className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            View Listing
          </Link>
          <button 
            onClick={() => {
              // Archive listing logic would go here
              onClose();
            }}
            className="flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Archive Listing
          </button>
          <button 
            onClick={() => {
              // Delete listing logic would go here
              onClose();
            }}
            className="flex items-center w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 mt-4 transition-colors"
          >
            Delete Listing
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="mt-6 w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-md text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
