"use client"
import React from 'react'

interface ApplicantInformationStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ApplicantInformationStep: React.FC<ApplicantInformationStepProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-6">
        {/* Address Section */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Address Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-12">
              <label htmlFor="address" className="input-label">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="123 Main St."
              />
            </div>
            
            <div className="md:col-span-5">
              <label htmlFor="city" className="input-label">City:</label>
              <select
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select City</option>
                <option value="new_york">New York</option>
                <option value="los_angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
                <option value="phoenix">Phoenix</option>
              </select>
            </div>
            
            <div className="md:col-span-4">
              <label htmlFor="state" className="input-label">State:</label>
              <select
                id="state"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                {/* Add more states as needed */}
              </select>
            </div>
            
            <div className="md:col-span-3">
              <label htmlFor="zip" className="input-label">Zip Code:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="Zip"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="homePhone" className="input-label">Home Phone:</label>
              <input
                type="tel"
                id="homePhone"
                name="homePhone"
                value={formData.homePhone || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            
            <div>
              <label htmlFor="businessPhone" className="input-label">Business Phone:</label>
              <input
                type="tel"
                id="businessPhone"
                name="businessPhone"
                value={formData.businessPhone || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="emailAddress" className="input-label">
                <span className="text-red-500">*</span> Email Address:
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Personal Information Section */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6">
              <label htmlFor="driversLicense" className="input-label">Driver's License Number:</label>
              <input
                type="text"
                id="driversLicense"
                name="driversLicense"
                value={formData.driversLicense || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="License Number"
              />
            </div>
            
            <div className="md:col-span-6">
              <label htmlFor="licenseState" className="input-label">License State:</label>
              <select
                id="licenseState"
                name="licenseState"
                value={formData.licenseState || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                {/* Add more states as needed */}
              </select>
            </div>
            
            <div className="md:col-span-6">
              <label htmlFor="dateOfBirth" className="input-label">Date of Birth:</label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="MM/DD/YYYY"
              />
            </div>
            
            <div className="md:col-span-6">
              <label htmlFor="dependents" className="input-label"># of Dependents:</label>
              <select
                id="dependents"
                name="dependents"
                value={formData.dependents || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicantInformationStep
