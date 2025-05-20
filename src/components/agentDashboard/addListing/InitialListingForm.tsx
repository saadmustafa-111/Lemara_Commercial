"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Basic Information
          </h2>
          
          <form onSubmit={handleContinue}>
            <div className="space-y-6">
              {/* Market Type Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Market
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${marketType === "On Market" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700"}`}
                    onClick={() => setMarketType("On Market")}
                  >
                    <div className="flex justify-center mb-2">
                      <input 
                        type="radio" 
                        name="marketType" 
                        checked={marketType === "On Market"} 
                        onChange={() => setMarketType("On Market")} 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-sm font-medium">On Market</span>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${marketType === "Private" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700"}`}
                    onClick={() => setMarketType("Private")}
                  >
                    <div className="flex justify-center mb-2">
                      <input 
                        type="radio" 
                        name="marketType" 
                        checked={marketType === "Private"} 
                        onChange={() => setMarketType("Private")} 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-sm font-medium">Private</span>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${marketType === "For Lease" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700"}`}
                    onClick={() => setMarketType("For Lease")}
                  >
                    <div className="flex justify-center mb-2">
                      <input 
                        type="radio" 
                        name="marketType" 
                        checked={marketType === "For Lease"} 
                        onChange={() => setMarketType("For Lease")} 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <span className="text-sm font-medium">For Lease</span>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="mb-1"><strong>On Market</strong> - Photos, address and all other listing information is visible to other members.</div>
                  <div><strong>Private</strong> - Documents are protected by a CA, photos and seller information are hidden until unlocked</div>
                </div>
              </div>
              
              {/* Listing Type Dropdown */}
              <div>
                <label htmlFor="listingType" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Listing Type
                </label>
                <div className="relative">
                  <select
                    id="listingType"
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none dark:bg-gray-700 dark:border-gray-600"
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
                {/* Address Section */}
              <div>
                <h3 className="flex items-center text-lg font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Address
                </h3>
                
                <div className="space-y-4">
                  {/* Address Lookup */}
                  <div>
                    <label htmlFor="addressLookup" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address Lookup
                    </label>
                    <input
                      type="text"
                      id="addressLookup"
                      placeholder="Enter a location"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Please use the "address lookup" to enter your listing location. This will automatically set the map coordinates and google street view.
                    </p>
                  </div>
                  
                  {/* Street Address */}
                  <div>
                    <input
                      type="text"
                      id="streetAddress"
                      placeholder="Street Address"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  {/* Address Line 2 */}
                  <div>
                    <input
                      type="text"
                      id="address2"
                      placeholder="Address 2"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  {/* City, State/Province, Postal Code Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        id="city"
                        placeholder="City"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="stateProvince"
                        placeholder="State/Province"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="postalCode"
                        placeholder="Postal Code"
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  
                  {/* Country */}
                  <div>
                    <select
                      id="country"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  
                  {/* Neighborhood */}
                  <div>
                    <input
                      type="text"
                      id="neighborhood"
                      placeholder="Neighborhood"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  {/* Assessors Parcel Number */}
                  <div>
                    <input
                      type="text"
                      id="parcelNumber"
                      placeholder="Assessors Parcel Number"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
              
              {/* Continue Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialListingForm;
