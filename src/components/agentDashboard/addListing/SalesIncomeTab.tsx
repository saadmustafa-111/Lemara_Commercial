"use client";

import React from 'react';

interface SalesIncomeTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const SalesIncomeTab: React.FC<SalesIncomeTabProps> = ({ formData, handleChange }) => {  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Sales / Income</h2>
      
      {/* First row - Annual income fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Annual Taxable Sales */}
        <div>
          <label htmlFor="annualTaxableSales" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Annual Taxable Sales($)
          </label>
          <input
            type="number"
            id="annualTaxableSales"
            name="annualTaxableSales"
            value={formData.annualTaxableSales || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        {/* Annual Non-Tax Sales */}
        <div>
          <label htmlFor="annualNonTaxSales" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Annual Non-Tax Sales($)
          </label>
          <input
            type="number"
            id="annualNonTaxSales"
            name="annualNonTaxSales"
            value={formData.annualNonTaxSales || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        {/* Annual Other Income */}
        <div>
          <label htmlFor="annualOtherIncome" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Annual Other Income($)
          </label>
          <input
            type="number"
            id="annualOtherIncome"
            name="annualOtherIncome"
            value={formData.annualOtherIncome || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>
      </div>

      {/* Annual Rental Income */}
      <div className="mb-4">
        <label htmlFor="annualRentalIncome" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Annual Rental Income($)
        </label>
        <input
          type="number"
          id="annualRentalIncome"
          name="annualRentalIncome"
          value={formData.annualRentalIncome || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder=""
        />
      </div>

      {/* Regular Sales */}
      <div className="mb-4">
        <label htmlFor="regularSales" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Regular Sales:
        </label>
        <div className="flex">
          <input
            type="number"
            id="regularSales"
            name="regularSales"
            value={formData.regularSales || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0"
          />
          <select
            id="regularSalesUnit"
            name="regularSalesUnit"
            value={formData.regularSalesUnit || "gal/yr"}
            onChange={handleChange}
            className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="gal/yr">gal/yr</option>
            <option value="L/yr">L/yr</option>
            <option value="units/yr">units/yr</option>
            <option value="items/yr">items/yr</option>
          </select>
        </div>
      </div>

      
    </div>
  );
};

export default SalesIncomeTab;
