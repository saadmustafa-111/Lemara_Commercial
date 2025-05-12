"use client";

// Define a more comprehensive interface for form data
export interface PropertyFormData {
  businessLegalName?: string;
  askingPrice?: number | string;
  ownerEmail1?: string;
  ownerEmail2?: string;
  squareFootage?: number | string;
  lotSize?: number | string;
  yearBuilt?: number | string;
  yearEstablished?: number | string;
  parking?: number | string;
  annualRevenue?: number | string;
  cashFlow?: number | string;
  inventoryValue?: number | string;
  rent?: number | string;
  utilities?: number | string;
  payroll?: number | string;
  propertyTaxes?: number | string;
  insurance?: number | string;
  maintenance?: number | string;
  employees?: number | string;
  [key: string]: string | number | undefined;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const validatePropertyForm = (formData: PropertyFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Basic Tab Validation
  if (!formData.businessLegalName) {
    errors.push({
      field: 'businessLegalName',
      message: 'Business legal name is required'
    });
  } else if (String(formData.businessLegalName).length > 50) {
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
  } else if (isNaN(Number(formData.askingPrice)) || Number(formData.askingPrice) <= 0) {
    errors.push({
      field: 'askingPrice',
      message: 'Asking price must be a positive number'
    });
  }

  // Email validation for owner emails
  if (formData.ownerEmail1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.ownerEmail1))) {
    errors.push({
      field: 'ownerEmail1',
      message: 'Please enter a valid email address'
    });
  }

  if (formData.ownerEmail2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.ownerEmail2))) {
    errors.push({
      field: 'ownerEmail2',
      message: 'Please enter a valid email address'
    });
  }

  // Details Tab Validation
  if (formData.squareFootage && (isNaN(Number(formData.squareFootage)) || Number(formData.squareFootage) <= 0)) {
    errors.push({
      field: 'squareFootage',
      message: 'Square footage must be a positive number'
    });
  }

  if (formData.lotSize && (isNaN(Number(formData.lotSize)) || Number(formData.lotSize) <= 0)) {
    errors.push({
      field: 'lotSize',
      message: 'Lot size must be a positive number'
    });
  }

  // Year validations
  if (formData.yearBuilt) {
    const currentYear = new Date().getFullYear();
    const yearBuilt = Number(formData.yearBuilt);
    
    if (isNaN(yearBuilt) || yearBuilt < 1800 || yearBuilt > currentYear) {
      errors.push({
        field: 'yearBuilt',
        message: `Year built must be between 1800 and ${currentYear}`
      });
    }
  }

  if (formData.yearEstablished) {
    const currentYear = new Date().getFullYear();
    const yearEstablished = Number(formData.yearEstablished);
    
    if (isNaN(yearEstablished) || yearEstablished < 1800 || yearEstablished > currentYear) {
      errors.push({
        field: 'yearEstablished',
        message: `Year established must be between 1800 and ${currentYear}`
      });
    }
  }

  return errors;
};

export const formatFormData = (formData: PropertyFormData): PropertyFormData => {
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
    if (cleanData[field] && !isNaN(Number(cleanData[field]))) {
      cleanData[field] = Number(cleanData[field]);
    }
  });
  
  return cleanData;
};

// Explicitly export an object with the functions
const propertyFormValidation = {
  validatePropertyForm,
  formatFormData
};

export default propertyFormValidation;