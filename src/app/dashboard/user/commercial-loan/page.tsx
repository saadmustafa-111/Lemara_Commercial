"use client"
import React, { useState } from "react"
import { useAuth } from "../../../../context/AuthContext"
import FormProgressIndicator from "./FormProgressIndicator"
import BasicInfoStep from "./BasicInfoStep"
import ApplicantInformationStep from "./ApplicantInformationStep"
import FinancialInformationStep from "./FinancialInformationStep"
import BusinessInformationStep from "./BusinessInformationStep"
import ReviewStep from "./ReviewStep"
import "./styles.css"
import { useLoading } from "@/hooks/useLoading"
import { useToast } from "@/hooks/useToast"
import axiosInstance from "@/lib/axios"

const CommercialLoanPage = () => {  
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5
  const { isLoading, withLoading } = useLoading()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
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

    // Financial Information
    currentAnnualIncome: "",
    monthlyExpenses: "",
    creditScore: "",
    existingDebt: "",
    cashInBankAccounts: "",
    investmentAccounts: "",
    realEstateValue: "",
    otherAssets: "",
    incomeYear1: "", // 2020
    incomeYear2: "", // 2021
    incomeYear3: "", // 2022
    incomeYear4: "", // 2023
    incomeYear5: "", // 2024
    primaryBankName: "",
    accountType: "",
    bankRelationshipYears: "",
    financialComments: "",

    // Business Information
    businessName: "",
    businessType: "",
    federalTaxId: "",
    yearEstablished: "",
    industryType: "",
    numberOfEmployees: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessZip: "",
    annualBusinessRevenue: "",
    businessNetIncome: "",
    businessDebt: "",
    businessAssets: "",
    businessRevenue2022: "",
    businessRevenue2023: "",
    businessRevenue2024: "",
    loanAmount: "",
    loanPurpose: "",
    businessPlan: "",
    businessBankName: "",
    businessBankingYears: "",
    averageMonthlyBalance: "",
    existingBusinessLoans: "",

    // Legacy fields (keeping for compatibility)
    annualIncome: "",
    totalAssets: "",
    totalLiabilities: "",
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
    
    // Move to the next step if not on the last step
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      return
    }
    
    // On the last step, submit the form data to the API
    await withLoading(submitLoanApplication())
  }
  
  // Function to submit loan application to the API
  const submitLoanApplication = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit a loan application",
          variant: "destructive",
        })
        return
      }
      
      setSubmitting(true)
      
      // Format the data according to the API structure
      const loanData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        ssn: parseInt(formData.ssn || "0", 10), 
        coFirstName: formData.coApplicantFirstName,
        coLastName: formData.coApplicantLastName,
        description: formData.purposeOfLoan,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        houseNumber: formData.homePhone,
        businessNumber: formData.businessPhone,
        email: formData.emailAddress,
        licenseNumber: formData.driversLicense,
        licenseState: formData.licenseState,
        dependantsNumber: parseInt(formData.dependents || "0", 10)
      }
      
      const authToken = localStorage.getItem("authToken")
      
      // Make API call
      const response = await axiosInstance.post("/loan", loanData, {
        headers: {
          "Content-Type": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        }
      })
      
      // Handle successful response
      toast({
        title: "Success",
        description: "Your loan application has been submitted successfully!",
        variant: "success",
      })
      
      console.log("Loan application submitted successfully:", response.data)
      
      // Could redirect here or show a success page
      
    } catch (error: any) {
      console.error("Error submitting loan application:", error)
      
      // Display error message to the user
      toast({
        title: "Submission Error",
        description: error.response?.data?.message || "There was an error submitting your loan application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
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
              {currentStep === 3 && "Financial Information"}
              {currentStep === 4 && "Business Information"}
              {currentStep === 5 && "Review & Submit"}
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
              <FinancialInformationStep formData={formData} handleChange={handleChange} />
            )}
            
            {currentStep === 4 && (
              <BusinessInformationStep formData={formData} handleChange={handleChange} />
            )}
            
            {currentStep === 5 && (
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
                    disabled={submitting || isLoading}
                    className={`form-submit-btn ${(submitting || isLoading) ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {submitting || isLoading ? 'Processing...' : (currentStep === totalSteps ? 'Submit Application' : 'Save & Continue')}
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
