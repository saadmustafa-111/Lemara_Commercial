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
  };
  return (
    <div className="w-full mx-auto p-6 dark:bg-gray-900">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-light text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
          Add New Listing
        </h1>

        <form
          onSubmit={handleContinue}
          className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 border border-gray-100 dark:border-gray-700"
        >
          {/* Market Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Market Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`border rounded-full p-3 text-center cursor-pointer transition-all ${marketType === "On Market" ? "border-[#06AED7] bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                onClick={() => setMarketType("On Market")}
              >
                <div className="flex items-center justify-center gap-2">
                  <input 
                    type="radio" 
                    name="marketType" 
                    checked={marketType === "On Market"} 
                    onChange={() => setMarketType("On Market")} 
                    className="w-4 h-4 text-[#06AED7] focus:ring-[#06AED7]"
                  />
                  <span className="text-sm font-medium">On Market</span>
                </div>
              </div>
              
              <div 
                className={`border rounded-full p-3 text-center cursor-pointer transition-all ${marketType === "Private" ? "border-[#06AED7] bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                onClick={() => setMarketType("Private")}
              >
                <div className="flex items-center justify-center gap-2">
                  <input 
                    type="radio" 
                    name="marketType" 
                    checked={marketType === "Private"} 
                    onChange={() => setMarketType("Private")} 
                    className="w-4 h-4 text-[#06AED7] focus:ring-[#06AED7]"
                  />
                  <span className="text-sm font-medium">Private</span>
                </div>
              </div>
              
              <div 
                className={`border rounded-full p-3 text-center cursor-pointer transition-all ${marketType === "For Lease" ? "border-[#06AED7] bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}`}
                onClick={() => setMarketType("For Lease")}
              >
                <div className="flex items-center justify-center gap-2">
                  <input 
                    type="radio" 
                    name="marketType" 
                    checked={marketType === "For Lease"} 
                    onChange={() => setMarketType("For Lease")} 
                    className="w-4 h-4 text-[#06AED7] focus:ring-[#06AED7]"
                  />
                  <span className="text-sm font-medium">For Lease</span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="mb-1"><strong>On Market</strong> - Photos, address and all other listing information is visible to other members.</div>
              <div><strong>Private</strong> - Documents are protected by a CA, photos and seller information are hidden until unlocked</div>
            </div>
          </div>
          
          {/* Listing Type Dropdown */}
          <div className="space-y-2">
            <label htmlFor="listingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Listing Type
            </label>
            <div className="relative">
              <select
                id="listingType"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none"
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-2">
            <h3 className="flex items-center text-lg font-medium mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#06AED7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Address
            </h3>
            
            <div className="space-y-4">
              {/* Address Lookup */}
              <div className="space-y-2">
                <label htmlFor="addressLookup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address Lookup
                </label>
                <input
                  type="text"
                  id="addressLookup"
                  placeholder="Enter a location"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Please use the "address lookup" to enter your listing location. This will automatically set the map coordinates and google street view.
                </p>
              </div>
              
              {/* Street Address */}
              <div className="space-y-2">
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  placeholder="Street Address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              
              {/* Address Line 2 */}
              <div className="space-y-2">
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  placeholder="Address 2"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              
              {/* City, State/Province, Postal Code Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="stateProvince" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="stateProvince"
                    placeholder="State/Province"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Postal Code"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              
              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country
                </label>
                <select
                  id="country"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none"
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
              <div className="space-y-2">
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Neighborhood
                </label>
                <input
                  type="text"
                  id="neighborhood"
                  placeholder="Neighborhood"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              
              {/* Assessors Parcel Number */}
              <div className="space-y-2">
                <label htmlFor="parcelNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assessors Parcel Number
                </label>
                <input
                  type="text"
                  id="parcelNumber"
                  placeholder="Assessors Parcel Number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>
          
          {/* Continue Button */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#06AED7] text-white font-medium flex items-center gap-2 transition-all duration-300 hover:bg-[#0590b3] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:ring-offset-2 dark:bg-[#06AED7] dark:hover:bg-[#0590b3] dark:focus:ring-[#00c1f5]"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitialListingForm;
