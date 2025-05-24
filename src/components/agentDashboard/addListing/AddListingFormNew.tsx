"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Import Tab Components
import PropertyBasicsTab from "./PropertyBasicsTab"
import AccessibilityTab from "./AccessibilityTab"
import PhotosTab from "./PhotosTab"
import InitialListingForm from "./InitialListingForm"

// Import Utilities
import usePhotoUpload from "./usePhotoUpload"
import { validatePropertyForm, type PropertyFormData } from "./formValidation"
import type { ValidationError } from "./formValidation"
import axiosInstance from "@/lib/axios"

const AddListingForm = () => {
  const router = useRouter()
  const [showInitialForm, setShowInitialForm] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  // Initialize photo upload hook
  const { photos, handleFileChange, removeImage, cleanupPreviews } = usePhotoUpload()

  // Handle initial form submission
  const handleInitialFormSubmit = (listingType: string, marketType: string) => {
    setShowInitialForm(false)

    // Update form data with the selected values
    setFormData((prevData) => ({
      ...prevData,
      listingType,
      marketType,
    }))

    // Show success message
    setShowSuccessMessage(true)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }

  // Form state for all tabs
  const [formData, setFormData] = useState({
    // Initial form fields
    listingType: "",
    marketType: "On Market",
    // Basics Tab
    businessLegalName: "",
    propertyType: "Agriculture",
    propertySubtype: "Greenhouse With Processing Unit",
    dba: "",
    askingPrice: "",
    status: "Active",
    showCounty: "true",
    showCity: "true",
    isFeatured: "false",

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
    wheelchairAccessible: "false",
    elevatorAccess: "false",
    handicapParking: "false",
    brailleSignage: "false",
    accessibleRestrooms: "false",

    // Activities - empty array initially
    activities: [] as Array<{ timestamp: string; message: string; user: string }>,
  })

  // Accessibility data
  const [accessibilityData, setAccessibilityData] = useState({
    autosendNda: "no",
    availableToBroker: "no",
  })

  // Cleanup photo previews when component unmounts
  useEffect(() => {
    return () => {
      cleanupPreviews()
    }
  }, [])
  // Use ref for tracking updates to prevent infinite loops
  const coordinateUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const updateInProgressRef = useRef<boolean>(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    // Special handling for latitude/longitude fields to prevent update cycles
    if (name === "latitude" || name === "longitude") {
      // Clear any existing timeout for coordinate updates
      if (coordinateUpdateTimeoutRef.current) {
        clearTimeout(coordinateUpdateTimeoutRef.current);
      }
      
      // Skip if update is already in progress
      if (updateInProgressRef.current) return;
      
      // Set update in progress flag
      updateInProgressRef.current = true;
      
      // Debounce coordinate updates to prevent update cycles
      coordinateUpdateTimeoutRef.current = setTimeout(() => {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }))
        updateInProgressRef.current = false;
      }, 200);
      
      return;
    }

    // Handle checkboxes
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked ? "true" : "false",
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle accessibility tab changes
  const handleAccessibilityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setAccessibilityData({
        ...accessibilityData,
        [name]: target.checked ? "yes" : "no",
      })
    } else {
      setAccessibilityData({
        ...accessibilityData,
        [name]: value,
      })
    }
  }

  // Validate current tab before proceeding
  const validateCurrentTab = (): boolean => {
    const errors = validatePropertyForm(formData as unknown as PropertyFormData)
    setValidationErrors(errors)

    // Filter errors relevant to the current tab
    let currentTabErrors: ValidationError[] = []

    switch (activeTab) {
      case 1: // Property Basics
        currentTabErrors = errors.filter((error) =>
          [
            "businessLegalName",
            "propertyType",
            "propertySubtype",
            "dba",
            "askingPrice",
            "status",
            "ownerName1",
            "ownerEmail1",
            "ownerName2",
            "ownerEmail2",
          ].includes(error.field),
        )
        break
      case 2: // Accessibility
        currentTabErrors = errors.filter((error) =>
          [
            "wheelchairAccessible",
            "elevatorAccess",
            "handicapParking",
            "brailleSignage",
            "accessibleRestrooms",
          ].includes(error.field),
        )
        break
      case 3: // Photos
        // No validation needed for photos tab
        break
    }

    return currentTabErrors.length === 0
  }

  // Handle form submission
  const handleSubmit = async (formDataObj?: FormData) => {
    setSubmissionError(null)

    // If no FormData is provided, validate all fields before submission
    if (!formDataObj) {
      const errors = validatePropertyForm(formData as unknown as PropertyFormData)
      setValidationErrors(errors)

      if (errors.length > 0) {
        // Find the tab with the first error and navigate to it
        const errorFields = errors.map((error) => error.field)

        if (
          errorFields.some((field) =>
            [
              "businessLegalName",
              "propertyType",
              "propertySubtype",
              "dba",
              "askingPrice",
              "status",
              "ownerName1",
              "ownerEmail1",
              "ownerName2",
              "ownerEmail2",
            ].includes(field),
          )
        ) {
          setActiveTab(1)
        } else if (
          errorFields.some((field) =>
            [
              "wheelchairAccessible",
              "elevatorAccess",
              "handicapParking",
              "brailleSignage",
              "accessibleRestrooms",
            ].includes(field),
          )
        ) {
          setActiveTab(2)
        }

        setSubmissionError("Please fix the validation errors before submitting.")
        return
      }

      // Create FormData object if not provided
      formDataObj = new FormData()

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "activities" && value !== undefined && value !== null) {
          formDataObj!.append(key, value.toString())
        }
      })

      // Add photos
      if (photos.length > 0) {
        photos.forEach((photo, index) => {
          formDataObj!.append(`photos[${index}]`, photo.file)
        })
      }
    }

    setIsSubmitting(true)

    try {
      console.log("Form data being submitted:", Object.fromEntries(formDataObj.entries()))

      // Make the API call
      const response = await axiosInstance.post("/listings", formDataObj)

      console.log("API Response:", response.data)

      // Show success message
      setShowSuccessMessage(true)

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/dashboard/agent/listings")
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionError(
        error instanceof Error ? error.message : "An unknown error occurred while submitting the form.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle next tab
  const handleNext = () => {
    if (validateCurrentTab() && activeTab < 3) {
      setActiveTab(activeTab + 1)
    }
  }

  // Handle previous tab
  const handlePrevious = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1)
    }
  }

  // Get error message for a field
  const getErrorMessage = (fieldName: string): string | null => {
    const error = validationErrors.find((err) => err.field === fieldName)
    return error ? error.message : null
  }

  return (
    <>
      {showInitialForm ? (
        <InitialListingForm onSubmit={handleInitialFormSubmit} />
      ) : (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-4 p-4 border-l-4 border-green-500 bg-green-50 text-green-800">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Listing created successfully!</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submissionError && (
            <div className="mb-4 p-4 border-l-4 border-red-500 bg-red-50 text-red-800">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Error: {submissionError}</span>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              className="space-y-6"
            >
              {/* Tab 1: Property Basics */}
              {activeTab === 1 && (
                <PropertyBasicsTab
                  formData={formData}
                  handleChange={handleChange}
                  getErrorMessage={getErrorMessage}
                  photos={photos.map((p) => p.file)}
                  accessibilityData={accessibilityData}
                  onSubmit={handleSubmit}
                />
              )}

              {/* Tab 2: Accessibility Settings */}
              {activeTab === 2 && (
                <AccessibilityTab formData={accessibilityData} handleChange={handleAccessibilityChange} />
              )}

              {/* Tab 3: Photos */}
              {activeTab === 3 && (
                <PhotosTab photos={photos} handleFileChange={handleFileChange} removeImage={removeImage} />
              )}

              {/* Display validation errors */}
              {validationErrors.length > 0 && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:border-red-800 dark:text-red-100"
                  role="alert"
                >
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
                  {activeTab < 3 ? (
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
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Listing"
                      )}
                    </button>
                  )}

                  {activeTab < 3 && (
                    <button
                      type="button"
                      className="px-4 py-2 text-[#9A2236] hover:underline"
                      onClick={() => {
                        // Save current form data
                        console.log("Saving data...")
                        localStorage.setItem("listingFormData", JSON.stringify(formData))
                        localStorage.setItem("accessibilityData", JSON.stringify(accessibilityData))
                        alert("Form data saved. You can continue later.")
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
      )}
    </>
  )
}

export default AddListingForm
