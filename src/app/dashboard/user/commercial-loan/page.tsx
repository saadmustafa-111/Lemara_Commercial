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
    details: "", // Changed from purposeOfLoan to match API schema
    
    // Applicant Information
    address: "",
    city: "",
    state: "",
    zip: "",
    houseNumber: "", // Changed from homePhone to match API schema
    businessNumber: "", // Changed from businessPhone to match API schema
    email: "", // Changed from emailAddress to match API schema
 
    // Financial Information
    annualIncome: "", // Changed from currentAnnualIncome to match API schema
    monthlyExpenses: "",
    creditScore: "",
    existingDebt: "",

    // Business Information
    businessName: "",
    businesstype: "", // Note the lowercase 't' to match API schema
    businessAddress: "",
    annualBusinessRevenue: "",
    loanAmount: "",
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
      
      // Format the data according to the API schema
      const loanData = {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        ssn: formData.ssn ? parseInt(formData.ssn, 10) : 0,
        details: formData.details || "",
        address: formData.address || "",
        city: formData.city || "",
        state: formData.state || "",
        zip: formData.zip || "",
        houseNumber: formData.houseNumber || "",
        businessNumber: formData.businessNumber || "",
        email: formData.email || "",
        annualIncome: formData.annualIncome ? parseInt(formData.annualIncome, 10) : 0,
        monthlyExpenses: formData.monthlyExpenses ? parseInt(formData.monthlyExpenses, 10) : 0,
        creditScore: formData.creditScore ? 
          // Handle if creditScore is a string like "excellent" or a number
          isNaN(parseInt(formData.creditScore, 10)) ? 0 : parseInt(formData.creditScore, 10) : 0,
        existingDebt: formData.existingDebt ? parseInt(formData.existingDebt, 10) : 0,
        businessName: formData.businessName || "",
        businesstype: formData.businesstype || "",
        businessAddress: formData.businessAddress || "",
        annualBusinessRevenue: formData.annualBusinessRevenue ? parseInt(formData.annualBusinessRevenue, 10) : 0,
        loanAmount: formData.loanAmount ? parseInt(formData.loanAmount, 10) : 0
      }
      
      // Log the data being sent to the API
      console.log("Submitting loan data:", JSON.stringify(loanData))
      
      const authToken = localStorage.getItem("authToken")
      
      console.log("Using baseURL:", axiosInstance.defaults.baseURL)
      
      // Make API call
      const response = await axiosInstance.post("/loan", loanData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        timeout: 30000 // Increase timeout to 30 seconds
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
      console.log("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })
      
      // If there was an error with axios, try using fetch as a fallback
      try {
        console.log("Attempting fallback with fetch API...")
        
        // Re-get the auth token to ensure it's in scope
        const fallbackAuthToken = localStorage.getItem("authToken")
        
        const fetchResponse = await fetch("https://lemara-9829c937fd90.herokuapp.com/loan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(fallbackAuthToken && { Authorization: `Bearer ${fallbackAuthToken}` }),
          },
          body: JSON.stringify({
            firstName: formData.firstName || "",
            lastName: formData.lastName || "",
            ssn: formData.ssn ? parseInt(formData.ssn, 10) : 0,
            details: formData.details || "",
            address: formData.address || "",
            city: formData.city || "",
            state: formData.state || "",
            zip: formData.zip || "",
            houseNumber: formData.houseNumber || "",
            businessNumber: formData.businessNumber || "",
            email: formData.email || "",
            annualIncome: formData.annualIncome ? parseInt(formData.annualIncome, 10) : 0,
            monthlyExpenses: formData.monthlyExpenses ? parseInt(formData.monthlyExpenses, 10) : 0,
            creditScore: formData.creditScore ? 
              isNaN(parseInt(formData.creditScore, 10)) ? 0 : parseInt(formData.creditScore, 10) : 0,
            existingDebt: formData.existingDebt ? parseInt(formData.existingDebt, 10) : 0,
            businessName: formData.businessName || "",
            businesstype: formData.businesstype || "",
            businessAddress: formData.businessAddress || "",
            annualBusinessRevenue: formData.annualBusinessRevenue ? parseInt(formData.annualBusinessRevenue, 10) : 0,
            loanAmount: formData.loanAmount ? parseInt(formData.loanAmount, 10) : 0
          })
        })
        
        if (fetchResponse.ok) {
          const data = await fetchResponse.json()
          console.log("Fallback successful:", data)
          
          toast({
            title: "Success",
            description: "Your loan application has been submitted successfully!",
            variant: "success",
          })
          
          return
        } else {
          console.log("Fallback failed with status:", fetchResponse.status)
          const errorText = await fetchResponse.text()
          console.log("Error response:", errorText)
        }
      } catch (fetchError) {
        console.error("Fallback fetch also failed:", fetchError)
        
        // Try one more time with minimal data to check if it's a data format issue
        try {
          console.log("Attempting minimal data test...")
          
          const minimalResponse = await fetch("https://lemara-9829c937fd90.herokuapp.com/loan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstName: "Test",
              lastName: "User",
              ssn: 123456789,
              email: "test@example.com"
            })
          })
          
          console.log("Minimal test status:", minimalResponse.status)
          if (!minimalResponse.ok) {
            const minimalErrorText = await minimalResponse.text()
            console.log("Minimal test error:", minimalErrorText)
          }
        } catch (minimalError) {
          console.error("Even minimal test failed:", minimalError)
        }
      }
      
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
