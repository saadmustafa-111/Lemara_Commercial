"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Edit,
  Share,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Mail,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { CommercialListing } from '../../../../../../types';

interface ViewListingPageProps {
  params: {
    id: string;
  };
}

export default function ViewListingPage({ params }: ViewListingPageProps) {
  const router = useRouter();
  const { id } = params;
  const [listing, setListing] = useState<CommercialListing | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching listing data
  useEffect(() => {
    // In a real app, you would fetch the listing data from your API
    const mockListing: CommercialListing = {
      id,
      source: 'AJ Rana',
      name: 'LICENSED GREEN-HOUSE CANNABIS FARM!',
      city: 'Salinas',
      listPrice: '7750000.00',
      createDate: '8/19/2019',
      reInc: 'N',
      documents: 'N',
      contacts: '868',
      img: '1',
      status: 'Active'
    };
    
    // Simulate API delay
    setTimeout(() => {
      setListing(mockListing);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="p-4 md:p-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 mb-3"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <h2 className="text-lg font-medium mb-2">Listing Not Found</h2>
          <p>The requested listing could not be found. It may have been deleted or you don't have permission to view it.</p>
          <Link 
            href="/dashboard/admin/commercial-listings" 
            className="mt-4 inline-block text-[#00a0d1] hover:underline"
          >
            Return to listings
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 md:p-6">
      {/* Header with title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/admin/commercial-listings" 
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate max-w-md md:max-w-lg">
            {listing.name}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push(`/dashboard/admin/commercial-listings/edit/${id}`)}
            className="flex items-center gap-2 bg-[#00a0d1] hover:bg-[#0088b3] text-white py-2 px-4 rounded-lg transition duration-300"
          >
            <Edit size={18} />
            <span>Edit Listing</span>
          </button>
          
          <button 
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition duration-300"
          >
            <Share size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>
      
      {/* Listing details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
              {/* Replace with actual image */}
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <ImageIcon size={64} className="text-gray-400 mb-4" />
                <p className="text-gray-500">No images available for this listing</p>
              </div>
            </div>
            
            {/* Thumbnails row would go here */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-24 h-16 rounded bg-gray-100 flex-shrink-0"></div>
              ))}
            </div>
          </div>
            {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 text-[#00a0d1]">Description</h2>
            <p className="text-gray-600">
              {listing.name}. This is a detailed description of the property. Additional information about the commercial property would appear here, including key selling points, history, and other relevant details.
            </p>
          </div>
          
          {/* Documents section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Documents</h2>
            
            {listing.documents === 'N' ? (
              <p className="text-gray-500">No documents available for this listing</p>
            ) : (
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#00a0d1]" />
                    <span>Listing Agreement.pdf</span>
                  </div>
                  <button className="text-[#00a0d1] hover:underline">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Sidebar info */}
        <div className="space-y-6">
          {/* Status card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Status</h2>
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  listing.status === 'Active' ? 'bg-green-100 text-green-800' :
                  listing.status === 'Sold' ? 'bg-blue-100 text-blue-800' : 
                  listing.status === 'Featured' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {listing.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#00a0d1]">
                  <DollarSign size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">List Price</p>
                  <p className="font-semibold text-gray-800">
                    ${Number(listing.listPrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-800">{listing.city || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Listed Date</p>
                  <p className="font-semibold text-gray-800">{listing.createDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Source info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-4">Source Information</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <span className="text-lg font-bold">{listing.source.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{listing.source}</p>
                <p className="text-sm text-gray-500">Listing Source</p>
              </div>
            </div>
          </div>
          
          {/* Contacts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Contacts</h2>
              <span className="text-sm text-gray-500">{listing.contacts}</span>
            </div>
            
            {parseInt(listing.contacts) > 0 ? (
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition duration-300">
                <Mail size={18} />
                <span>View Contacts</span>
              </button>
            ) : (
              <p className="text-gray-500 text-sm">No contacts associated with this listing</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
