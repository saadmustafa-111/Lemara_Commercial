"use client";

import React from "react";
import Image from "next/image";

export default function FavouriteListingsImagesDemo() {  // The property images used in the favorite listings
  const propertyImages = [
    "/images/cards/card-01.jpg",
    "/images/cards/card-02.jpg",
    "/images/cards/card-03.jpg",
    "/images/grid-image/image-01.png",
    "/images/grid-image/image-02.png",
    "/images/carousel/carousel-01.png"
  ];

  // The icon images used in the favorite listings
  const iconImages = [
    "/images/icons/building.svg",
    "/images/icons/ruler.svg",
    "/images/icons/bed.svg",
    "/images/icons/bath.svg"
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-5 rounded-lg shadow-sm mb-6">          <h1 className="text-2xl font-bold text-gray-800 mb-4">High-Quality Images Used in Favorite Listings</h1>
          <p className="text-gray-600 mb-8">
            This page showcases the clearer, high-quality images that are used in the Favorite Listings page implementation.
          </p>{/* Property Images Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Images</h2>
            <p className="text-gray-600 mb-4">These images are used as property thumbnails:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {propertyImages.map((src: string, index: number) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                  <div className="relative h-48 w-full">
                    <Image
                      src={src}
                      alt={`Property Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-800 font-medium">Property Image {index + 1}</p>
                    <p className="text-gray-500 text-sm mt-1">{src}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Icon Images Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Icons Used</h2>
            <p className="text-gray-600 mb-4">These SVG icons are used to represent property features:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {iconImages.map((src, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border p-6 flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={src}
                      alt={`Icon ${index + 1}`}
                      width={64}
                      height={64}
                    />
                  </div>
                  <p className="text-gray-800 font-medium text-center">
                    {src.split('/').pop()?.replace('.svg', '')}
                  </p>
                  <p className="text-gray-500 text-sm mt-1 text-center">{src}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
