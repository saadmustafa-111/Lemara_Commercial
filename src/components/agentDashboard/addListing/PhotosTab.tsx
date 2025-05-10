"use client";

import React, { useState } from 'react';
import { Photo } from './usePhotoUpload';

interface PhotosTabProps {
  photos: Photo[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const PhotosTab: React.FC<PhotosTabProps> = ({ photos, handleFileChange, removeImage }) => {  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Property Photos</h2>
      
      {/* Main Photo Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Main Photo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex">
            <label
              htmlFor="mainPhoto"
              className="flex items-center px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-l-lg cursor-pointer hover:bg-blue-100"
            >
              Choose File
            </label>
            <div className="flex-1 px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
              {photos && photos.length > 0 && photos[0] ? photos[0].name || 'Selected file' : 'No file chosen'}
            </div>
            <input
              id="mainPhoto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                // Handle only single file for main photo
                if (e.target.files && e.target.files.length > 0) {
                  const event = { ...e, target: { ...e.target, multiple: false } };
                  handleFileChange(event);
                }
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Photo Title"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Main photo preview */}
        {photos && photos.length > 0 && (
          <div className="mt-4 relative w-full max-w-md">
            <img
              src={photos[0].preview || URL.createObjectURL(photos[0])}
              alt="Main Property Photo"
              className="w-full h-52 object-cover rounded-md"
            />
            <button 
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              onClick={() => removeImage(0)}
            >
              ×
            </button>
          </div>
        )}
      </div>
      
      <hr className="my-6 border-gray-200" />
      
      {/* Gallery Photos Section */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Gallery Photos</h3>
        
        {/* Accessibility Settings */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Accessibility Settings:
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="galleryPublic" 
                name="galleryAccessibility" 
                value="public" 
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="galleryPublic" className="ml-2 text-sm font-medium text-gray-700">
                Public
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="galleryPrivate" 
                name="galleryAccessibility" 
                value="private"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="galleryPrivate" className="ml-2 text-sm font-medium text-gray-700">
                Private
              </label>
            </div>
          </div>
        </div>
        
        {/* Gallery Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex">
            <label
              htmlFor="galleryPhotos"
              className="flex items-center px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-l-lg cursor-pointer hover:bg-blue-100"
            >
              Choose File
            </label>
            <div className="flex-1 px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
              No file chosen
            </div>
            <input
              id="galleryPhotos"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Photo Title"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Add More Gallery Photos Button */}
        <div className="mb-6">
          <button
            type="button"
            className="flex items-center px-4 py-2 text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50"
            onClick={() => {
              // You may want to add functionality for this button
              document.getElementById("galleryPhotos")?.click();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add More Gallery Photos
          </button>
        </div>

        {/* Gallery photos preview */}
        {photos && photos.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.slice(1).map((photo, index) => (
              <div key={index + 1} className="relative">
                <img
                  src={photo.preview || URL.createObjectURL(photo)}
                  alt={`Property ${index + 2}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button 
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  onClick={() => removeImage(index + 1)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosTab;
