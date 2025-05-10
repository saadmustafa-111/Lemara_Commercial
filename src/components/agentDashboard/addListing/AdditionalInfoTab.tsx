"use client";

import React from 'react';

interface AdditionalInfoTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AdditionalInfoTab: React.FC<AdditionalInfoTabProps> = ({ formData, handleChange }) => {  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Additional Information</h2>
      <div className="space-y-4">
        {/* Year Established and Number of Employees in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="yearEstablished" className="block mb-2 text-sm font-medium text-gray-700">
              Year Established
            </label>
            <input
              type="number"
              id="yearEstablished"
              name="yearEstablished"
              value={formData.yearEstablished ?? ""}
              onChange={handleChange}
              min="1900"
              max="2099"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="employees" className="block mb-2 text-sm font-medium text-gray-700">
              Number of Employees
            </label>
            <input
              type="number"
              id="employees"
              name="employees"
              value={formData.employees ?? ""}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Reason for Selling */}
        <div>
          <label htmlFor="reasonForSelling" className="block mb-2 text-sm font-medium text-gray-700">
            Reason for Selling
          </label>
          <textarea
            id="reasonForSelling"
            name="reasonForSelling"
            value={formData.reasonForSelling ?? ""}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
        
       
      </div>
    </div>
  );
};

export default AdditionalInfoTab;
