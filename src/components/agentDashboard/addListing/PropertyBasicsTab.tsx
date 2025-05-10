"use client";

import React, { useState } from 'react';

interface PropertyBasicsTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

interface OwnerField {
  nameId: string;
  emailId: string;
}

const PropertyBasicsTab: React.FC<PropertyBasicsTabProps> = ({ formData, handleChange }) => {
  const [ownerFields, setOwnerFields] = useState<OwnerField[]>([
    { nameId: "ownerName1", emailId: "ownerEmail1" },
    { nameId: "ownerName2", emailId: "ownerEmail2" }
  ]);
  
  const addOwnerField = () => {
    const newIndex = ownerFields.length + 1;
    setOwnerFields([
      ...ownerFields, 
      { 
        nameId: `ownerName${newIndex}`, 
        emailId: `ownerEmail${newIndex}` 
      }
    ]);
  };
  
  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="businessLegalName" className="block mb-2 text-sm font-medium text-gray-700">
            Business Legal Name
          </label>
          <input
            type="text"
            id="businessLegalName"
            name="businessLegalName"
            value={formData.businessLegalName ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Max 50 Characters"
            maxLength={50}
          />
        </div>
        
        {/* Property Type and Subtype in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="propertyType" className="block mb-2 text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Property Type</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
              <option value="Land">Land</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="propertySubtype" className="block mb-2 text-sm font-medium text-gray-700">
              Property Subtype
            </label>
            <select
              id="propertySubtype"
              name="propertySubtype"
              value={formData.propertySubtype ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Property Subtype</option>
              <option value="Greenhouse With Processing Unit">Greenhouse With Processing Unit</option>
              <option value="Farm">Farm</option>
              <option value="Ranch">Ranch</option>
              <option value="Vineyard">Vineyard</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* DBA and Asking Price in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dba" className="block mb-2 text-sm font-medium text-gray-700">
              DBA
            </label>
            <input
              type="text"
              id="dba"
              name="dba"
              value={formData.dba ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="askingPrice" className="block mb-2 text-sm font-medium text-gray-700">
              Asking Price($)
            </label>
            <input
              type="number"
              id="askingPrice"
              name="askingPrice"
              value={formData.askingPrice ?? ""}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Status and Options in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Sold">Sold</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Options
            </label>
            <div className="flex flex-wrap space-x-4 py-2 px-3 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showCounty"
                  name="showCounty"
                  checked={formData.showCounty ?? false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="showCounty" className="ml-2 text-sm text-gray-700">
                  Show County
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showCity"
                  name="showCity"
                  checked={formData.showCity ?? false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="showCity" className="ml-2 text-sm text-gray-700">
                  Show City
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured ?? false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                  Is Featured
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 mb-4">
        <h3 className="text-lg font-medium text-gray-800">Owner Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ownerFields.map((field, index) => (
          <React.Fragment key={field.nameId}>
            <div>
              <input
                type="text"
                id={field.nameId}
                name={field.nameId}
                value={formData[field.nameId] ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Owner Name ${index + 1}`}
              />
            </div>
            <div className={index === ownerFields.length - 1 ? "relative" : ""}>
              <input
                type="email"
                id={field.emailId}
                name={field.emailId}
                value={formData[field.emailId] ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Owner Email ${index + 1}`}
              />
              {index === ownerFields.length - 1 && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-blue-600 font-semibold"
                  onClick={addOwnerField}
                >
                  +
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex mt-4 justify-center">
        <button
          type="button"
          className="text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-6 py-2 rounded-full border border-blue-200 transition-colors duration-200"
          onClick={addOwnerField}
        >
          Add Another Owner
        </button>
      </div>
      
      {/* Address Section */}
      <div className="mt-8 mb-4">
        <h3 className="text-lg font-medium text-gray-800">Address</h3>
      </div>
      
      <div className="space-y-4">
        {/* Country and Address in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex items-center whitespace-nowrap bg-gray-100 border border-gray-300 rounded-lg px-2 py-1">
                <input
                  type="checkbox"
                  id="makeAddressConfidential"
                  name="makeAddressConfidential"
                  checked={formData.makeAddressConfidential ?? false}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="makeAddressConfidential" className="ml-2 text-xs text-gray-700">
                  Confidential
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* City, State, and County in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select State</option>
              <option value="California">California</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="New York">New York</option>
              <option value="Washington">Washington</option>
              <option value="Oregon">Oregon</option>
              <option value="Nevada">Nevada</option>
              {/* Add more states as needed */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="county" className="block mb-2 text-sm font-medium text-gray-700">
              County
            </label>
            <select
              id="county"
              name="county"
              value={formData.county ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select County</option>
              <option value="Marin County">Marin County</option>
              <option value="Los Angeles County">Los Angeles County</option>
              <option value="San Diego County">San Diego County</option>
              <option value="San Francisco County">San Francisco County</option>
              {/* Add more counties as needed */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Zip, Tel, and Fax in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-700">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-700">
              Tel
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="fax" className="block mb-2 text-sm font-medium text-gray-700">
              Fax
            </label>
            <input
              type="text"
              id="fax"
              name="fax"
              value={formData.fax ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Website remains full width */}
        <div>
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* Description remains full width */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PropertyBasicsTab;
