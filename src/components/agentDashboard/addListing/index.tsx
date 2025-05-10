"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Import Tab Components
import TabNavigation from './TabNavigation';
import PropertyBasicsTab from './PropertyBasicsTab';
import PropertyDetailsTab from './PropertyDetailsTab';
import SalesIncomeTab from './SalesIncomeTab';
import ExpensesTab from './ExpensesTab';
import AdditionalInfoTab from './AdditionalInfoTab';
import AccessibilityTab from './AccessibilityTab';
import PhotosTab from './PhotosTab';
import ActivitiesTab from './ActivitiesTab';

// Import Utilities
import usePhotoUpload from './usePhotoUpload';
import { validatePropertyForm, formatFormData } from './formValidation';
import { ValidationError } from './formValidation';

const AddListingForm = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Initialize photo upload hook
  const { photos, handleFileChange, removeImage, cleanupPreviews } = usePhotoUpload();
  
  // Form state for all tabs
  const [formData, setFormData] = useState({
    // Basics Tab
    businessLegalName: "",
    propertyType: "Agriculture",
    propertySubtype: "Greenhouse With Processing Unit",
    dba: "",
    askingPrice: "",
    status: "Active",
    showCounty: true,
    showCity: true,
    isFeatured: false,
    
    // Owner Details
    ownerName1: "",
    ownerEmail1: "",
    ownerName2: "",
    ownerEmail2: "",
    
    // Details Tab
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    squareFootage: "",
    lotSize: "",
    yearBuilt: "",
    parking: "",
    
    // Sales/Income Tab
    annualRevenue: "",
    cashFlow: "",
    inventoryValue: "",
    
    // Expenses Tab
    rent: "",
    utilities: "",
    payroll: "",
    propertyTaxes: "",
    insurance: "",
    maintenance: "",
    
    // Additional Info Tab
    yearEstablished: "",
    employees: "",
    reasonForSelling: "",
    competitiveAdvantage: "",
    
    // Accessibility Tab
    wheelchairAccessible: false,
    elevatorAccess: false,
    handicapParking: false,
    brailleSignage: false,
    accessibleRestrooms: false,
    
    // Activities - empty array initially
    activities: [] as Array<{timestamp: string; message: string; user: string}>,
  });

  // Cleanup photo previews when component unmounts
  useEffect(() => {
    return () => {
      cleanupPreviews();
    };
  }, []);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkboxes
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Validate current tab before proceeding
  const validateCurrentTab = (): boolean => {
    const errors = validatePropertyForm(formData);
    setValidationErrors(errors);
    
    // Filter errors relevant to the current tab
    let currentTabErrors: ValidationError[] = [];
    
    switch (activeTab) {
      case 1: // Property Basics
        currentTabErrors = errors.filter(error => 
          ['businessLegalName', 'propertyType', 'propertySubtype', 'dba', 'askingPrice', 'status',
           'ownerName1', 'ownerEmail1', 'ownerName2', 'ownerEmail2'].includes(error.field)
        );
        break;
      case 2: // Details
        currentTabErrors = errors.filter(error => 
          ['description', 'address', 'city', 'state', 'zipCode', 'squareFootage', 'lotSize', 'yearBuilt', 'parking'].includes(error.field)
        );
        break;
      // Add cases for other tabs as needed
    }
    
    return currentTabErrors.length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const errors = validatePropertyForm(formData);
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      // Find the tab with the first error and navigate to it
      const errorFields = errors.map(error => error.field);
      
      if (errorFields.some(field => ['businessLegalName', 'propertyType', 'propertySubtype', 'dba', 'askingPrice', 'status',
                                     'ownerName1', 'ownerEmail1', 'ownerName2', 'ownerEmail2'].includes(field))) {
        setActiveTab(1);
      } else if (errorFields.some(field => ['description', 'address', 'city', 'state', 'zipCode', 'squareFootage', 'lotSize', 'yearBuilt', 'parking'].includes(field))) {
        setActiveTab(2);
      }
      // Add conditions for other tabs
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const submissionData = {
        ...formatFormData(formData),
        photos: photos // You might need to convert these to form data or handle differently depending on your API
      };
      
      // API call would go here
      console.log("Form submitted:", submissionData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add success message
      alert("Property listing created successfully!");
      
      // Redirect after successful submission
      router.push('/dashboard/agent/listings');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle next tab
  const handleNext = () => {
    if (validateCurrentTab() && activeTab < 8) {
      setActiveTab(activeTab + 1);
    }
  };
  
  // Handle previous tab
  const handlePrevious = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };
  
  // Get error message for a field
  const getErrorMessage = (fieldName: string): string | null => {
    const error = validationErrors.find(err => err.field === fieldName);
    return error ? error.message : null;
  };
  
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab 1: Property Basics */}
          {activeTab === 1 && (
            <PropertyBasicsTab formData={formData} handleChange={handleChange} />
          )}
          
          {/* Tab 2: Details */}
          {activeTab === 2 && (
            <PropertyDetailsTab formData={formData} handleChange={handleChange} />
          )}
          
          {/* Tab 3: Sales / Income */}
          {activeTab === 3 && (
            <SalesIncomeTab formData={formData} handleChange={handleChange} />
          )}
          
          {/* Tab 4: Expenses */}
          {activeTab === 4 && (
            <ExpensesTab formData={formData} handleChange={handleChange} />
          )}
          
          {/* Tab 5: Additional Information */}
          {activeTab === 5 && (
            <AdditionalInfoTab formData={formData} handleChange={handleChange} />
          )}
          
          {/* Tab 6: Accessibility Settings */}
          {activeTab === 6 && (
            <AccessibilityTab formData={formData} handleChange={handleChange} />
          )}
          
          {/* Tab 7: Photos */}
          {activeTab === 7 && (
            <PhotosTab 
              photos={photos} 
              handleFileChange={handleFileChange} 
              removeImage={removeImage} 
            />
          )}
          
          {/* Tab 8: Activities */}
          {activeTab === 8 && (
            <ActivitiesTab activities={formData.activities} />
          )}

          {/* Display validation errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-800 dark:text-red-100" role="alert">
              <strong className="font-bold">Please fix the following errors:</strong>
              <ul className="mt-1 list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div>
              {activeTab > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Previous
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard/agent/listings"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </Link>
              
              {activeTab < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-[#9A2236] text-white rounded-md hover:bg-[#8A1226] transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:bg-green-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </button>
              )}
              
              {activeTab < 8 && (
                <button
                  type="button"
                  className="px-4 py-2 text-[#9A2236] hover:underline"
                  onClick={() => {
                    // Save current form data
                    console.log("Saving data...");
                  }}
                >
                  Save & Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingForm;
