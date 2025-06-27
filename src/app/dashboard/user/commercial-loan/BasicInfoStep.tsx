"use client"
import React from 'react'

interface BasicInfoStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-6">
        {/* Primary Applicant Section */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Primary Applicant</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <label htmlFor="firstName" className="input-label">
                <span className="required-mark">*</span> First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="First Name"
                required
              />
            </div>
            
            <div className="md:col-span-4">
              <label htmlFor="lastName" className="input-label">
                <span className="required-mark">*</span> Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="Last Name"
                required
              />
            </div>
            
            <div className="md:col-span-4">
              <label htmlFor="ssn" className="input-label">
                <span className="required-mark">*</span> SSN/TIN:
              </label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={formData.ssn || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="Social Security Number"
                required
              />
            </div>
          </div>
        </div>
        
      
        {/* Loan Details Section */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Loan Details</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>              <label htmlFor="details" className="input-label">
                <span className="required-mark">*</span> Purpose of Loan:
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details || ''}
                onChange={handleChange}
                className="form-textarea"
                rows={3}
                placeholder="Describe the purpose of this loan"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicInfoStep
