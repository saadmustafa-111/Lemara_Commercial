"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock data for the listings
const mockListings = [
  {
    id: 1,
    title: "Agriculture Greenhouse With Processing Unit",
    type: "Agriculture",
    price: "$0",
    location: "Property 1",
    area: "Greenhouse With Processing Unit",
    status: "Active",
    lastUpdate: "07/01/2023",
    views: 0,
    messages: 0,
    nda: 0,
    image: "/images/product/product-01.jpg"
  },
  {
    id: 2,
    title: "Agriculture Greenhouse With Processing Unit",
    type: "Agriculture",
    price: "$0",
    location: "Property 2",
    area: "Greenhouse With Processing Unit",
    status: "Active",
    lastUpdate: "07/01/2023",
    views: 0,
    messages: 0,
    nda: 0,
    image: "/images/product/product-02.jpg"
  },
  {
    id: 3,
    title: "Agriculture Greenhouse With Processing Unit",
    type: "Agriculture",
    price: "$0",
    location: "Property 3",
    area: "Greenhouse With Processing Unit",
    status: "Active",
    lastUpdate: "07/01/2023",
    views: 0,
    messages: 0,
    nda: 0,
    image: "/images/product/product-03.jpg"
  },
  {
    id: 4,
    title: "Agriculture Greenhouse With Processing Unit",
    type: "Agriculture",
    price: "$0",
    location: "Property 4",
    area: "Greenhouse With Processing Unit",
    status: "Active",
    lastUpdate: "07/01/2023",
    views: 0,
    messages: 0,
    nda: 0,
    image: "/images/product/product-04.jpg"
  },
  {
    id: 5,
    title: "Agriculture Greenhouse With Processing Unit",
    type: "Agriculture",
    price: "$0",
    location: "Property 5",
    area: "Greenhouse With Processing Unit",
    status: "Active",
    lastUpdate: "07/01/2023",
    views: 0,
    messages: 0,
    nda: 0,
    image: "/images/product/product-05.jpg"
  }
];

const ListingsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  // State to track which action dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);
  
  // Toggle dropdown function
  const toggleDropdown = (id: number, event?: React.MouseEvent) => {
    // If there's an event, prevent it from bubbling up
    if (event) {
      event.stopPropagation();
    }
    
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  // Handler functions for dropdown menu actions
  const handleEditListing = (listingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Edit listing', listingId);
    // Close the dropdown
    setActiveDropdown(null);
    // Navigate to edit page
    router.push(`/dashboard/listings/edit/${listingId}`);
  };

  const handleViewListing = (listingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('View listing', listingId);
    setActiveDropdown(null);
    // Navigate to view page
    router.push(`/dashboard/listings/${listingId}`);
  };

  const handleArchiveListing = (listingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Archive listing', listingId);
    setActiveDropdown(null);
    // Implement archive functionality
    // In a real application, you would make an API call to update the listing status
    // For now, we'll just log the action
    alert(`Listing ${listingId} archived successfully!`);
  };

  const handleViewers = (listingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('View viewers', listingId);
    setActiveDropdown(null);
    // Navigate to viewers page
    router.push(`/dashboard/listings/${listingId}/viewers`);
  };

  const handleViewHistory = (listingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('View history', listingId);
    setActiveDropdown(null);
    // Navigate to history page
    router.push(`/dashboard/listings/${listingId}/history`);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside of any dropdown menu
      const target = event.target as Node;
      const dropdownContainer = document.querySelector('.dropdown-container');
      
      // If the click is outside any dropdown container and not on a menu toggle button
      if (!(target as Element).closest('.dropdown-container') && !(target as Element).closest('.menu-toggle-btn')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Filter listings based on search term and filters
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
    const matchesType = typeFilter === "All" || listing.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  
  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#00a0d1] dark:text-[#00c1f5]">My Listings</h1>
          <p className="text-gray-600 dark:text-gray-400">{filteredListings.length} Properties</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center text-[#00a0d1] dark:text-[#00c1f5]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 12H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.5 15L15.5 12L12.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link 
            href="/dashboard/agent/add"
            className="px-6 py-2 bg-[#00a0d1] text-white rounded-full hover:bg-[#0080a9] dark:bg-[#0590b3] dark:hover:bg-[#046f8a] transition"
          >
            Add Listing
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00a0d1] dark:focus:ring-[#00c1f5] dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Search by Name, Location or Broker"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="relative w-38">
            <select
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00a0d1] dark:focus:ring-[#00c1f5] appearance-none dark:bg-gray-700 dark:text-gray-100"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">Property Types</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
              <option value="Agriculture">Agriculture</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="relative w-25">
            <select
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00a0d1] dark:focus:ring-[#00c1f5] appearance-none dark:bg-gray-700 dark:text-gray-100"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="showArchive" className="mr-2" />
            <label htmlFor="showArchive" className="text-gray-600 dark:text-gray-400 whitespace-nowrap">Show Archive</label>
          </div>
          <div className="flex items-center ml-4">
            <span className="text-gray-600 dark:text-gray-400 mr-2 whitespace-nowrap">Sort By:</span>
            <div className="relative w-40">
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00a0d1] dark:focus:ring-[#00c1f5] appearance-none dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="newest">All</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="date">Date</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Listings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">PROPERTY</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">PRICE</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">STATUS</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">TYPE</th>
              <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">VIEWS</th>
              <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">MESSAGE</th>
              <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">NDA</th>
              <th className="py-3 px-4 text-right font-medium text-gray-700 dark:text-gray-300">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((listing) => (
              <tr key={listing.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-100 dark:bg-gray-600 mr-4 rounded flex-shrink-0 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <button className="text-[#00a0d1] dark:text-[#00c1f5]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.50001C18.7626 2.23741 19.1192 2.08759 19.5 2.08759C19.8808 2.08759 20.2374 2.23741 20.5 2.50001C20.7626 2.76261 20.9124 3.11925 20.9124 3.50001C20.9124 3.88076 20.7626 4.23741 20.5 4.50001L12 13L9 14L10 11L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-800 dark:text-gray-300">Asking</p>
                    <div className="flex ml-2 items-center">
                      <p className="font-bold text-gray-900 dark:text-white">{listing.price}</p>
                      <button className="ml-2 text-[#00a0d1] dark:text-[#00c1f5]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.50001C18.7626 2.23741 19.1192 2.08759 19.5 2.08759C19.8808 2.08759 20.2374 2.23741 20.5 2.50001C20.7626 2.76261 20.9124 3.11925 20.9124 3.50001C20.9124 3.88076 20.7626 4.23741 20.5 4.50001L12 13L9 14L10 11L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Update: {listing.lastUpdate}</p>
                    <div className="relative w-32 mt-1">
                      <select
                        className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#00a0d1] dark:focus:ring-[#00c1f5] appearance-none dark:bg-gray-700 dark:text-gray-100"
                        defaultValue={listing.status}
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold">Sold</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-300">{listing.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{listing.area}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">{listing.views}</td>
                <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">{listing.messages}</td>
                <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">{listing.nda}</td>
                <td className="py-4 px-4 text-right">
                  <div className="relative dropdown-container">
                    <button 
                      className="text-[#00a0d1] dark:text-[#00c1f5] hover:text-[#0080a9] dark:hover:text-[#00a9d9] menu-toggle-btn"
                      onClick={(e) => toggleDropdown(listing.id, e)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor"/>
                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor"/>
                      </svg>
                    </button>
                    {activeDropdown === listing.id && (
                      <div className="absolute z-10 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 w-48 mt-1" 
                           style={{ top: '100%', right: '0' }}
                           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                      >
                        <ul className="text-left">
                          <li 
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center text-gray-700 dark:text-gray-300"
                            onClick={(e) => handleEditListing(listing.id, e)}
                          >
                            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18.5 2.50001C18.7626 2.23741 19.1192 2.08759 19.5 2.08759C19.8808 2.08759 20.2374 2.23741 20.5 2.50001C20.7626 2.76261 20.9124 3.11925 20.9124 3.50001C20.9124 3.88076 20.7626 4.23741 20.5 4.50001L12 13L9 14L10 11L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Edit Listing
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center text-gray-700 dark:text-gray-300"
                            onClick={(e) => handleViewListing(listing.id, e)}
                          >
                            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            View Listing
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center text-gray-700 dark:text-gray-300"
                            onClick={(e) => handleArchiveListing(listing.id, e)}
                          >
                            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10 13V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 13V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 8V18C8 19.1046 8.89543 20 10 20H14C15.1046 20 16 19.1046 16 18V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 4H16L14 8H10L8 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Archive Listing
                          </li>
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                          <li 
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center text-gray-700 dark:text-gray-300"
                            onClick={(e) => handleViewers(listing.id, e)}
                          >
                            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Viewers
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center text-gray-700 dark:text-gray-300"
                            onClick={(e) => handleViewHistory(listing.id, e)}
                          >
                            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3.05 11C3.27151 8.68893 4.40446 6.5443 6.22178 5.03208C8.03911 3.51987 10.3921 2.74916 12.7611 2.87108C15.1301 2.993 17.3926 4.0005 19.0584 5.71123C20.7241 7.42196 21.6719 9.70471 21.71 12.08C21.7481 14.4553 20.8729 16.7638 19.2662 18.5215C17.6594 20.2792 15.4357 21.3493 13.0728 21.5382C10.71 21.7271 8.3662 21.0207 6.52105 19.5775C4.6759 18.1344 3.4592 16.0558 3.1 13.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            View History
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredListings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No listings match your search criteria.</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredListings.length > 0 && (
        <div className="flex justify-between items-center mt-6 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Show</span>
            <select 
              className="mx-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#00a0d1] dark:focus:ring-[#00c1f5] dark:bg-gray-700 dark:text-gray-100"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries per page | Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredListings.length)} of {filteredListings.length} entries</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Previous
            </button>
            
            {/* Pagination Logic: Show first page, current page -1, current page, current page +1, and last page */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Always show first page, current page, and last page
              // For pages > 5, show ellipsis
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNumber
                        ? 'bg-[#00a0d1] text-white dark:bg-[#00c1f5]'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                (pageNumber === 2 && currentPage > 3) ||
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNumber} className="px-2 py-1">...</span>;
              }
              return null;
            })}
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;