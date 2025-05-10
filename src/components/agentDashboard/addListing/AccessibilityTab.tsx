"use client";

import React from 'react';

interface AccessibilityTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AccessibilityTab: React.FC<AccessibilityTabProps> = ({ formData, handleChange }) => {  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Accessibility Settings</h2>
      
      {/* Autosend NDA */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Autosend NDA
          </label>
          <div className="ml-2 text-gray-600 cursor-help">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input 
              type="radio" 
              id="ndaYes" 
              name="autosendNda" 
              value="yes" 
              checked={formData.autosendNda === "yes"} 
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="ndaYes" className="ml-2 text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="ndaNo" 
              name="autosendNda" 
              value="no" 
              checked={formData.autosendNda === "no" || !formData.autosendNda} 
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="ndaNo" className="ml-2 text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>

      {/* Available To Broker */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Available To Broker
          </label>
          <div className="ml-2 text-gray-600 cursor-help">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input 
              type="radio" 
              id="brokerYes" 
              name="availableToBroker" 
              value="yes" 
              checked={formData.availableToBroker === "yes"} 
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="brokerYes" className="ml-2 text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              id="brokerNo" 
              name="availableToBroker" 
              value="no" 
              checked={formData.availableToBroker === "no" || !formData.availableToBroker} 
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="brokerNo" className="ml-2 text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      
    </div>
  );
};

export default AccessibilityTab;
