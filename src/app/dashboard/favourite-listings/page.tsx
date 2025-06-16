"use client";

import React, { useState } from "react";
import { Heart, X, Calendar, Search, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useFavourites } from '@/hooks/useFavourites';

export default function FavouriteListingsPage() {
  const { favourites, loading, removeFavourite } = useFavourites();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter properties based on search term
  const filteredProperties = favourites.filter((property) => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort properties based on sortBy and sortOrder
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "area") {
      return sortOrder === "asc" ? a.area - b.area : b.area - a.area;
    } else if (sortBy === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to format date (e.g., "1/15/2024")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with search and sort */}        <div className="bg-white p-5 rounded-lg shadow-sm mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg mr-4">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Favorite Listings</h1>
              <p className="text-gray-600">{favourites.length} saved properties</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex gap-2 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none bg-white"
              >
                <option value="date">Date Added</option>
                <option value="price">Price</option>
                <option value="area">Area</option>
              </select>
              
              <button
                onClick={toggleSortOrder}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                aria-label="Toggle sort order"
              >
                <ArrowUpDown className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Favorite Properties Yet</h2>
            <p className="text-gray-600 mb-6">
              Start browsing properties and add them to your favorites to see them here.
            </p>
            <Link 
              href="/listings" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative"
              >
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full z-10
                  ${property.status === "For Sale" ? "bg-blue-100 text-blue-800" : 
                    property.status === "For Rent" ? "bg-green-100 text-green-800" :
                    property.status === "Sold" ? "bg-red-100 text-red-800" : 
                    "bg-yellow-100 text-yellow-800"}`}>
                  {property.status}
                </div>
                
                {/* Remove from favorites button */}
                <button
                  onClick={() => removeFavourite(property.id)}
                  className="absolute top-4 right-4 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 z-10"
                  aria-label="Remove from favorites"
                >
                  <X className="h-4 w-4 text-gray-700" />
                </button>
                  {/* Property Image */}
                <div className="relative h-48 w-full bg-gray-200">                  {/* Date badge - positioned on the image */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center z-10">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-blue-500" />
                    <span className="text-xs font-medium text-gray-700">{formatDate(property.date)}</span>
                  </div>
                  
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </div>
                
                {/* Property Details */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{property.address}</p>
                    <div className="flex flex-wrap mb-4 gap-y-3">
                    {/* Property Type */}
                    <div className="w-1/2 flex items-center">
                      <div className="mr-2 w-4 h-4 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                          <path d="M9 22v-4h6v4"></path>
                          <path d="M8 6h.01"></path>
                          <path d="M16 6h.01"></path>
                          <path d="M12 6h.01"></path>
                          <path d="M12 10h.01"></path>
                          <path d="M12 14h.01"></path>
                          <path d="M16 10h.01"></path>
                          <path d="M16 14h.01"></path>
                          <path d="M8 10h.01"></path>
                          <path d="M8 14h.01"></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{property.propertyType}</span>
                    </div>
                    
                    {/* Area */}
                    <div className="w-1/2 flex items-center">
                      <div className="mr-2 w-4 h-4 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"></path>
                          <path d="m7.5 10.5 2 2"></path>
                          <path d="m10.5 7.5 2 2"></path>
                          <path d="m13.5 4.5 2 2"></path>
                          <path d="m4.5 13.5 2 2"></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{property.area} {property.areaUnit}</span>
                    </div>
                    
                    {/* Bedrooms if applicable */}
                    {property.bedrooms && (
                      <div className="w-1/2 flex items-center">
                        <div className="mr-2 w-4 h-4 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 4v16"></path>
                            <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                            <path d="M2 17h20"></path>
                            <path d="M6 8v9"></path>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">{property.bedrooms} bed</span>
                      </div>
                    )}
                    
                    {/* Bathrooms if applicable */}
                    {property.bathrooms && (
                      <div className="w-1/2 flex items-center">
                        <div className="mr-2 w-4 h-4 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12H2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"></path>
                            <path d="M20 12V7a4 4 0 0 0-8 0v5"></path>
                            <path d="M4 21v1"></path>
                            <path d="M20 21v1"></path>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">{property.bathrooms} bath</span>
                      </div>
                    )}
                  </div>
                    {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-2">                    <div>
                      <p className="text-blue-500 font-bold text-xl">
                        ${property.status === "For Sale" ? property.price.toLocaleString() : property.price.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal ml-1">
                          {property.priceUnit === "monthly" ? "/mo" : ""}
                        </span>
                      </p>
                    </div><Link
                      href={`/listings/${property.id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
