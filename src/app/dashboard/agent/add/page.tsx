"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddListingPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for all tabs
  const [formData, setFormData] = useState({
    // Basics Tab
    businessLegalName: "",
    propertyType: "Agriculture",
    propertySubtype: "Greenhouse With Processing Unit",
    dba: "",
    askingPrice: "",
    status: "Active",
    showCounty: true,
    showCity: true,
    isFeatured: false,

    // Owner Details
    ownerName1: "",
    ownerEmail1: "",
    ownerName2: "",
    ownerEmail2: "",
    
    // Sales/Income Tab
    annualRevenue: "",
    cashFlow: "",
    inventoryValue: "",
    
    // Expenses Tab
    rent: "",
    utilities: "",
    payroll: "",
    
    // Additional Information
    yearEstablished: "",
    employees: "",
    reasonForSelling: "",
    
    // Accessibility Settings
    wheelchairAccessible: false,
    elevatorAccess: false,
    
    // Photos
    photos: [] as File[],
    
    // Activities
    activities: []
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...fileArray]
      }));
    }
  };
  
  // Remove uploaded image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the form data to your backend API
      // For now, we'll just simulate a delay and redirect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Redirect to listings page
      router.push("/dashboard/agent/listings");
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("There was an error adding your listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (activeTab < 8) {
      setActiveTab(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeTab > 1) {
      setActiveTab(prev => prev - 1);
    }
  };

  const tabs = [
    { id: 1, name: "Basics" },
    { id: 2, name: "Details" },
    { id: 3, name: "Sales / Income" },
    { id: 4, name: "Expenses" },
    { id: 5, name: "Additional Information" },
    { id: 6, name: "Accessibility Settings" },
    { id: 7, name: "Photos" },
    { id: 8, name: "Activities" }
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Header with user welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, AJ Rana</h1>
          <div className="mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Broker</span>
          </div>
        </div>
        
        {/* Tabs navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "border-b-2 border-[#9A2236] text-[#9A2236] dark:text-[#b02e45]" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab.id}. {tab.name}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab 1: Property Basics */}
          {activeTab === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Property Basics</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="businessLegalName" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Legal Name
                  </label>
                  <input
                    type="text"
                    id="businessLegalName"
                    name="businessLegalName"
                    value={formData.businessLegalName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    placeholder="Max 50 Characters"
                    maxLength={50}
                  />
                </div>
                
                <div>
                  <label htmlFor="propertyType" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="propertySubtype" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Subtype
                  </label>
                  <select
                    id="propertySubtype"
                    name="propertySubtype"
                    value={formData.propertySubtype}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Greenhouse With Processing Unit">Greenhouse With Processing Unit</option>
                    <option value="Farm">Farm</option>
                    <option value="Ranch">Ranch</option>
                    <option value="Vineyard">Vineyard</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dba" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    DBA
                  </label>
                  <input
                    type="text"
                    id="dba"
                    name="dba"
                    value={formData.dba}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="askingPrice" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Asking Price($)
                  </label>
                  <input
                    type="number"
                    id="askingPrice"
                    name="askingPrice"
                    value={formData.askingPrice}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Sold">Sold</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Options
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showCounty"
                        name="showCounty"
                        checked={formData.showCounty}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="showCounty" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Show County
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showCity"
                        name="showCity"
                        checked={formData.showCity}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="showCity" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Show City
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="isFeatured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Is Featured
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <hr className="my-8 border-gray-200 dark:border-gray-700" />
              
              {/* Owner Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Owner Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ownerName1" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Owner Name 1
                    </label>
                    <input
                      type="text"
                      id="ownerName1"
                      name="ownerName1"
                      value={formData.ownerName1}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="ownerEmail1" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Owner Email 1
                    </label>
                    <input
                      type="email"
                      id="ownerEmail1"
                      name="ownerEmail1"
                      value={formData.ownerEmail1}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="ownerName2" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Owner Name 2
                    </label>
                    <input
                      type="text"
                      id="ownerName2"
                      name="ownerName2"
                      value={formData.ownerName2}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="ownerEmail2" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Owner Email 2
                    </label>
                    <input
                      type="email"
                      id="ownerEmail2"
                      name="ownerEmail2"
                      value={formData.ownerEmail2}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center justify-center md:col-span-2">
                    <button
                      type="button"
                      className="flex items-center text-[#9A2236] hover:underline"
                    >
                      <span className="text-2xl mr-1">+</span> Add Another Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 2: Details */}
          {activeTab === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Description
                  </label>
                  <textarea
                    rows={5}
                    name="description"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    placeholder="Detailed description of the property..."
                  ></textarea>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location Details
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Size & Capacity
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="squareFootage"
                      placeholder="Square Footage"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="number"
                      name="lotSize"
                      placeholder="Lot Size (acres)"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Building Features
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="yearBuilt"
                      placeholder="Year Built"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="number"
                      name="parking"
                      placeholder="Parking Spaces"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 3: Sales / Income */}
          {activeTab === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Sales / Income Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="annualRevenue" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Annual Revenue
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="annualRevenue"
                      name="annualRevenue"
                      value={formData.annualRevenue}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cashFlow" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cash Flow
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="cashFlow"
                      name="cashFlow"
                      value={formData.cashFlow}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inventoryValue" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Inventory Value
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="inventoryValue"
                      name="inventoryValue"
                      value={formData.inventoryValue}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload Financial Documents
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="financialdocs"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-600 hover:border-[#9A2236] dark:hover:border-[#9A2236]"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> financial documents
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, EXCEL (MAX. 10MB)</p>
                      </div>
                      <input id="financialdocs" type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 4: Expenses */}
          {activeTab === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Expenses</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="rent" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rent/Lease
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="rent"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Monthly"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="utilities" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Utilities
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="utilities"
                      name="utilities"
                      value={formData.utilities}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Monthly"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="payroll" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payroll
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      id="payroll"
                      name="payroll"
                      value={formData.payroll}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Monthly"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Taxes
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      name="propertyTaxes"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Annual"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Insurance
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      name="insurance"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Annual"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Maintenance
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      $
                    </span>
                    <input
                      type="number"
                      name="maintenance"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Monthly"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 5: Additional Information */}
          {activeTab === 5 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="yearEstablished" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Year Established
                  </label>
                  <input
                    type="number"
                    id="yearEstablished"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleChange}
                    min="1900"
                    max="2099"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="employees" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="reasonForSelling" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason for Selling
                  </label>
                  <textarea
                    id="reasonForSelling"
                    name="reasonForSelling"
                    value={formData.reasonForSelling}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Competitive Advantage
                  </label>
                  <textarea
                    name="competitiveAdvantage"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    placeholder="What makes this property/business unique?"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 6: Accessibility Settings */}
          {activeTab === 6 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Accessibility Settings</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="wheelchairAccessible"
                      name="wheelchairAccessible"
                      checked={formData.wheelchairAccessible}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="wheelchairAccessible" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Wheelchair Accessible
                    </label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="elevatorAccess"
                      name="elevatorAccess"
                      checked={formData.elevatorAccess}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="elevatorAccess" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Elevator Access
                    </label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="handicapParking"
                      name="handicapParking"
                      className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="handicapParking" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Handicap Parking Available
                    </label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="brailleSignage"
                      name="brailleSignage"
                      className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="brailleSignage" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Braille Signage
                    </label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accessibleRestrooms"
                      name="accessibleRestrooms"
                      className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="accessibleRestrooms" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Accessible Restrooms
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab 7: Photos */}
          {activeTab === 7 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Property Photos</h2>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload Images
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="photos"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-600 hover:border-[#9A2236] dark:hover:border-[#9A2236]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 5MB per image)</p>
                    </div>
                    <input
                      id="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Tab 8: Activities */}
          {activeTab === 8 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Activities</h2>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  All activities related to this listing will be recorded here. This helps you track the history of changes and interactions.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="border-l-4 border-[#9A2236] pl-4 py-1">
                  <p className="font-medium text-gray-800 dark:text-white">Listing Created</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">May 8, 2025 - 10:30 AM</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div>
              {activeTab > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard/agent/listings"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </Link>
              
              {activeTab < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-[#9A2236] text-white rounded-md hover:bg-[#851c2e] transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#9A2236] text-white rounded-md hover:bg-[#851c2e] transition ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
              
              {activeTab < 8 && (
                <button
                  type="button"
                  className="px-4 py-2 text-[#9A2236] hover:underline"
                >
                  Preview
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;