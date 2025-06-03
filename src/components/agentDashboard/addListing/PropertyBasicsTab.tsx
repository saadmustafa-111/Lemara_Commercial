"use client"

import type React from "react"
import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { isChecked } from "./utils"
import SubTabNavigation from "./SubTabNavigation"
import EnhancedMapViewer from "@/components/map/EnhancedMapViewer"
import { useMapCoordinates } from "@/hooks/useMapCoordinates"
import axiosInstance from "@/lib/axios"

// Backend enums
enum MarketType {
  MARKET = "market",
  LEASE = "lease",
  PRIVATE = "private",
}

enum ListingType {
  BUSINESS = "business",
  BSINEESREALSTATE = "bsinesesrealstate",
  COMMERCIAL = "commercial",
  FRANCHISE = "franchise",
  ASSETSALE = "assetsale",
}

// Backend data structure interface
interface ListingFormData {
  market: string
  listingType: string
  address: string
  address2: string
  city: string
  state: string
  postalCode: string
  country: string
  neighborhood: string
  assessorsPArcelNumber: string
  latitude: number
  longitude: number
  sellerFinancing: boolean
  oppertunityZone: boolean
  description: string
  highlights: string[]
  confidentiality: string
  availableToBroker: boolean
  visibility: boolean
}

// Modify the component interface to include onSubmit
interface PropertyBasicsTabProps {
  formData: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  getErrorMessage?: (fieldName: string) => string | null
  onSubmit?: (formDataObj: FormData) => Promise<void>
  photos?: File[]
  accessibilityData?: any
}

const PropertyBasicsTab: React.FC<PropertyBasicsTabProps> = ({
  formData,
  handleChange,
  getErrorMessage,
  onSubmit,
  photos = [],
  accessibilityData = {},
}) => {
  // Track character counts
  const [titleLength, setTitleLength] = useState<number>(formData.title?.length || 0)
  const [descriptionLength, setDescriptionLength] = useState<number>(formData.completeDescription?.length || 0)
  // Track current active section for navigation
  const [activeSection, setActiveSection] = useState<string>("basic-information")
  // Track loading state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  // Track submission error
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  // Add a success message state after the existing state variables:
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Use the map coordinates hook to automatically update coordinates based on address
  const {
    coordinates,
    updateCoordinates,
    isLoading: isLoadingMap,
  } = useMapCoordinates(
    {
      streetAddress: formData.streetAddress,
      city: formData.city,
      stateProvince: formData.stateProvince,
      country: formData.country,
    },
    {
      latitude: formData.latitude,
      longitude: formData.longitude,
    },
  )

  // Store previous coordinates to avoid unnecessary updates
  const prevCoordinatesRef = useRef({ latitude: '', longitude: '' });
  const updateInProgressRef = useRef(false);
  // Update formData when coordinates change
  useEffect(() => {
    // Skip if no coordinates
    if (!coordinates.latitude || !coordinates.longitude) return;
    
    // Skip if coordinates haven't changed
    if (prevCoordinatesRef.current.latitude === coordinates.latitude &&
        prevCoordinatesRef.current.longitude === coordinates.longitude) {
      return;
    }
    
    // Skip if an update is already in progress
    if (updateInProgressRef.current) return;
    
    // Update prev coordinates
    prevCoordinatesRef.current = { ...coordinates };
    
    // Prevent concurrent updates
    updateInProgressRef.current = true;
    
    // Use setTimeout to break the potential update cycle
    setTimeout(() => {
      // Create synthetic events to update form data
      const latEvent = {
        target: {
          name: "latitude",
          value: coordinates.latitude,
        },
      } as React.ChangeEvent<HTMLInputElement>

      const lngEvent = {
        target: {
          name: "longitude",
          value: coordinates.longitude,
        },
      } as React.ChangeEvent<HTMLInputElement>
      
      // Calculate new zoom based on location type
      // City/town gets zoom 10, specific address gets zoom 15
      const hasStreetAddress = !!formData.streetAddress?.trim();
      const zoomEvent = {
        target: {
          name: "zoom",
          value: hasStreetAddress ? "15.0" : "10.0",
        }
      } as React.ChangeEvent<HTMLInputElement>
      
      // Set default pitch for street view
      const pitchEvent = {
        target: {
          name: "pitch",
          value: "5.0",
        }
      } as React.ChangeEvent<HTMLInputElement>
      
      // Set default heading for street view
      const headingEvent = {
        target: {
          name: "heading", 
          value: "0.0",
        }
      } as React.ChangeEvent<HTMLInputElement>

      handleChange(latEvent)
      handleChange(lngEvent)
      handleChange(zoomEvent)
      handleChange(pitchEvent)
      handleChange(headingEvent)
      
      // Reset the update flag
      updateInProgressRef.current = false;
    }, 0);
  }, [coordinates, handleChange, formData.streetAddress])

  // Expose the submit handler to the parent component
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore - Add the submit handler to the component instance
      window.propertyBasicsSubmit = handleSubmit
    }

    return () => {
      if (typeof window !== "undefined") {
        // @ts-ignore - Clean up
        delete window.propertyBasicsSubmit
      }
    }
  }, [])

  // Define sections for the tab navigation
  const sections = [
    { id: "basic-information", label: "Basic Information", icon: "📋" },
    { id: "address", label: "Address", icon: "📍" },
    { id: "details", label: "Details", icon: "📋" },
    { id: "descriptions", label: "Descriptions", icon: "📝" },
    { id: "photos", label: "Photos", icon: "🖼️" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "accessibility", label: "Accessibility", icon: "🔒" },
    { id: "submit", label: "Submit", icon: "✓" },
  ]

  // Refs for each section
  const sectionRefs = {
    "basic-information": useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    details: useRef<HTMLDivElement>(null),
    descriptions: useRef<HTMLDivElement>(null),
    photos: useRef<HTMLDivElement>(null),
    documents: useRef<HTMLDivElement>(null),
    accessibility: useRef<HTMLDivElement>(null),
    submit: useRef<HTMLDivElement>(null),
  }

  // Track investment highlights
  const [highlights, setHighlights] = useState<string[]>(
    formData.investmentHighlights
      ? Array.isArray(formData.investmentHighlights)
        ? formData.investmentHighlights
        : [formData.investmentHighlights]
      : ["", "", "", "", "", ""],
  )

  // Track uploaded files
  const [localPhotos, setLocalPhotos] = useState<File[]>(formData.photos || [])
  const [documents, setDocuments] = useState<File[]>(formData.documents || [])
  const photoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs]
    if (sectionRef && sectionRef.current) {
      const headerHeight = 56 // Height of the main header (3.5rem = 56px)
      const navHeight = 60 // Height of the sticky navigation
      const yOffset = -(headerHeight + navHeight + 10) // Add extra margin to account for header and navigation
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      })
    }
  }

  // Set up intersection observer to highlight active section during scrolling
  useEffect(() => {
    const headerHeight = 56 // Height of the main header (3.5rem = 56px)
    const navHeight = 60 // Height of the sticky navigation
    const totalOffset = headerHeight + navHeight
    const observerOptions = {
      rootMargin: `-${totalOffset + 10}px 0px -70% 0px`,
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setActiveSection(sectionId)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all section elements
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Custom handler for title to update character count
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleLength(e.target.value.length)
    handleChange(e)
  }

  // Handle changes to investment highlights
  const handleHighlightChange = (index: number, value: string) => {
    const updatedHighlights = [...highlights]
    updatedHighlights[index] = value
    setHighlights(updatedHighlights)

    // Update form data with the new highlights array
    const event = {
      target: {
        name: "investmentHighlights",
        value: updatedHighlights,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    handleChange(event)
  }

  // Add a new investment highlight
  const addHighlight = () => {
    setHighlights([...highlights, ""])
  }

  // Remove an investment highlight
  const removeHighlight = (index: number) => {
    const updatedHighlights = [...highlights]
    updatedHighlights.splice(index, 1)
    setHighlights(updatedHighlights)

    // Update form data with the new highlights array
    const event = {
      target: {
        name: "investmentHighlights",
        value: updatedHighlights,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    handleChange(event)
  }

  // Handle photo uploads
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files)
      const updatedPhotos = [...localPhotos, ...newPhotos]
      setLocalPhotos(updatedPhotos)

      // Update form data with the new photos array
      const event = {
        target: {
          name: "photos",
          value: updatedPhotos,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleChange(event)
    }
  }

  // Handle document uploads
  const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newDocs = Array.from(e.target.files)
      const updatedDocs = [...documents, ...newDocs]
      setDocuments(updatedDocs)

      // Update form data with the new documents array
      const event = {
        target: {
          name: "documents",
          value: updatedDocs,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleChange(event)
    }
  }

  // Handle drag and drop for photos
  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newPhotos = Array.from(e.dataTransfer.files)
      const updatedPhotos = [...localPhotos, ...newPhotos]
      setLocalPhotos(updatedPhotos)

      // Update form data with the new photos array
      const event = {
        target: {
          name: "photos",
          value: updatedPhotos,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleChange(event)
    }
  }

  // Handle drag and drop for documents
  const handleDocumentDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newDocs = Array.from(e.dataTransfer.files)
      const updatedDocs = [...documents, ...newDocs]
      setDocuments(updatedDocs)

      // Update form data with the new documents array
      const event = {
        target: {
          name: "documents",
          value: updatedDocs,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleChange(event)
    }
  }

  // Validate form before submission
  const validateForm = (): boolean => {
    // Reset error message
    setSubmissionError(null)

    // Required fields validation
    if (!formData.marketType) {
      setSubmissionError("Please select a market type")
      scrollToSection("basic-information")
      return false
    }

    if (!formData.title) {
      setSubmissionError("Please enter a title for your listing")
      scrollToSection("basic-information")
      return false
    }

    if (!formData.price) {
      setSubmissionError("Please enter a price for your listing")
      scrollToSection("basic-information")
      return false
    }

    if (!formData.listingSubType) {
      setSubmissionError("Please select a listing sub type")
      scrollToSection("basic-information")
      return false
    }

    // Address validation
    if (!formData.streetAddress) {
      setSubmissionError("Street address is required")
      scrollToSection("address")
      return false
    }

    if (!formData.city) {
      setSubmissionError("City is required")
      scrollToSection("address")
      return false
    }

    if (!formData.stateProvince) {
      setSubmissionError("State/Province is required")
      scrollToSection("address")
      return false
    }

    if (!formData.country) {
      setSubmissionError("Country is required")
      scrollToSection("address")
      return false
    }

    // Description validation
    if (!formData.completeDescription && !formData.description) {
      setSubmissionError("Property description is required")
      scrollToSection("descriptions")
      return false
    }

    // Accessibility validation
    if (!formData.confidentiality) {
      setSubmissionError("Confidentiality setting is required")
      scrollToSection("accessibility")
      return false
    }

    // Remove the marketplace visibility validation check since it's causing issues
    // The value is being set correctly in the form submission

    return true
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionError(null)
    setSuccessMessage(null)

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData object
      const formDataObj = new FormData()

      // Map frontend values to backend enum values
      let marketTypeValue = ""
      if (formData.marketType === "onMarket" || formData.marketType === "On Market") {
        marketTypeValue = MarketType.MARKET
      } else if (formData.marketType === "private" || formData.marketType === "Private") {
        marketTypeValue = MarketType.PRIVATE
      }

      let listingTypeValue = ""
      switch (formData.listingSubType || formData.listingType) {
        case "For Sale":
        case "Business":
          listingTypeValue = ListingType.BUSINESS
          break
        case "For Lease":
        case "Commercial":
          listingTypeValue = ListingType.COMMERCIAL
          break
        case "For Investment":
        case "Business Real Estate":
          listingTypeValue = ListingType.BSINEESREALSTATE
          break
        case "Joint Venture":
        case "Franchise":
          listingTypeValue = ListingType.FRANCHISE
          break
        case "For Sale or Lease":
        case "For Sublease":
        case "Asset Sale":
          listingTypeValue = ListingType.ASSETSALE
          break
      }

      // Type validation before appending to FormData
      if (!marketTypeValue) {
        throw new Error("Invalid market type")
      }

      if (!listingTypeValue) {
        throw new Error("Invalid listing type")
      }

      // Append all fields to FormData matching the API structure
      formDataObj.append("market", marketTypeValue)
      formDataObj.append("listingType", listingTypeValue)
      formDataObj.append("address", formData.streetAddress || formData.address || "")
      formDataObj.append("address2", formData.address2 || "")
      formDataObj.append("city", formData.city || "")
      formDataObj.append("state", formData.stateProvince || formData.state || "")
      formDataObj.append("postalCode", formData.postalCode || formData.zipCode || "")
      formDataObj.append("country", formData.country || "")
      formDataObj.append("neighborhood", formData.neighborhood || "")
      formDataObj.append("assessorsPArcelNumber", formData.parcelNumber || "")

      // Ensure latitude and longitude are valid numbers
      // Replace the latitude/longitude validation section with this:
      formDataObj.append("latitude", formData.latitude ? formData.latitude.toString() : "0")
      formDataObj.append("longitude", formData.longitude ? formData.longitude.toString() : "0")

      // Convert string values to boolean for boolean fields
      formDataObj.append("sellerFinancing", formData.sellerFinancing === "Yes" ? "true" : "false")
      formDataObj.append("oppertunityZone", formData.opportunityZone === "Yes" ? "true" : "false")
      formDataObj.append("description", formData.completeDescription || formData.description || "")

      // Add business details
      if (formData.businessLegalName) formDataObj.append("businessLegalName", formData.businessLegalName)
      if (formData.dba) formDataObj.append("dba", formData.dba)
      if (formData.askingPrice) formDataObj.append("askingPrice", formData.askingPrice)
      if (formData.propertyType) formDataObj.append("propertyType", formData.propertyType)
      if (formData.propertySubtype) formDataObj.append("propertySubtype", formData.propertySubtype)
      if (formData.status) formDataObj.append("status", formData.status)

      // Add owner details
      if (formData.ownerName1) formDataObj.append("ownerName1", formData.ownerName1)
      if (formData.ownerEmail1) formDataObj.append("ownerEmail1", formData.ownerEmail1)
      if (formData.ownerName2) formDataObj.append("ownerName2", formData.ownerName2)
      if (formData.ownerEmail2) formDataObj.append("ownerEmail2", formData.ownerEmail2)

      // Handle highlights array - filter out empty highlights
      if (highlights && highlights.length > 0) {
        const validHighlights = highlights.filter((highlight) => highlight.trim() !== "")
        validHighlights.forEach((highlight, index) => {
          formDataObj.append(`highlights[${index}]`, highlight)
        })
      }

      // Add accessibility data
      formDataObj.append("confidentiality", formData.confidentiality || accessibilityData?.confidentiality || "")
      formDataObj.append(
        "availableToBroker",
        formData.availableToBrokers === "Yes" ||
          accessibilityData?.availableToBroker === "yes" ||
          formData.availableToBroker === "yes"
          ? "true"
          : "false",
      )
      formDataObj.append(
        "autosendNda",
        accessibilityData?.autosendNda === "yes" || formData.autosendNda === "yes" ? "true" : "false",
      )
      formDataObj.append("visibility", formData.marketplaceVisibility === "visible" ? "true" : "false")

      // Add accessibility features
      if (formData.wheelchairAccessible) formDataObj.append("wheelchairAccessible", formData.wheelchairAccessible)
      if (formData.elevatorAccess) formDataObj.append("elevatorAccess", formData.elevatorAccess)
      if (formData.handicapParking) formDataObj.append("handicapParking", formData.handicapParking)
      if (formData.brailleSignage) formDataObj.append("brailleSignage", formData.brailleSignage)
      if (formData.accessibleRestrooms) formDataObj.append("accessibleRestrooms", formData.accessibleRestrooms)

      // Append photos - use photos from props if available, otherwise use local photos
      const photosToUpload = photos.length > 0 ? photos : localPhotos
      if (photosToUpload && photosToUpload.length > 0) {
        photosToUpload.forEach((photo, index) => {
          formDataObj.append(`photos[${index}]`, photo)
        })
      }

      // Append documents
      if (documents && documents.length > 0) {
        documents.forEach((doc, index) => {
          formDataObj.append(`documents[${index}]`, doc)
        })
      }

      console.log("Submitting form data:", Object.fromEntries(formDataObj.entries()))

      // Make the API call
      const response = await axiosInstance.post("/listings", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Handle successful response
      console.log("Listing created successfully:", response.data)

      // Set success message with data from response if available
      if (response.data && response.data.message) {
        setSuccessMessage(response.data.message)
      } else if (response.data && response.data.id) {
        setSuccessMessage(`Listing created successfully! Listing ID: ${response.data.id}`)
      } else {
        setSuccessMessage("Listing created successfully!")
      }

      // Scroll to the submit section to show the success message
      scrollToSection("submit")

      // If parent component provided an onSubmit handler, call it as well
      if (onSubmit) {
        await onSubmit(formDataObj)
      }
    } catch (error: any) {
      console.error("Error creating listing:", error)

      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorData = error.response.data
        if (errorData && errorData.message) {
          setSubmissionError(errorData.message)
        } else if (errorData && errorData.error) {
          setSubmissionError(errorData.error)
        } else {
          setSubmissionError(`Server error: ${error.response.status}`)
        }
      } else if (error.request) {
        // The request was made but no response was received
        setSubmissionError("No response received from server. Please check your internet connection.")
      } else {
        // Something happened in setting up the request that triggered an Error
        setSubmissionError(error.message || "Error creating listing. Please try again.")
      }

      // Scroll to the top to show the error message
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="space-y-10 pt-14 max-w-6xl mx-auto">
      {/* Add the sub tab navigation at the top */}
      <SubTabNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollToSection={scrollToSection}
        sections={sections}
      />

      {/* Display submission error if any */}
      {submissionError && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-md mb-6 animate-fadeIn transition-all duration-300">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium text-lg">Error</p>
          </div>
          <p className="ml-9">{submissionError}</p>
        </div>
      )}

      {/* Display success message if any */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-md mb-6 animate-fadeIn transition-all duration-300">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium text-lg">Success</p>
          </div>
          <p className="ml-9">{successMessage}</p>
        </div>
      )}      {/* Basic Information Section */}
      <div id="basic-information" ref={sectionRefs["basic-information"]} className="space-y-8 pt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-center border-b border-gray-200 pb-4">
          <span className="text-[#06AED7] text-2xl mr-3">📋</span>
          <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Basic Information</h2>
        </div>

        {/* Market Selection */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label className="block mb-4 text-base font-medium text-gray-800">Market Type</label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-[#06AED7] transition-all duration-200">
              <input
                type="radio"
                id="onMarket"
                name="marketType"
                value="onMarket"
                checked={formData.marketType === "onMarket"}
                onChange={handleChange}
                className="w-5 h-5 text-[#06AED7] border-gray-300 focus:ring-[#06AED7]"
              />
              <label htmlFor="onMarket" className="text-base text-gray-700 font-medium cursor-pointer flex-1">
                On Market
              </label>
            </div>
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-[#06AED7] transition-all duration-200">
              <input
                type="radio"
                id="privateMarket"
                name="marketType"
                value="private"
                checked={formData.marketType === "private"}
                onChange={handleChange}
                className="w-5 h-5 text-[#06AED7] border-gray-300 focus:ring-[#06AED7]"
              />
              <label htmlFor="privateMarket" className="text-base text-gray-700 font-medium cursor-pointer flex-1">
                Private
              </label>
            </div>
            <p className="text-sm text-gray-600 mt-3 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <span className="font-medium block mb-1">Note:</span>
              On Market listings will appear on our marketplace. Private listings will only be visible to your team.
            </p>
          </div>
        </div>        {/* Title Field */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="title" className="text-base font-medium text-gray-800 flex items-center">
              <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Listing Title
            </label>
            <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">{titleLength}/100</span>
          </div>
          <div className="relative group">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title ?? ""}
              onChange={handleTitleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-lg"
              placeholder="Enter listing title"
              maxLength={100}
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-[#06AED7]">
            Example: "Modern Office Space in Downtown" or "Retail Property on Main Street"
          </p>
        </div>        {/* Price Field */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="price" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Listing Price
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <span className="text-gray-500 text-xl font-semibold">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price ?? ""}
              onChange={handleChange}
              className="w-full pl-10 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-lg font-medium"
              placeholder="0"
              min="0"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-4 bg-white p-3 rounded-lg border border-gray-200 hover:border-[#06AED7] transition-all duration-200">
            <input
              type="checkbox"
              id="hidePrice"
              name="hidePrice"
              checked={isChecked(formData.hidePrice)}
              onChange={handleChange}
              className="w-5 h-5 text-[#06AED7] border-gray-300 rounded focus:ring-[#06AED7]"
            />
            <label htmlFor="hidePrice" className="ml-3 text-base text-gray-700 font-medium cursor-pointer flex-1">
              Hide price on listing
            </label>
          </div>
        </div>        {/* Listing Sub Type */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="listingSubType" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Listing Sub Type
          </label>
          <div className="relative group">
            <select
              id="listingSubType"
              name="listingSubType"
              value={formData.listingSubType ?? ""}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-lg appearance-none"
            >
              <option value="">Select a sub type</option>
              <option value="For Sale">For Sale</option>
              <option value="For Lease">For Lease</option>
              <option value="For Sale or Lease">For Sale or Lease</option>
              <option value="For Sublease">For Sublease</option>
              <option value="For Investment">For Investment</option>
              <option value="Joint Venture">Joint Venture</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#06AED7]">
              <svg className="w-6 h-6 transition-transform duration-200 transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-[#06AED7]">
            Choose the appropriate sub type that best describes your property listing
          </p>
        </div>
      </div>      {/* Address Section */}
      <div id="address" ref={sectionRefs["address"]} className="space-y-8 pt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-center border-b border-gray-200 pb-4">
          <span className="text-[#06AED7] text-2xl mr-3">📍</span>
          <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Address</h2>
        </div>        {/* Street Address */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="streetAddress" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Street Address
          </label>
          <div className="relative group">
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress ?? ""}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-lg"
              placeholder="Enter street address"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Address 2 */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="address2" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Address Line 2 (Optional)
          </label>
          <div className="relative group">
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2 ?? ""}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-lg"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>
        </div>        {/* City, State/Province, Postal Code in one row */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Location Details
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700 ml-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city ?? ""}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md"
                placeholder="Enter city"
              />
            </div>

            <div className="relative group">
              <label htmlFor="stateProvince" className="block mb-2 text-sm font-medium text-gray-700 ml-1">State/Province</label>
              <input
                type="text"
                id="stateProvince"
                name="stateProvince"
                value={formData.stateProvince ?? ""}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md"
                placeholder="Enter state/province"
              />
            </div>

            <div className="relative group">
              <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-700 ml-1">Postal/Zip Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode ?? ""}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md"
                placeholder="Enter postal code"
              />
            </div>
          </div>
        </div>        {/* Country Dropdown */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="country" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Country
          </label>
          <div className="relative group">
            <select
              id="country"
              name="country"
              value={formData.country ?? ""}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-lg appearance-none"
            >
              <option value="">Select Country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#06AED7]">
              <svg className="w-6 h-6 transition-transform duration-200 transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>        {/* Neighborhood */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="neighborhood" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Neighborhood
          </label>
          <div className="relative group">
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood ?? ""}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md"
              placeholder="Enter neighborhood name"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-[#06AED7]">
            Specifying the neighborhood helps potential buyers/renters understand the location better
          </p>
        </div>

        {/* Assessor's Parcel Number */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label htmlFor="parcelNumber" className="flex items-center mb-3 text-base font-medium text-gray-800">
            <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Assessor's Parcel Number
          </label>
          <div className="relative group">
            <input
              type="text"
              id="parcelNumber"
              name="parcelNumber"
              value={formData.parcelNumber ?? ""}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md"
              placeholder="Enter parcel/lot number"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-[#06AED7]">
            The parcel number helps identify the property in county/municipal records
          </p>
        </div>{/* Map and Street View */}
        <div className="space-y-2">
          {isLoadingMap && (
            <div className="text-center text-sm text-blue-600 py-2">Loading map coordinates based on address...</div>
          )}
          <EnhancedMapViewer
            address={{
              streetAddress: formData.streetAddress,
              city: formData.city,
              stateProvince: formData.stateProvince,
              country: formData.country,
            }}
            latitude={formData.latitude || coordinates.latitude || "34.1809281"}
            longitude={formData.longitude || coordinates.longitude || "73.2783251"}
            heading={Number(formData.heading) || 341.31519935292244}
            pitch={Number(formData.pitch) || 5.058408794219417}
            zoom={Number(formData.zoom) || 3.7450835433590273}
            height={300}
            onCoordsChange={(lat, lng) => {
              // Update form data when coordinates change via the map
              const latEvent = {
                target: {
                  name: "latitude",
                  value: lat,
                },
              } as React.ChangeEvent<HTMLInputElement>

              const lngEvent = {
                target: {
                  name: "longitude",
                  value: lng,
                },
              } as React.ChangeEvent<HTMLInputElement>

              handleChange(latEvent)
              handleChange(lngEvent)
            }}
            onHeadingChange={(value) => {
              const event = {
                target: {
                  name: "heading",
                  value: value.toString(),
                },
              } as React.ChangeEvent<HTMLInputElement>

              handleChange(event)
            }}
            onPitchChange={(value) => {
              const event = {
                target: {
                  name: "pitch",
                  value: value.toString(),
                },
              } as React.ChangeEvent<HTMLInputElement>

              handleChange(event)
            }}
            onZoomChange={(value) => {
              const event = {
                target: {
                  name: "zoom",
                  value: value.toString(),
                },
              } as React.ChangeEvent<HTMLInputElement>

              handleChange(event)
            }}
          />
        </div> 
      </div>      {/* Details Section */}
      <div id="details" ref={sectionRefs["details"]} className="space-y-8 pt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-center border-b border-gray-200 pb-4">
          <span className="text-[#06AED7] text-2xl mr-3">📋</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Property Details</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seller Financing */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <label htmlFor="sellerFinancing" className="flex items-center mb-3 text-base font-medium text-gray-800">
              <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Seller Financing
            </label>
            <div className="relative group">
              <select
                id="sellerFinancing"
                name="sellerFinancing"
                value={formData.sellerFinancing ?? ""}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-base appearance-none"
              >
                <option value="">Select Seller Financing Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#06AED7]">
                <svg className="w-6 h-6 transition-transform duration-200 transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-[#06AED7]">
              Indicates if the seller is willing to provide financing options for the buyer
            </p>
          </div>

          {/* Opportunity Zone */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <label htmlFor="opportunityZone" className="flex items-center mb-3 text-base font-medium text-gray-800">
              <svg className="w-5 h-5 text-[#06AED7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Opportunity Zone
            </label>
            <div className="relative group">
              <select
                id="opportunityZone"
                name="opportunityZone"
                value={formData.opportunityZone ?? ""}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-white text-gray-800 shadow-sm group-hover:shadow-md text-base appearance-none"
              >
                <option value="">Select Opportunity Zone Status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#06AED7]">
                <svg className="w-6 h-6 transition-transform duration-200 transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-[#06AED7]">
              Opportunity Zones offer tax benefits to investors and can increase property appeal
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium text-blue-800">Note:</p>
          </div>
          <p className="ml-9 text-blue-700">
            Any fields left <span className="font-semibold">blank</span> or <span className="font-semibold">zero</span> will be hidden from the listing view.
          </p>
        </div>
      </div>      {/* Descriptions Section */}
      <div id="descriptions" ref={sectionRefs["descriptions"]} className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6 pb-3 border-b border-gray-200">
          <span className="mr-3 bg-indigo-100 p-2 rounded-full text-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Descriptions</span>
        </h2>

        {/* Complete Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-3 border border-gray-100">
          <label htmlFor="completeDescription" className="block text-base font-medium text-gray-800 flex items-center">
            <span className="mr-2 text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </span>
            Complete Description
          </label>
          <div className="relative">
            <textarea
              id="completeDescription"
              name="completeDescription"
              value={formData.completeDescription ?? ""}
              onChange={(e) => {
                handleChange(e)
                setDescriptionLength(e.target.value.length)
              }}
              rows={8}
              maxLength={5000}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:border-transparent transition-all duration-300 hover:border-[#06AED7] bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
              placeholder="Enter a comprehensive description of the property..."
            ></textarea>
            <div className="absolute bottom-4 right-4 py-1 px-3 bg-white bg-opacity-80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-gray-200">
              {descriptionLength || 0}/5000 characters
            </div>
          </div>
          <p className="text-sm text-gray-600 pl-4 border-l-2 border-indigo-200 italic ml-2">
            A detailed description helps potential clients understand the unique value and features of your property.
          </p>
        </div>

        {/* Investment Highlights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 border border-gray-100">
          <label htmlFor="investmentHighlights" className="block text-base font-medium text-gray-800 flex items-center">
            <span className="mr-2 text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </span>
            Investment Highlights
          </label>
          <p className="text-sm text-gray-600 pl-4 border-l-2 border-indigo-200 italic ml-2 mb-3">
            Add key selling points that make this property stand out from competitors.
          </p>

          <div className="space-y-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2 group">
                <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl w-full group-hover:border-[#06AED7] transition-all duration-300">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-l-xl">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder={`Highlight #${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="flex-shrink-0 p-2 mr-1 text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addHighlight}
            className="flex items-center justify-center px-5 py-3 mt-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl text-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 w-full transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add Another Highlight
          </button>
        </div>
      </div>

      {/* Photos Section */}
      <div id="photos" ref={sectionRefs["photos"]} className="space-y-6 pt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">🖼️</span> Photos
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Upload high-resolution photos of your listing.</p>
          <p className="text-sm text-gray-600">You can click and drag the numbers to re-arrange the order.</p>{" "}
          <div
            className="mt-4 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-[#06AED7] transition-colors duration-300"
            onClick={() => photoInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handlePhotoDrop}
          >
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
              multiple
              accept="image/*"
            />

            {localPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {localPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-move">
                      {index + 1}
                    </div>
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Property photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        className="text-white p-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          const updatedPhotos = [...localPhotos]
                          updatedPhotos.splice(index, 1)
                          setLocalPhotos(updatedPhotos)

                          // Update form data
                          const event = {
                            target: {
                              name: "photos",
                              value: updatedPhotos,
                            },
                          } as unknown as React.ChangeEvent<HTMLInputElement>
                          handleChange(event)
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">Click or Drop multiple photos here.</p>
                <span className="text-sm text-gray-400">Accepted formats: JPG, PNG, GIF</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div id="documents" ref={sectionRefs["documents"]} className="space-y-6 pt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📄</span> Documents
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Upload documents for your listing.</p>
          <p className="text-sm text-gray-600">You can click and drag the numbers to re-arrange the order.</p>{" "}
          <div
            className="mt-4 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-[#06AED7] transition-colors duration-300"
            onClick={() => documentInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDocumentDrop}
          >
            <input
              type="file"
              ref={documentInputRef}
              onChange={handleDocumentUpload}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />

            {documents.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 w-full">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="relative flex items-center bg-white p-3 rounded-full border border-gray-200 group"
                  >
                    <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 cursor-move">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 p-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        const updatedDocs = [...documents]
                        updatedDocs.splice(index, 1)
                        setDocuments(updatedDocs)

                        // Update form data
                        const event = {
                          target: {
                            name: "documents",
                            value: updatedDocs,
                          },
                        } as unknown as React.ChangeEvent<HTMLInputElement>
                        handleChange(event)
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">Click or Drop multiple attachments here.</p>
                <span className="text-sm text-gray-400">Accepted formats: PDF, DOC, XLS, PPT, TXT</span>
              </>
            )}
          </div>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 mt-4 bg-white border border-gray-300 rounded-full text-[#06AED7] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:ring-offset-2 w-full transition-all duration-300"
            onClick={() => documentInputRef.current?.click()}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add Remote Document
          </button>
        </div>
      </div>

      {/* Accessibility Section */}
      <div id="accessibility" ref={sectionRefs["accessibility"]} className="space-y-6 pt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">🔒</span> Accessibility
        </h2>

        <div className="space-y-4">
          {/* Confidentiality Options */}
          <div>
            <label htmlFor="confidentiality" className="block mb-2 text-sm font-medium text-gray-700">
              Confidentiality
            </label>
            <div className="relative">
              <select
                id="confidentiality"
                name="confidentiality"
                value={formData.confidentiality || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none"
              >
                <option value="noCA">No CA</option>
                <option value="mutualCA">Mutual CA</option>
                <option value="customCA">Custom CA</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Setting confidentiality affects who can see property details and how information is displayed.
              </p>
            </div>
          </div>

          {/* Available to Brokers */}
          <div>
            <label htmlFor="availableToBrokers" className="block mb-2 text-sm font-medium text-gray-700">
              Available to Brokers
            </label>
            <select
              id="availableToBrokers"
              name="availableToBrokers"
              value={formData.availableToBrokers || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Controls listing collaboration options with other brokers.</p>
          </div>

          {/* Marketplace Visibility */}
          <div>
            <label htmlFor="marketplaceVisibility" className="block mb-2 text-sm font-medium text-gray-700">
              Marketplace Visibility
            </label>
            <div className="relative">
              <select
                id="marketplaceVisibility"
                name="marketplaceVisibility"
                value={formData.marketplaceVisibility || "visible"}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 appearance-none"
              >
                <option value="visible">Yes</option>
                <option value="hidden">No</option>
              </select>

              <div className="mt-3 p-3 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Visible</strong>: Listing will be visible on the marketplace
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>Hidden</strong>: Listing will be hidden from public view
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>Only Lemara Commercial</strong>: Only visible within Lemara Commercial platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Submit Section */}
      <div id="submit" ref={sectionRefs["submit"]} className="border-t border-gray-200 pt-8 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6 bg-gradient-to-r from-[#06AED7] to-[#00c1f5] bg-clip-text text-transparent">
          <span className="mr-3 bg-green-100 p-2 rounded-full text-green-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </span> 
          Final Submission
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-6 border border-gray-100">
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <p className="text-blue-800 font-medium">
              You're almost there! Please review all details carefully before submitting.
            </p>
          </div>
          
          <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#06AED7] transition-all duration-300">
            <div className="flex items-center h-5">
              <input
                id="termsAgreement"
                name="termsAgreement"
                type="checkbox"
                className="w-5 h-5 text-[#06AED7] border-gray-300 rounded focus:ring-[#06AED7] cursor-pointer transition-all duration-200"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="termsAgreement" className="font-medium text-gray-800 cursor-pointer select-none text-sm">
                I Have The Right To Publish This Listings Information, Photos And Documents, And Accept The{" "}
                <a href="#" className="text-[#06AED7] hover:underline font-semibold">
                  Terms Of Use
                </a>
                .
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              const termsAgreement = document.getElementById("termsAgreement") as HTMLInputElement
              if (termsAgreement && termsAgreement.checked) {
                // Call the handleSubmit function with a proper event object
                handleSubmit(e as unknown as React.FormEvent)
              } else {
                alert("Please accept the terms of use.")
              }
            }}
            disabled={isSubmitting}
            className={`px-8 py-4 w-full md:w-auto ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#06AED7] to-[#00c1f5] text-white hover:shadow-lg hover:from-[#05a0c7] hover:to-[#00b0e0]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06AED7] transition-all duration-300 rounded-xl text-base font-medium flex items-center justify-center shadow-md`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <span>Submit My Listing</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

         

        </div>
      </div>
    </div>
  )
}

export default PropertyBasicsTab
