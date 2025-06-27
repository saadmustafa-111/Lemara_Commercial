"use client"
import React from 'react'

interface BusinessInformationStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BusinessInformationStep: React.FC<BusinessInformationStepProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-6">
        {/* Business Basic Information */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Business Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="businessName" className="input-label">
                <span className="text-red-500">*</span> Business Name:
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., ABC Manufacturing LLC"
                required
              />
            </div>
            
            <div>
              <label htmlFor="businesstype" className="input-label">
                <span className="text-red-500">*</span> Business Type:
              </label>
              <select
                id="businesstype"
                name="businesstype"
                value={formData.businesstype || ''}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Business Type</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llc">Limited Liability Company (LLC)</option>
                <option value="corporation">Corporation</option>
                <option value="s_corporation">S-Corporation</option>
                <option value="non_profit">Non-Profit</option>
              </select>
            </div>
            
          </div>
        </div>

        {/* Business Address */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Business Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-12">
              <label htmlFor="businessAddress" className="input-label">
                <span className="text-red-500">*</span> Business Address:
              </label>
              <input
                type="text"
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="123 Business St."
                required
              />
            </div>
           
          </div>
        </div>

        {/* Business Financial Information */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Business Financial Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="annualBusinessRevenue" className="input-label">
                <span className="text-red-500">*</span> Annual Business Revenue:
              </label>
              <input
                type="number"
                id="annualBusinessRevenue"
                name="annualBusinessRevenue"
                value={formData.annualBusinessRevenue || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2500000"
                required
              />
            </div>
            
            
            
           
            
           
          </div>
        </div>

       

        {/* Loan Purpose and Business Use */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Loan Purpose & Business Use</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="loanAmount" className="input-label">
                <span className="text-red-500">*</span> Requested Loan Amount:
              </label>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 500000"
                required
              />
            </div>
            
            
            
         
          </div>
        </div>

       
      </div>
    </>
  )
}

export default BusinessInformationStep
