"use client"
import React, { useState } from "react"
import { useAuth } from "../../../../context/AuthContext"
import FormProgressIndicator from "./FormProgressIndicator"
import BasicInfoStep from "./BasicInfoStep"
import ApplicantInformationStep from "./ApplicantInformationStep"
import ReviewStep from "./ReviewStep"
import "./styles.css"

const CommercialLoanPage = () => {  
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const [formData, setFormData] = useState({
    // Basic info
    firstName: "",
    lastName: "",
    ssn: "",
    coApplicantFirstName: "",
    coApplicantLastName: "",
    coApplicantSSN: "",
    purposeOfLoan: "",
    
    // Applicant Information
    address: "",
    city: "",
    state: "",
    zip: "",
    homePhone: "",
    businessPhone: "",
    emailAddress: "",
    driversLicense: "",
    licenseState: "",
    dateOfBirth: "",
    dependents: "0",
      // Financial details (keeping these for now to maintain compatibility)
    annualIncome: "",
    creditScore: "",
    totalAssets: "",
    totalLiabilities: "",
    financialComments: "",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission, e.g. sending data to an API
    console.log("Form submitted with data:", formData)
    
    // Move to the next step if not on the last step
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final submission logic
      console.log("Final submission:", formData)
      // You could add API calls here
    }
  }
    const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  return (
    <>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-8 transition-all duration-300">
          <div className="loan-form-header border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-[#00315e] loan-form-title">Commercial Loan Application</h2>
            <p className="text-gray-600 loan-form-subtitle">
              {currentStep === 1 && "Loan Needs"}
              {currentStep === 2 && "Applicant's Information"}
              {currentStep === 3 && "Review & Submit"}
            </p>
          </div>          <div className="mb-6">
            <p className="loan-form-notice bg-yellow-50 p-3 rounded-lg border border-yellow-200 shadow-sm">
              **It is advised to save and edit the form frequently to avoid session loss, because this will take about 10-15 minutes to complete.
            </p>
            <p className="required-fields-text">* Required Fields</p>
          </div>
            <FormProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          <form onSubmit={handleSubmit} className="loan-form bg-white bg-opacity-50 backdrop-blur-sm shadow-inner">
            {/* Render the appropriate step component based on currentStep */}
            {currentStep === 1 && (
              <BasicInfoStep formData={formData} handleChange={handleChange} />
            )}
            
            {currentStep === 2 && (
              <ApplicantInformationStep formData={formData} handleChange={handleChange} />
            )}
            
            {currentStep === 3 && (
              <ReviewStep formData={formData} />
            )}              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:-translate-y-1"
                  >
                    Previous
                  </button>
                )}
                <div className={currentStep === 1 ? "ml-auto" : ""}>
                  <button
                    type="submit"
                    className="form-submit-btn"
                  >
                    {currentStep === totalSteps ? 'Submit Application' : 'Save & Continue'}
                  </button>
                </div>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CommercialLoanPage
