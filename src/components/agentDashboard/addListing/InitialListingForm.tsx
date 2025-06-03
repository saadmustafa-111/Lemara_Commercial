"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Save } from 'lucide-react';

interface InitialListingFormProps {
  onSubmit: (listingType: string, marketType: string) => void;
}

const InitialListingForm: React.FC<InitialListingFormProps> = ({ onSubmit }) => {
  const [marketType, setMarketType] = useState<string>("On Market");
  const [listingType, setListingType] = useState<string>(""); // Will be set from the dropdown
  const router = useRouter();const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listingType) {
      alert("Please select a listing type");
      return;
    }

    // Call the parent component's onSubmit function
    onSubmit(listingType, marketType);
  };  return (
    <div className="w-full max-w-6xl mx-auto p-6 dark:bg-gray-900 animate-fadeIn">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white pb-2 bg-gradient-to-r from-[#06AED7] to-[#00c1f5] bg-clip-text text-transparent animate-fadeInSlideUp">
            Add New Listing
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#06AED7] to-[#00c1f5] rounded-full animate-fadeInWidth"></div>
        </div>

        <style jsx>{`
          @keyframes fadeInSlideUp {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInWidth {
            0% { width: 0; opacity: 0; }
            100% { width: 6rem; opacity: 1; }
          }
          @keyframes fadeInScale {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-fadeInSlideUp {
            animation: fadeInSlideUp 0.7s ease forwards;
          }
          .animate-fadeInWidth {
            animation: fadeInWidth 1s ease-out 0.3s forwards;
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.5s ease-out forwards;
          }
        `}</style>        <form
          onSubmit={handleContinue}
          className="w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 animate-fadeInScale"
        >{/* Market Type Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">            <label className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              <span className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full text-[#06AED7] dark:text-[#00c1f5] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <span className="text-gray-800 dark:text-gray-200">Market Type</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${marketType === "On Market" ? "border-[#06AED7] bg-blue-50 dark:bg-blue-900/30 shadow-md" : "border-gray-200 dark:border-gray-600 hover:border-[#06AED7]/50"}`}
                onClick={() => setMarketType("On Market")}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${marketType === "On Market" ? "bg-[#06AED7] p-1" : "border-2 border-gray-300 dark:border-gray-500"}`}>
                    {marketType === "On Market" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input 
                    type="radio" 
                    name="marketType" 
                    checked={marketType === "On Market"} 
                    onChange={() => setMarketType("On Market")} 
                    className="sr-only"
                  />
                  <span className={`text-base font-medium ${marketType === "On Market" ? "text-[#06AED7] dark:text-[#00c1f5]" : "text-gray-700 dark:text-gray-300"}`}>On Market</span>
                </div>
              </div>
              
              <div 
                className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${marketType === "Private" ? "border-[#06AED7] bg-blue-50 dark:bg-blue-900/30 shadow-md" : "border-gray-200 dark:border-gray-600 hover:border-[#06AED7]/50"}`}
                onClick={() => setMarketType("Private")}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${marketType === "Private" ? "bg-[#06AED7] p-1" : "border-2 border-gray-300 dark:border-gray-500"}`}>
                    {marketType === "Private" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input 
                    type="radio" 
                    name="marketType" 
                    checked={marketType === "Private"} 
                    onChange={() => setMarketType("Private")} 
                    className="sr-only"
                  />
                  <span className={`text-base font-medium ${marketType === "Private" ? "text-[#06AED7] dark:text-[#00c1f5]" : "text-gray-700 dark:text-gray-300"}`}>Private</span>
                </div>
              </div>
              
              <div 
                className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${marketType === "For Lease" ? "border-[#06AED7] bg-blue-50 dark:bg-blue-900/30 shadow-md" : "border-gray-200 dark:border-gray-600 hover:border-[#06AED7]/50"}`}
                onClick={() => setMarketType("For Lease")}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${marketType === "For Lease" ? "bg-[#06AED7] p-1" : "border-2 border-gray-300 dark:border-gray-500"}`}>
                    {marketType === "For Lease" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input 
                    type="radio" 
                    name="marketType" 
                    checked={marketType === "For Lease"} 
                    onChange={() => setMarketType("For Lease")} 
                    className="sr-only"
                  />
                  <span className={`text-base font-medium ${marketType === "For Lease" ? "text-[#06AED7] dark:text-[#00c1f5]" : "text-gray-700 dark:text-gray-300"}`}>For Lease</span>
                </div>
              </div>
            </div>            <div className="mt-4 pl-4 border-l-4 border-[#06AED7]/30 dark:border-[#00c1f5]/30 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-r-lg">
              <div className="mb-1 text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold text-[#06AED7] dark:text-[#00c1f5]">On Market</span> - Photos, address and all other listing information is visible to other members.</div>
              <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold text-[#06AED7] dark:text-[#00c1f5]">Private</span> - Documents are protected by a CA, photos and seller information are hidden until unlocked</div>
            </div>
          </div>
            {/* Listing Type Dropdown */}          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">            <label htmlFor="listingType" className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              <span className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full text-[#06AED7] dark:text-[#00c1f5] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <span className="text-gray-800 dark:text-gray-200">Listing Type</span>
            </label>
            <div className="relative group">
              <select
                id="listingType"
                className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none shadow-sm"
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
              >
                <option value="" disabled>Select a listing type</option>
                <option value="Business">Business</option>
                <option value="Commercial Real Estate">Commercial Real Estate</option>
                <option value="Business with Real Estate">Business with Real Estate</option>
                <option value="Franchise">Franchise</option>
                <option value="Asset Sale">Asset Sale</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#06AED7] dark:text-[#00c1f5] group-hover:translate-y-1 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>            <p className="text-sm text-gray-600 pl-4 border-l-2 border-[#06AED7]/30 dark:border-[#00c1f5]/30 bg-blue-50 dark:bg-blue-900/10 p-2 rounded-r-lg italic ml-2">
              Select the type of listing that best describes your property.
            </p>
          </div>          {/* Address Section */}          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 dark:bg-gray-800 mt-6">            <h3 className="flex items-center text-xl font-bold mb-6 pb-3 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
              <span className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full text-[#06AED7] dark:text-[#00c1f5] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span className="bg-gradient-to-r from-[#06AED7] to-[#00c1f5] bg-clip-text text-transparent">Location Details</span>
            </h3>
            
            <div className="space-y-6">
              {/* Address Lookup */}
              <div className="space-y-2">                <label htmlFor="addressLookup" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  Address Lookup
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="addressLookup"
                    placeholder="Enter a location"
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400 shadow-sm"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                </div>                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-[#06AED7]/30 dark:border-[#00c1f5]/30 bg-blue-50 dark:bg-blue-900/10 p-2 rounded-r-lg">
                  Please use the "address lookup" to enter your listing location. This will automatically set the map coordinates and google street view.
                </p>
              </div>
                {/* Street Address */}              <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                <label htmlFor="streetAddress" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  Street Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="streetAddress"
                    placeholder="Street Address"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Address Line 2 */}              <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                <label htmlFor="address2" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  Address Line 2
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="address2"
                    placeholder="Suite, Unit, Building, etc."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* City, State/Province, Postal Code Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">                <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                  <label htmlFor="city" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                    <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </span>
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>                <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                  <label htmlFor="stateProvince" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                    <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="stateProvince"
                    placeholder="State/Province"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>                <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                  <label htmlFor="postalCode" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                    <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </span>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Postal Code"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
              </div>
                {/* Country */}              <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 mt-4">
                <label htmlFor="country" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Country
                </label>
                <div className="relative">
                  <select
                    id="country"
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    {/* Add more countries as needed */}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Neighborhood */}              <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 mt-4">
                <label htmlFor="neighborhood" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </span>
                  Neighborhood
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="neighborhood"
                    placeholder="Neighborhood"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Assessors Parcel Number */}              <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 shadow-sm space-y-2 group hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 mt-4">
                <label htmlFor="parcelNumber" className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <span className="mr-2 text-[#06AED7] dark:text-[#00c1f5]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  Assessors Parcel Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="parcelNumber"
                    placeholder="Assessors Parcel Number"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent transition-all duration-300 group-hover:border-[#06AED7] dark:group-hover:border-[#00c1f5] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
            {/* Continue Button */}
          <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-6 pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transform hover:scale-[1.02] group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#06AED7] to-[#00c1f5] text-white font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:from-[#05a0c7] hover:to-[#00b0e0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:ring-offset-2 transform hover:scale-[1.02] group"
            >
              <span>Continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitialListingForm;
