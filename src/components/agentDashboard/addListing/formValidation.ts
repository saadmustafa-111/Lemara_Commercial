"use client";

export interface ValidationError {
  field: string;
  message: string;
}

export const validatePropertyForm = (formData: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Basic Tab Validation
  if (!formData.businessLegalName) {
    errors.push({
      field: 'businessLegalName',
      message: 'Business legal name is required'
    });
  } else if (formData.businessLegalName.length > 50) {
    errors.push({
      field: 'businessLegalName',
      message: 'Business legal name must be less than 50 characters'
    });
  }

  if (!formData.askingPrice) {
    errors.push({
      field: 'askingPrice',
      message: 'Asking price is required'
    });
  } else if (isNaN(formData.askingPrice) || parseFloat(formData.askingPrice) <= 0) {
    errors.push({
      field: 'askingPrice',
      message: 'Asking price must be a positive number'
    });
  }

  // Email validation for owner emails
  if (formData.ownerEmail1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail1)) {
    errors.push({
      field: 'ownerEmail1',
      message: 'Please enter a valid email address'
    });
  }

  if (formData.ownerEmail2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail2)) {
    errors.push({
      field: 'ownerEmail2',
      message: 'Please enter a valid email address'
    });
  }

  // Details Tab Validation
  if (formData.squareFootage && (isNaN(formData.squareFootage) || parseFloat(formData.squareFootage) <= 0)) {
    errors.push({
      field: 'squareFootage',
      message: 'Square footage must be a positive number'
    });
  }

  if (formData.lotSize && (isNaN(formData.lotSize) || parseFloat(formData.lotSize) <= 0)) {
    errors.push({
      field: 'lotSize',
      message: 'Lot size must be a positive number'
    });
  }

  // Year validations
  if (formData.yearBuilt) {
    const currentYear = new Date().getFullYear();
    const yearBuilt = parseInt(formData.yearBuilt);
    
    if (isNaN(yearBuilt) || yearBuilt < 1800 || yearBuilt > currentYear) {
      errors.push({
        field: 'yearBuilt',
        message: `Year built must be between 1800 and ${currentYear}`
      });
    }
  }

  if (formData.yearEstablished) {
    const currentYear = new Date().getFullYear();
    const yearEstablished = parseInt(formData.yearEstablished);
    
    if (isNaN(yearEstablished) || yearEstablished < 1800 || yearEstablished > currentYear) {
      errors.push({
        field: 'yearEstablished',
        message: `Year established must be between 1800 and ${currentYear}`
      });
    }
  }

  return errors;
};

export const formatFormData = (formData: any) => {
  // Format and clean the form data for submission
  const cleanData = { ...formData };
  
  // Convert numeric strings to numbers
  const numericFields = [
    'askingPrice', 'squareFootage', 'lotSize', 'yearBuilt', 'parking',
    'annualRevenue', 'cashFlow', 'inventoryValue',
    'rent', 'utilities', 'payroll', 'propertyTaxes', 'insurance', 'maintenance',
    'yearEstablished', 'employees'
  ];
  
  numericFields.forEach(field => {
    if (cleanData[field] && !isNaN(cleanData[field])) {
      cleanData[field] = parseFloat(cleanData[field]);
    }
  });
  
  return cleanData;
};

export default {
  validatePropertyForm,
  formatFormData
};
