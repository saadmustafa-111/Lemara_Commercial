"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddListingPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    status: "",
    price: "",
    priceUnit: "month", // "month" for rent, empty for sale
    location: "",
    address: "",
    city: "",
    postalCode: "",
    area: "",
    areaUnit: "sqft",
    bedrooms: "",
    bathrooms: "",
    features: {
      parking: false,
      airConditioning: false,
      heating: false,
      security: false,
      elevator: false,
      wifi: false,
      accessible: false,
    },
    images: [] as File[],
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked,
      },
    }));
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray],
      }));
    }
  };

  // Remove uploaded image
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the form data to your backend API
      // For now, we'll just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success! Redirect to listings page
      router.push("/dashboard/listings");
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("There was an error adding your listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Listing</h1>
        <Link 
          href="/dashboard/listings"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Back to Listings
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Property Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. Modern Office Space in Downtown"
                  required
                />
              </div>
              <div>
                <label htmlFor="propertyType" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Property Type*
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                  <option value="Retail">Retail</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Land">Land</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Listing Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="For Rent">For Rent</option>
                  <option value="For Sale">For Sale</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price*
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                      £
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                      placeholder="Price"
                      required
                    />
                  </div>
                </div>
                {formData.status === "For Rent" && (
                  <div>
                    <label htmlFor="priceUnit" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Per
                    </label>
                    <select
                      id="priceUnit"
                      name="priceUnit"
                      value={formData.priceUnit}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white h-[42px]"
                    >
                      <option value="month">Month</option>
                      <option value="week">Week</option>
                      <option value="year">Year</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Property Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
              placeholder="Provide a detailed description of the property..."
              required
            />
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Postal Code*
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="Postal Code"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location Display Name*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. London, UK"
                  required
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="area" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Area*
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                    placeholder="Area size"
                    required
                  />
                  <select
                    id="areaUnit"
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  >
                    <option value="sqft">sq ft</option>
                    <option value="sqm">sq m</option>
                    <option value="acres">acres</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="bedrooms" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="Number of bedrooms"
                />
              </div>
              <div>
                <label htmlFor="bathrooms" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bathrooms*
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2236] dark:bg-gray-700 dark:text-white"
                  placeholder="Number of bathrooms"
                  required
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  checked={formData.features.parking}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="parking" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Parking
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="airConditioning"
                  name="airConditioning"
                  checked={formData.features.airConditioning}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="airConditioning" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Air Conditioning
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="heating"
                  name="heating"
                  checked={formData.features.heating}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="heating" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Heating
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="security"
                  name="security"
                  checked={formData.features.security}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="security" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Security System
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="elevator"
                  name="elevator"
                  checked={formData.features.elevator}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="elevator" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Elevator
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                  checked={formData.features.wifi}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="wifi" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Wi-Fi
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="accessible"
                  name="accessible"
                  checked={formData.features.accessible}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#9A2236] border-gray-300 rounded focus:ring-[#9A2236] dark:focus:ring-[#9A2236] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="accessible" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Wheelchair Accessible
                </label>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Property Images</h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Images*
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="images"
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
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
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

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 bg-[#9A2236] text-white rounded-md hover:bg-[#851c2e] transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Add Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;