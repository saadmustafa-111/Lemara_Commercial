"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock data for the listings
const mockListings = [
  {
    id: 1,
    title: "Modern Office Space in Downtown",
    type: "Commercial",
    price: "£2,500/month",
    location: "London, UK",
    bedrooms: 0,
    bathrooms: 2,
    area: "1,200 sqft",
    status: "For Rent",
    image: "/images/product/property-1.jpg"
  },
  {
    id: 2,
    title: "Retail Space in Shopping Center",
    type: "Commercial",
    price: "£3,200/month",
    location: "Manchester, UK",
    bedrooms: 0,
    bathrooms: 1,
    area: "800 sqft",
    status: "For Rent",
    image: "/images/product/property-2.jpg"
  },
  {
    id: 3,
    title: "Warehouse with Office Space",
    type: "Industrial",
    price: "£450,000",
    location: "Birmingham, UK",
    bedrooms: 0,
    bathrooms: 4,
    area: "5,000 sqft",
    status: "For Sale",
    image: "/images/product/property-3.jpg"
  },
  {
    id: 4,
    title: "Prime Restaurant Location",
    type: "Commercial",
    price: "£4,100/month",
    location: "Edinburgh, UK",
    bedrooms: 0,
    bathrooms: 2,
    area: "1,800 sqft",
    status: "For Rent",
    image: "/images/product/property-4.jpg"
  }
];

const ListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  
  // Filter listings based on search term and filters
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
    const matchesType = typeFilter === "All" || listing.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Listings</h1>
        <Link 
          href="/dashboard/listings/add"
          className="px-4 py-2 bg-[#9A2236] text-white rounded-md hover:bg-[#851c2e] transition"
        >
          Add New Listing
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Listings
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
              placeholder="Search by title or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="For Rent">For Rent</option>
              <option value="For Sale">For Sale</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Property Type
            </label>
            <select
              id="type"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48">
                <Image
                  src={listing.image || "/images/product/property-default.jpg"}
                  alt={listing.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-2 right-2 bg-[#9A2236] text-white px-2 py-1 rounded text-xs font-medium">
                  {listing.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                  {listing.title}
                </h3>
                <div className="text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <span className="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  {listing.location}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span>{listing.area}</span>
                  <span>{listing.type}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-[#9A2236]">{listing.price}</span>
                  <Link 
                    href={`/dashboard/listings/${listing.id}`} 
                    className="text-[#9A2236] hover:underline text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">No listings match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;