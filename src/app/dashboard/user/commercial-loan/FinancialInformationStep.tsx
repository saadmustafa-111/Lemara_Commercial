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
              <label htmlFor="annualIncome" className="input-label">
                <span className="text-red-500">*</span> Current Annual Income:
              </label>
              <input
                type="number"
                id="annualIncome"
                name="annualIncome"
                value={formData.annualIncome || ''}
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

       

       
       

      
      </div>
    </>
  )
}

export default FinancialInformationStep
