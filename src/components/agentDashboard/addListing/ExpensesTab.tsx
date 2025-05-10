"use client";

import React from 'react';

interface ExpensesTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ExpensesTab: React.FC<ExpensesTabProps> = ({ formData, handleChange }) => {  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Expenses</h2>
      
      {/* First row - Three expense fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Monthly Rent */}
        <div>
          <label htmlFor="monthlyRent" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Monthly Rent($)
          </label>
          <input
            type="number"
            id="monthlyRent"
            name="monthlyRent"
            value={formData.monthlyRent || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        {/* Payroll */}
        <div>
          <label htmlFor="payroll" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Payroll($)
          </label>
          <input
            type="number"
            id="payroll"
            name="payroll"
            value={formData.payroll || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        {/* Utilities */}
        <div>
          <label htmlFor="utilities" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Utilities($)
          </label>
          <input
            type="number"
            id="utilities"
            name="utilities"
            value={formData.utilities || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>
      </div>

      {/* Second row - Two expense fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* COG */}
        <div>
          <label htmlFor="cog" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            COG($)
          </label>
          <input
            type="number"
            id="cog"
            name="cog"
            value={formData.cog || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>

        {/* Misc */}
        <div>
          <label htmlFor="misc" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Misc
          </label>
          <input
            type="number"
            id="misc"
            name="misc"
            value={formData.misc || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder=""
          />
        </div>
      </div>

      {/* Managers field */}
      <div className="mb-4">
        <label htmlFor="managers" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Managers
        </label>
        <input
          type="text"
          id="managers"
          name="managers"
          value={formData.managers || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder=""
        />
      </div>

      {/* Business specifics textarea */}
      <div className="mt-6">
        <label htmlFor="businessSpecifics" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Please list any other specifics about your business that we should know:
        </label>
        <textarea
          id="businessSpecifics"
          name="businessSpecifics"
          value={formData.businessSpecifics || ""}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  );
};

export default ExpensesTab;
