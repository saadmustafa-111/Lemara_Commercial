"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Loader } from 'lucide-react';

interface ListingData {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  market: string | null;
  listingType: string | null;
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  neighborhood: string | null;
  assessorsPArcelNumber: string | null;
  latitude: number | null;
  longitude: number | null;
  sellerFinancing: boolean | null;
  oppertunityZone: boolean | null;
  description: string | null;
  highlights: string | null;
  confidentiality: string | null;
  availableToBroker: boolean | null;
  visibility: string | null;
}

interface ListingActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
}

export default function ListingActionsModal({ isOpen, onClose, listingId }: ListingActionsModalProps) {
  const [listing, setListing] = useState<ListingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && listingId) {
      fetchListingData(listingId);
    }
  }, [isOpen, listingId]);

  const fetchListingData = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      try {
        // First try proxy API route (safer approach)
        response = await fetch(`/api/listings?id=${id}`);
        
        if (!response.ok) {
          // Try direct connection to API as fallback
          console.log("Trying direct API connection as fallback");
          response = await fetch(`https://lemara-9829c937fd90.herokuapp.com/listings/${id}`);
        }
      } catch (error) {
        console.log("API connection failed:", error);
        throw new Error("Failed to connect to the API");
      }
      
      if (!response.ok) {
        throw new Error(`Error fetching listing: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Listing data fetched:", data);
      setListing(data);
    } catch (err) {
      console.error("Failed to fetch listing data:", err);
      setError("Unable to load listing details");
    } finally {
      setIsLoading(false);
    }
  };
  
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

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Loading listing details...</p>
            <p className="text-xs text-gray-400 mt-2">Fetching information for listing #{listingId}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">{error}</p>
              <p className="text-sm mt-1">Please try again or contact support if the issue persists.</p>
              <button 
                onClick={() => listingId && fetchListingData(listingId)}
                className="text-red-800 underline text-sm mt-1 hover:text-red-900"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {listing && !isLoading && (
          <div className="mb-4 p-4 bg-gray-50 rounded-md space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{listing.address || 'No address specified'}</h4>
                <p className="text-sm text-gray-600">
                  {[listing.city, listing.state, listing.postalCode].filter(Boolean).join(', ') || 'Location not specified'}
                </p>
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${listing.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-xs font-medium">{listing.isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Listing ID</p>
                <p className="text-gray-800">{listing.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-gray-800 capitalize">{listing.listingType || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Market</p>
                <p className="text-gray-800 capitalize">{listing.market || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-gray-800">{new Date(listing.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            {listing.description && (
              <div className="pt-2">
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-gray-800 text-sm line-clamp-2">{listing.description}</p>
              </div>
            )}
          </div>
        )}
        
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
            onClick={async () => {
              if (!listing) return;
              
              setIsLoading(true);
              try {
                // Use the API route to toggle the isActive status
                const newStatus = !listing.isActive;
                
                let response;
                try {
                  // Try the API route
                  response = await fetch(`/api/listings/${listing.id}/status`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ isActive: newStatus }),
                  });
                  
                  if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                  }
                  
                  const result = await response.json();
                  console.log('Status update result:', result);
                  
                  // Update the local state to reflect the change
                  setListing({
                    ...listing,
                    isActive: newStatus,
                    updatedAt: new Date().toISOString()
                  });
                  
                  // Show success feedback (this could be a toast notification in a real app)
                  alert(`Listing successfully ${listing.isActive ? 'archived' : 'activated'}`);
                } catch (error) {
                  console.error('API call failed:', error);
                  
                  // Fallback to just updating the UI without an API call for the demo
                  console.log('Using fallback approach - updating UI only');
                  
                  // Update the local state
                  setListing({
                    ...listing,
                    isActive: newStatus,
                    updatedAt: new Date().toISOString()
                  });
                  
                  // Show success feedback
                  alert(`Listing ${newStatus ? 'activated' : 'archived'} (UI only)`);
                }
              } catch (error) {
                console.error('Failed to update listing status:', error);
                setError('Failed to update listing status');
              } finally {
                setIsLoading(false);
              }
            }}
            className={`flex items-center w-full text-left px-4 py-2 rounded-md transition-colors ${
              listing?.isActive 
                ? 'hover:bg-amber-50 text-amber-700' 
                : 'hover:bg-emerald-50 text-emerald-700'
            }`}
            disabled={isLoading}
          >
            {listing?.isActive ? 'Archive Listing' : 'Activate Listing'}
          </button>
          <button 
            onClick={() => {
              // Confirm before deletion
              if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
                // In a real application, this would call a deletion API endpoint
                alert('In a production environment, this would delete the listing.');
                
                // Close the modal after deletion
                onClose();
              }
            }}
            className="flex items-center w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 mt-4 transition-colors"
            disabled={isLoading}
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
