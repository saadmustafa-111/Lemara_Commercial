"use client"
import React from 'react'

interface ReviewStepProps {
  formData: any;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  // Helper function to format object values for display
  const formatValue = (value: any) => {
    if (value === undefined || value === null || value === '') {
      return 'Not provided';
    }
    
    if (typeof value === 'object' && value instanceof FileList) {
      return `${value.length} file(s) selected`;
    }
    
    return value;
  };

  // Check if a section has at least one field filled out
  const isSectionFilled = (section: Record<string, any>) => {
    return Object.values(section).some(value => value !== undefined && value !== null && value !== '');
  };

  // Extract sections from formData
  const personalInfo = {
    'First Name': formData.firstName,
    'Last Name': formData.lastName,
    'SSN/TIN': formData.ssn,
    'Purpose of Loan': formData.details
  };

  const applicantInfo = {
    'Address': formData.address,
    'City': formData.city,
    'State': formData.state,
    'Zip': formData.zip,
    'Home Phone': formData.houseNumber,
    'Business Phone': formData.businessNumber,
    'Email Address': formData.email
  };
  // Loan information section removed

  const financialInfo = {
    'Current Annual Income': formData.annualIncome ? `$${formData.annualIncome}` : '',
    'Monthly Expenses': formData.monthlyExpenses ? `$${formData.monthlyExpenses}` : '',
    'Credit Score': formData.creditScore,
    'Existing Debt': formData.existingDebt ? `$${formData.existingDebt}` : ''
    
  };

  const businessInfo = {
    'Business Name': formData.businessName,
    'Business Type': formData.businesstype,
    'Business Address': formData.businessAddress,
    'Annual Revenue': formData.annualBusinessRevenue ? `$${formData.annualBusinessRevenue}` : '',
    'Requested Loan Amount': formData.loanAmount ? `$${formData.loanAmount}` : ''
  };
  // Property info and documents sections removed
  return (
    <div className="review-section space-y-8">
      <div className="bg-white bg-opacity-80 rounded-xl shadow-sm p-6 border-l-4 border-[#00a0d1]">
        <h3 className="text-xl font-medium mb-2 text-gray-800">Application Review</h3>
        <p className="text-sm text-gray-600">
          Please check that all information is accurate before submitting your application.
          You can go back to previous sections to make changes if needed.
        </p>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
        <h4 className="text-md font-medium text-[#00a0d1] mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Personal Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(personalInfo).map(([key, value]) => (
            <div key={key} className="flex items-start">
              <span className="font-medium min-w-[180px] text-gray-700">{key}:</span>
              <span className="text-gray-800">{formatValue(value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Applicant Information Section */}
      {isSectionFilled(applicantInfo) && (
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h4 className="text-md font-medium text-[#00a0d1] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Applicant's Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(applicantInfo).map(([key, value]) => (
              <div key={key} className="flex items-start">
                <span className="font-medium min-w-[180px] text-gray-700">{key}:</span>
                <span className="text-gray-800">{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financial Information Section */}
      {isSectionFilled(financialInfo) && (
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h4 className="text-md font-medium text-[#00a0d1] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Financial Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(financialInfo).map(([key, value]) => (
              <div key={key} className={key === 'Financial Comments' ? "col-span-1 md:col-span-2 flex items-start" : "flex items-start"}>
                <span className="font-medium min-w-[180px] text-gray-700">{key}:</span>
                <span className="text-gray-800">{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business Information Section */}
      {isSectionFilled(businessInfo) && (
        <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
          <h4 className="text-md font-medium text-[#00a0d1] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Business Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(businessInfo).map(([key, value]) => (
              <div key={key} className={key === 'Business Plan' ? "col-span-1 md:col-span-2 flex items-start" : "flex items-start"}>
                <span className="font-medium min-w-[180px] text-gray-700">{key}:</span>
                <span className="text-gray-800">{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-800">
            By submitting this application, I certify that all information provided is accurate and complete. 
            I understand that providing false information may result in the denial of my loan application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
