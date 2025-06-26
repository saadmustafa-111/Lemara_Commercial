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
              <label htmlFor="businessType" className="input-label">
                <span className="text-red-500">*</span> Business Type:
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType || ''}
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
            
            <div>
              <label htmlFor="federalTaxId" className="input-label">
                <span className="text-red-500">*</span> Federal Tax ID (EIN):
              </label>
              <input
                type="text"
                id="federalTaxId"
                name="federalTaxId"
                value={formData.federalTaxId || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 12-3456789"
                required
              />
            </div>
            
            <div>
              <label htmlFor="yearEstablished" className="input-label">
                <span className="text-red-500">*</span> Year Established:
              </label>
              <input
                type="number"
                id="yearEstablished"
                name="yearEstablished"
                value={formData.yearEstablished || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2015"
                min="1900"
                max="2025"
                required
              />
            </div>
            
            <div>
              <label htmlFor="industryType" className="input-label">Industry Type:</label>
              <select
                id="industryType"
                name="industryType"
                value={formData.industryType || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Industry</option>
                <option value="agriculture">Agriculture</option>
                <option value="construction">Construction</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="transportation">Transportation</option>
                <option value="finance">Finance & Insurance</option>
                <option value="real_estate">Real Estate</option>
                <option value="professional_services">Professional Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="accommodation">Accommodation & Food Services</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="numberOfEmployees" className="input-label">Number of Employees:</label>
              <select
                id="numberOfEmployees"
                name="numberOfEmployees"
                value={formData.numberOfEmployees || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Range</option>
                <option value="1">1 (Self-employed)</option>
                <option value="2_5">2-5</option>
                <option value="6_10">6-10</option>
                <option value="11_25">11-25</option>
                <option value="26_50">26-50</option>
                <option value="51_100">51-100</option>
                <option value="101_500">101-500</option>
                <option value="500_plus">500+</option>
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
            
            <div className="md:col-span-5">
              <label htmlFor="businessCity" className="input-label">
                <span className="text-red-500">*</span> City:
              </label>
              <input
                type="text"
                id="businessCity"
                name="businessCity"
                value={formData.businessCity || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="City"
                required
              />
            </div>
            
            <div className="md:col-span-4">
              <label htmlFor="businessState" className="input-label">
                <span className="text-red-500">*</span> State:
              </label>
              <select
                id="businessState"
                name="businessState"
                value={formData.businessState || ''}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                {/* Add more states as needed */}
              </select>
            </div>
            
            <div className="md:col-span-3">
              <label htmlFor="businessZip" className="input-label">
                <span className="text-red-500">*</span> Zip Code:
              </label>
              <input
                type="text"
                id="businessZip"
                name="businessZip"
                value={formData.businessZip || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="Zip"
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
            
            <div>
              <label htmlFor="businessNetIncome" className="input-label">Annual Net Income:</label>
              <input
                type="number"
                id="businessNetIncome"
                name="businessNetIncome"
                value={formData.businessNetIncome || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 350000"
              />
            </div>
            
            <div>
              <label htmlFor="businessDebt" className="input-label">Total Business Debt:</label>
              <input
                type="number"
                id="businessDebt"
                name="businessDebt"
                value={formData.businessDebt || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 150000"
              />
            </div>
            
            <div>
              <label htmlFor="businessAssets" className="input-label">Total Business Assets:</label>
              <input
                type="number"
                id="businessAssets"
                name="businessAssets"
                value={formData.businessAssets || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 800000"
              />
            </div>
          </div>
        </div>

        {/* Business Revenue History - Last 3 Years */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Business Revenue History (Last 3 Years)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="businessRevenue2022" className="input-label">2022 Revenue:</label>
              <input
                type="number"
                id="businessRevenue2022"
                name="businessRevenue2022"
                value={formData.businessRevenue2022 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2200000"
              />
            </div>
            
            <div>
              <label htmlFor="businessRevenue2023" className="input-label">2023 Revenue:</label>
              <input
                type="number"
                id="businessRevenue2023"
                name="businessRevenue2023"
                value={formData.businessRevenue2023 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2350000"
              />
            </div>
            
            <div>
              <label htmlFor="businessRevenue2024" className="input-label">2024 Revenue:</label>
              <input
                type="number"
                id="businessRevenue2024"
                name="businessRevenue2024"
                value={formData.businessRevenue2024 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2500000"
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
            
            <div>
              <label htmlFor="loanPurpose" className="input-label">
                <span className="text-red-500">*</span> Primary Loan Purpose:
              </label>
              <select
                id="loanPurpose"
                name="loanPurpose"
                value={formData.loanPurpose || ''}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Loan Purpose</option>
                <option value="working_capital">Working Capital</option>
                <option value="equipment_purchase">Equipment Purchase</option>
                <option value="real_estate_purchase">Real Estate Purchase</option>
                <option value="business_expansion">Business Expansion</option>
                <option value="inventory_financing">Inventory Financing</option>
                <option value="debt_consolidation">Debt Consolidation</option>
                <option value="renovation">Renovation/Improvements</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="businessPlan" className="input-label">
                Detailed Business Plan/Use of Funds:
              </label>
              <textarea
                id="businessPlan"
                name="businessPlan"
                value={formData.businessPlan || ''}
                onChange={handleChange}
                className="form-textarea"
                rows={4}
                placeholder="Please describe in detail how the loan funds will be used and your business plan..."
              />
            </div>
          </div>
        </div>

        {/* Business Banking */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Business Banking Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="businessBankName" className="input-label">Business Bank Name:</label>
              <input
                type="text"
                id="businessBankName"
                name="businessBankName"
                value={formData.businessBankName || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Wells Fargo Business"
              />
            </div>
            
            <div>
              <label htmlFor="businessBankingYears" className="input-label">Years with Business Bank:</label>
              <select
                id="businessBankingYears"
                name="businessBankingYears"
                value={formData.businessBankingYears || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Years</option>
                <option value="less_than_1">Less than 1 year</option>
                <option value="1_2">1-2 years</option>
                <option value="3_5">3-5 years</option>
                <option value="6_10">6-10 years</option>
                <option value="more_than_10">More than 10 years</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="averageMonthlyBalance" className="input-label">Average Monthly Balance:</label>
              <input
                type="number"
                id="averageMonthlyBalance"
                name="averageMonthlyBalance"
                value={formData.averageMonthlyBalance || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 75000"
              />
            </div>
            
            <div>
              <label htmlFor="existingBusinessLoans" className="input-label">Existing Business Loans:</label>
              <select
                id="existingBusinessLoans"
                name="existingBusinessLoans"
                value={formData.existingBusinessLoans || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="1">1 loan</option>
                <option value="2_3">2-3 loans</option>
                <option value="4_plus">4+ loans</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessInformationStep
