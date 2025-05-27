"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  X, 
  ChevronLeft, 
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import Link from 'next/link';

export default function AddListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    city: '',
    status: 'Active',
    source: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your API
    
    // For demo purposes, we'll just navigate back to the listings page
    router.push('/dashboard/admin/commercial-listings');
  };
  
  return (
    <div className="p-4 md:p-6">
      {/* Header with title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/admin/commercial-listings" 
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Add New Listing</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/dashboard/admin/commercial-listings')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition duration-300"
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
          
          <button 
            type="submit"
            form="listing-form"
            className="flex items-center gap-2 bg-[#00a0d1] hover:bg-[#0088b3] text-white py-2 px-4 rounded-lg transition duration-300"
          >
            <Save size={18} />
            <span>Save Listing</span>
          </button>
        </div>
      </div>
      
      {/* Main form */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <form id="listing-form" onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Listing Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter listing name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter a detailed description of the listing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Listing Price*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Featured">Featured</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Enter source"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mb-2 text-center">
                    Drag and drop your images here, or click to select files
                  </p>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-[#00a0d1] hover:bg-[#0088b3] text-white py-2 px-4 rounded-lg transition duration-300"
                  >
                    <Upload size={16} />
                    <span>Upload Images</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-5 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push('/dashboard/admin/commercial-listings')}
                className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#00a0d1] hover:bg-[#0088b3] text-white rounded-lg transition duration-300"
              >
                Save Listing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
