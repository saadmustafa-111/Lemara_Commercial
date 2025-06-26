"use client"
import React from 'react'

interface FinancialInformationStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FinancialInformationStep: React.FC<FinancialInformationStepProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-6">
        {/* Current Financial Status */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Current Financial Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="currentAnnualIncome" className="input-label">
                <span className="text-red-500">*</span> Current Annual Income:
              </label>
              <input
                type="number"
                id="currentAnnualIncome"
                name="currentAnnualIncome"
                value={formData.currentAnnualIncome || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 150000"
                required
              />
            </div>
            
            <div>
              <label htmlFor="monthlyExpenses" className="input-label">Monthly Expenses:</label>
              <input
                type="number"
                id="monthlyExpenses"
                name="monthlyExpenses"
                value={formData.monthlyExpenses || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 8000"
              />
            </div>
            
            <div>
              <label htmlFor="creditScore" className="input-label">Credit Score:</label>
              <select
                id="creditScore"
                name="creditScore"
                value={formData.creditScore || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Credit Score Range</option>
                <option value="excellent">Excellent (750+)</option>
                <option value="good">Good (700-749)</option>
                <option value="fair">Fair (650-699)</option>
                <option value="poor">Poor (600-649)</option>
                <option value="bad">Bad (Below 600)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="existingDebt" className="input-label">Total Existing Debt:</label>
              <input
                type="number"
                id="existingDebt"
                name="existingDebt"
                value={formData.existingDebt || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 50000"
              />
            </div>
          </div>
        </div>

        {/* Assets Information */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Assets</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cashInBankAccounts" className="input-label">Cash in Bank Accounts:</label>
              <input
                type="number"
                id="cashInBankAccounts"
                name="cashInBankAccounts"
                value={formData.cashInBankAccounts || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 75000"
              />
            </div>
            
            <div>
              <label htmlFor="investmentAccounts" className="input-label">Investment Accounts:</label>
              <input
                type="number"
                id="investmentAccounts"
                name="investmentAccounts"
                value={formData.investmentAccounts || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 200000"
              />
            </div>
            
            <div>
              <label htmlFor="realEstateValue" className="input-label">Real Estate Value:</label>
              <input
                type="number"
                id="realEstateValue"
                name="realEstateValue"
                value={formData.realEstateValue || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 450000"
              />
            </div>
            
            <div>
              <label htmlFor="otherAssets" className="input-label">Other Assets:</label>
              <input
                type="number"
                id="otherAssets"
                name="otherAssets"
                value={formData.otherAssets || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 25000"
              />
            </div>
          </div>
        </div>

        {/* Income History - Last 5 Years */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Income History (Last 5 Years)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label htmlFor="incomeYear1" className="input-label">
                {new Date().getFullYear() - 4} Income:
              </label>
              <input
                type="number"
                id="incomeYear1"
                name="incomeYear1"
                value={formData.incomeYear1 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 120000"
              />
            </div>
            
            <div>
              <label htmlFor="incomeYear2" className="input-label">
                {new Date().getFullYear() - 3} Income:
              </label>
              <input
                type="number"
                id="incomeYear2"
                name="incomeYear2"
                value={formData.incomeYear2 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 130000"
              />
            </div>
            
            <div>
              <label htmlFor="incomeYear3" className="input-label">
                {new Date().getFullYear() - 2} Income:
              </label>
              <input
                type="number"
                id="incomeYear3"
                name="incomeYear3"
                value={formData.incomeYear3 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 140000"
              />
            </div>
            
            <div>
              <label htmlFor="incomeYear4" className="input-label">
                {new Date().getFullYear() - 1} Income:
              </label>
              <input
                type="number"
                id="incomeYear4"
                name="incomeYear4"
                value={formData.incomeYear4 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 145000"
              />
            </div>
            
            <div>
              <label htmlFor="incomeYear5" className="input-label">
                {new Date().getFullYear()} Income (YTD):
              </label>
              <input
                type="number"
                id="incomeYear5"
                name="incomeYear5"
                value={formData.incomeYear5 || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 150000"
              />
            </div>
          </div>
        </div>

        {/* Banking Information */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Banking Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primaryBankName" className="input-label">Primary Bank Name:</label>
              <input
                type="text"
                id="primaryBankName"
                name="primaryBankName"
                value={formData.primaryBankName || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Chase Bank"
              />
            </div>
            
            <div>
              <label htmlFor="accountType" className="input-label">Account Type:</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Account Type</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
                <option value="business">Business</option>
                <option value="money_market">Money Market</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="bankRelationshipYears" className="input-label">Years with Primary Bank:</label>
              <select
                id="bankRelationshipYears"
                name="bankRelationshipYears"
                value={formData.bankRelationshipYears || ''}
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
          </div>
        </div>

        {/* Additional Financial Comments */}
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Additional Financial Information</h3>
          
          <div>
            <label htmlFor="financialComments" className="input-label">
              Additional Comments or Financial Details:
            </label>
            <textarea
              id="financialComments"
              name="financialComments"
              value={formData.financialComments || ''}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
              placeholder="Please provide any additional financial information that may be relevant to your loan application..."
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FinancialInformationStep
