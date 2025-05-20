"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import TermsAndConditionsModal from "./TermsAndConditionsModal"

import type React from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Checkbox from "@/components/form/input/Checkbox"
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import { useAuth } from "@/context/AuthContext"
import { toast, ToastContainer, type ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserPlus, Mail, Linkedin } from 'lucide-react'

// Define roles enum
export enum Role {
  ADMIN = "admin",
  USER = "user",
  BROKER = "broker",
}

// Define custom toast style type
interface CustomToastStyle extends Omit<ToastOptions, "icon"> {
  style?: React.CSSProperties
  progressStyle?: React.CSSProperties
  icon?: string
}

export default function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedRoleFromQuery = searchParams.get("role")
  const { error: authError, isLoading: authLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    whatsapp: "",
    facebook: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
    nmls: "",
    dre: "",
    association: "",
    role: selectedRoleFromQuery || Role.USER,
  })
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    whatsapp: "",
    facebook: "",
    linkedIn: "",
    twitter: "",
    instagram: "",
    association: "",
    nmls: "",
    dre: "",
    role: "",
    terms: "",
  })

  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  // Custom toast styles
  const successToastStyle: CustomToastStyle = {
    style: {
      background: "#ffffff",
      color: "#16a34a",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      padding: "16px",
      fontWeight: "500",
      border: "1px solid #dcfce7",
    },
    progressStyle: {
      background: "#16a34a",
    },
    icon: "🎉",
  }

  const errorToastStyle: CustomToastStyle = {
    style: {
      background: "#ffffff",
      color: "#dc2626",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      padding: "16px",
      fontWeight: "500",
      border: "1px solid #fee2e2",
    },
    progressStyle: {
      background: "#dc2626",
    },
    icon: "⚠️",
  }
  const Associations = [
    "Amador County Association Of Realtors®",
    "Arcadia Association Of Realtors®",
    "Bakersfield Association Of Realtors® Inc",
    "Bay Area Real Estate Information Service",
    "Bay East Association Of Realtors®",
    "Beverly Hills/Greater Los Angeles AOR",
    "Big Bear Association Of Realtors®",
    "Bridge Association Of Realtors®",
    "Burbank Association Of Realtors®",
    "Calaveras County Association Of Realtors®",
    "California Association Of Realtors® Inc",
    "California Desert Association Of Realtors®",
    "Central Valley Association Of Realtors® Inc",
    "Citrus Valley Association Of Realtors®",
    "Conejo Simi Moorpark Association of REALTORS®",
    "Contra Costa Association Of Realtors®",
    "Downey Association Of Realtors®",
    "East Bay Association Of Realtors® Inc",
    "El Dorado County Association Of Realtors®",
    "Fresno Association Of Realtors®",
    "Glendale Association Of Realtors®",
    "Greater Antelope Valley Association of REALTORS®",
    "High Desert Association Of Realtors®",
    "Humboldt Association Of Realtors®",
    "Imperial County Association Of Realtors®",
    "Inland Valleys Association Of Realtors®",
    "Kern River Lake Isabella Board Of Realtors® Inc",
    "Kings County Board Of Realtors®",
    "Lake County Association Of Realtors®",
    "Lake Tahoe Board Of Realtors®",
    "Lassen Association Of Realtors®",
    "Madera Association Of Realtors®",
    "Marin Association Of Realtors®",
    "Mariposa County Board Of Realtors®",
    "Mendocino Association Of Realtors®",
    "Merced County Association Of Realtors®",
    "Monterey County Association Of Realtors® Inc",
    "Napa Valley Vintners",
    "Nevada County Association Of Realtors®",
    "Northern Solano County Association Of Realtors®",
    "North San Diego County Association Of Realtors®",
    "North Santa Barbara County Regional MLS",
    "Orange County Association Of Realtors®",
    "Pacific West Association Of Realtors®",
    "Palm Springs Regional Association Of Realtors®",
    "Palos Verdes Board Of Realtors®",
    "Pasadena-Foothills Association Of Realtors®",
    "Placer County Association Of Realtors®",
    "Plumas Association Of Realtors®",
    "Real Estate Business Service",
    "Ridgecrest Area Association Of Realtors®",
    "Russian River Real Estate",
    "Sacramento Association Of Realtors®",
    "San Benito County Association Of Realtors®",
    "San Diego Association Of Realtors®",
    "San Francisco Association Of Realtors®",
    "San Francisco Multiple Listing Service Inc",
    "San Luis Obispo Association Of Realtors®",
    "San Mateo County Association Of Realtors®",
    "Santa Barbara Association Of Realtors®",
    "Santa Clara County Association Of Realtors®",
    "Santa Cruz County Association Of Realtors®",
    "Santa Maria Association Of Realtors®",
    "Santa Ynez Valley Association Of Realtors®",
    "Shasta Association Of Realtors®",
    "Sierra North Valley Association Of Realtors®",
    "Siskiyou Association Of Realtors®",
    "Solano Association Of Realtors®",
    "Southland Regional Association Of Realtors®",
    "Southwest Riverside County Association Of Realtors®",
    "Stanislaus County Multiple Listing Service",
    "Sutter/Yuba Association Of Realtors®",
    "Tehama County Association Of Realtors®",
    "Trinity County Association Of Realtors®",
    "Tulare County Association Of Realtors®",
    "Tuolumne County Association Of Realtors®",
    "United Multiple Listing Service Inc",
    "Ventura County Coastal Association Of Realtors®",
    "West Contra Costa Association Of Realtors®",
    "West San Gabriel Valley Association Of Realtors®",
    "Western Nevada County Association Of Realtors®",
    "Women's Council Of Realtors® Santa Clara Chapter",
    "Yosemite Gateway Association Of Realtors®",
  ]
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Validate form before setting isSubmitting
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      // Simulate auth processing
      setTimeout(() => {}, 2000)
    }, 2000)
  }

  useEffect(() => {
    if (selectedRoleFromQuery) {
      console.log(`Role selected: ${selectedRoleFromQuery}`) // Log selected role
      setFormData((prev) => ({
        ...prev,
        role: selectedRoleFromQuery,
      }))
    }
  }, [selectedRoleFromQuery])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
      isValid = false
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    // Remove address validation since there's no address field in the form
    // if (!formData.address) {
    //   newErrors.address = "Address is required"
    //   isValid = false
    // }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (!formData.role) {
      newErrors.role = "Please select an account type"
      isValid = false
    }

    if (!isChecked) {
      newErrors.terms = "You must agree to the terms and conditions"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit called")
    e.preventDefault()

    if (!validateForm()) {
      console.log("Form validation failed")
      return
    }

    console.log("Form validation passed, submitting...")
    setIsSubmitting(true)

    try {
      console.log("Form Data:", formData)
      console.log("Selected Role:", selectedRoleFromQuery)

      // Add this before the fetch call
      console.log("Sending data to API:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedIn: formData.linkedIn,
        instagram: formData.instagram,
        nmls: formData.nmls,
        dre: formData.dre,
        role: formData.role,
      })

      console.log("Starting fetch request to /api/signup")

      // Create the request body
      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedIn: formData.linkedIn,
        instagram: formData.instagram,
        nmls: formData.nmls,
        dre: formData.dre,
        role: formData.role,
      }

      console.log("Request body:", JSON.stringify(requestBody))

      let response
      try {
        response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        console.log("API Response status:", response.status)
        console.log("API Response headers:", Object.fromEntries([...response.headers.entries()]))
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        throw fetchError
      }

      if (!response.ok) {
        try {
          const errorData = await response.json()
          console.error("Signup failed with error data:", errorData)
          toast.error(
            <div className="flex flex-col">
              <span className="text-lg font-medium mb-1">Signup Failed</span>
              <span className="text-sm opacity-90">{errorData.message || "Please try again later."}</span>
            </div>,
            errorToastStyle as ToastOptions,
          )
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError)
          toast.error(
            <div className="flex flex-col">
              <span className="text-lg font-medium mb-1">Signup Failed</span>
              <span className="text-sm opacity-90">Server returned an error. Please try again later.</span>
            </div>,
            errorToastStyle as ToastOptions,
          )
        }
        return
      }

      try {
        const data = await response.json()
        console.log("Signup successful, response data:", data)

        // Show success toast with custom styling
        toast.success(
          <div className="flex flex-col">
            <span className="text-lg font-medium mb-1">Account Created!</span>
            <span className="text-sm opacity-90">You&apos;ll be redirected to login in a moment.</span>
          </div>,
          successToastStyle as ToastOptions,
        )

        // Redirect after a short delay to allow the toast to be seen
        setTimeout(() => {
          router.push("/signin")
        }, 3000)
      } catch (jsonError) {
        console.error("Error parsing success response:", jsonError)
        // Still treat it as success if response was ok but JSON parsing failed
        toast.success(
          <div className="flex flex-col">
            <span className="text-lg font-medium mb-1">Account Created!</span>
            <span className="text-sm opacity-90">You&apos;ll be redirected to login in a moment.</span>
          </div>,
          successToastStyle as ToastOptions,
        )

        setTimeout(() => {
          router.push("/signin")
        }, 3000)
      }
    } catch (error: unknown) {
      console.error("Signup process failed with error:", error)
      let errorMessage = "Please try again later."

      if (error instanceof Error) {
        errorMessage = error.message
      }

      toast.error(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Signup Failed</span>
          <span className="text-sm opacity-90">{errorMessage}</span>
        </div>,
        errorToastStyle as ToastOptions,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      console.log("Signing up with Google")
      // Implement Google OAuth logic here
      toast.info(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Google Sign Up</span>
          <span className="text-sm opacity-90">Redirecting to Google authentication...</span>
        </div>,
      )
      // Redirect to Google OAuth endpoint or use a library like next-auth
    } catch (error) {
      console.error("Google signup error:", error)
      toast.error(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Authentication Failed</span>
          <span className="text-sm opacity-90">Could not sign up with Google. Please try again.</span>
        </div>,
        errorToastStyle as ToastOptions,
      )
    }
  }

  const handleLinkedinSignup = async () => {
    try {
      console.log("Signing up with LinkedIn")
      // Implement LinkedIn OAuth logic here
      toast.info(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">LinkedIn Sign Up</span>
          <span className="text-sm opacity-90">Redirecting to LinkedIn authentication...</span>
        </div>,
      )
      // Redirect to LinkedIn OAuth endpoint or use a library like next-auth
    } catch (error) {
      console.error("LinkedIn signup error:", error)
      toast.error(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Authentication Failed</span>
          <span className="text-sm opacity-90">Could not sign up with LinkedIn. Please try again.</span>
        </div>,
        errorToastStyle as ToastOptions,
      )
    }
  }

  const handleOpenTermsModal = () => {
    // Check if first name and last name are filled
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Required Fields Missing</span>
          <span className="text-sm opacity-90">Please enter your first and last name before viewing the agreement.</span>
        </div>,
        errorToastStyle as ToastOptions
      )
      
      // Set errors for empty fields
      const newErrors = { ...errors }
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required to view the agreement"
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required to view the agreement"
      }
      setErrors(newErrors)
      
      return
    }
    
    // If both fields are filled, open the modal
    setShowTermsModal(true)
  }

  const handleAcceptTerms = () => {
    setIsChecked(true)
    setShowTermsModal(false)
    setErrors((prev) => ({ ...prev, terms: "" }))
  }

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm)
  }

  return (
    // Changed to min-h-screen with overflow-y-auto to enable scrolling when needed
    <div className="flex min-h-screen w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container-custom"
      />

      {/* Left Section - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center bg-white h-screen overflow-y-auto scrollbar-hide">
        {/* Added responsive padding to ensure form is visible on smaller screens */}

        <div
          className={`w-full ${showEmailForm ? "max-w-xl" : "max-w-md"} px-6 sm:px-8 py-8 mx-4 sm:mx-6 my-8 sm:my-6 bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-300`}
        >
          <div className="mb-6">
            {/* Simple centered title without animation */}
            <h1 className="mb-3 font-bold text-[#06AED7] text-2xl sm:text-3xl md:text-[28px] text-center">
              Agent Registration
            </h1>
            <p className="text-base text-gray-600 mt-2 text-center">Enter your details to create your account</p>
            <div className="mt-4 mb-5 border-b border-gray-200"></div>
          </div>

          <div className="space-y-5">
            {/* Third-party authentication buttons */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            <button
              type="button"
              onClick={handleLinkedinSignup}
              className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <Linkedin size={24} className="text-[#0077B5]" />
              Sign up with LinkedIn
            </button>

            {/* OR divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Email signup button */}
            <button
              type="button"
              onClick={toggleEmailForm}
              className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <Mail size={20} className="text-gray-600" />
              Sign up with Email
            </button>

            {/* Email signup form */}
            {showEmailForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit(e)
                }}
                className="space-y-4 mt-5"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* First Name */}
                  <div className="sm:col-span-1">
                    <Label htmlFor="name" className="mb-1 text-gray-700 font-medium text-sm">
                      First Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      error={!!errors.firstName}
                      hint={errors.firstName}
                      className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="sm:col-span-1">
                    <Label htmlFor="phone" className="mb-1 text-gray-700 font-medium text-sm">
                      Last Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      error={!!errors.lastName}
                      hint={errors.lastName}
                      className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="mb-1 text-gray-700 font-medium text-sm">
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    error={!!errors.email}
                    hint={errors.email}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                <div>
                  {/* Password */}
                  <Label htmlFor="email" className="mb-1 text-gray-700 font-medium text-sm">
                    Password<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    error={!!errors.password}
                    hint={errors.password}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>

                {/* phone  */}
                <div>
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    Phone<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your Phone Number "
                    error={!!errors.phone}
                    hint={errors.phone}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                <div>
                  {/* whatsapp  */}
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    Whatsapp<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter your Phone Number "
                    error={!!errors.whatsapp}
                    hint={errors.whatsapp}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                {/* facebook  */}
                <div>
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    Facebook<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Enter your facebook "
                    error={!!errors.facebook}
                    hint={errors.facebook}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                {/* twitter  */}
                <div>
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    Twitter<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Enter your twitter "
                    error={!!errors.twitter}
                    hint={errors.twitter}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                {/* linkedin  */}
                <div>
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    LinkedIn<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn "
                    error={!!errors.linkedIn}
                    hint={errors.linkedIn}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                {/* instagram  */}
                <div>
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    Instagram<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Enter your Instagram "
                    error={!!errors.instagram}
                    hint={errors.instagram}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Association</label>
                  <select
                    name="association"
                    value={formData.association}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.association ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] appearance-none cursor-pointer text-gray-800 dark:text-gray-100`}
                  >
                    <option value="">Select Association</option>
                    {Associations.map((assoc, index) => (
                      <option key={index} value={assoc}>
                        {assoc}
                      </option>
                    ))}
                  </select>
                  {errors.association && <p className="text-red-500 text-xs mt-1">{errors.association}</p>}
                </div>

                {/* NMLS  */}
                <div>
                  <Label htmlFor="address" className="mb-1 text-gray-700 font-medium text-sm">
                    NMLS #<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="nmls"
                    name="nmls"
                    value={formData.nmls}
                    onChange={handleChange}
                    placeholder="NMLS #"
                    error={!!errors.nmls}
                    hint={errors.nmls}
                    className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
                  />
                </div>

                {/* DRE  */}
                <div>
                  <Label htmlFor="password" className="mb-1 text-gray-700 font-medium text-sm">
                    DRE #<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="dre"
                      name="dre"
                      value={formData.dre}
                      onChange={handleChange}
                      placeholder="  DRE #  "
                      error={!!errors.dre}
                      hint={errors.dre}
                      className="bg-white text-gray-800 !rounded-lg border-gray-100 focus:border-gray-100 focus:ring-gray-100 shadow-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    ></button>
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <Label htmlFor="role" className="mb-1 text-gray-700 font-medium text-sm">
                    Account Type<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm appearance-none"
                      required
                    >
                      <option value="" disabled>
                        Select Account Type
                      </option>
                      <option value={Role.USER}>User</option>
                      <option value={Role.BROKER}>Broker</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-0 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                </div>

                {/* Terms */}
                <div className="flex items-center">
                  <Checkbox
                    id="terms"
                    label={
                      <span className="text-sm">
                        Click to view & sign the{" "}
                        <button
                          type="button"
                          onClick={handleOpenTermsModal}
                          className="text-blue-600 hover:text-blue-800 underline focus:outline-none"
                        >
                          Independent Contractor Agreement
                        </button>
                      </span>
                    }
                    checked={isChecked}
                    onChange={handleOpenTermsModal}
                    className="text-gray-900"
                  />
                </div>
                {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}

                {authError && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{authError}</div>}

                {errors.role && !selectedRoleFromQuery && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{errors.role}</div>
                )}

                <div className="pt-3 mt-3 flex justify-center">
                  <button
                    type="submit"
                    className="w-48 py-3 font-medium text-white transition-all duration-300 rounded-full bg-[#06AED7] hover:bg-[#022340] hover:translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-[#366084] focus:ring-offset-2 shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
                    disabled={isSubmitting || authLoading}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        <span>Loading...</span>
                      </>
                    ) : authLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={20} />
                        <span>Sign Up</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-[#366084] transition-colors hover:text-[#022340]">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Property Image */}
      <div className="hidden lg:block w-1/2 bg-[#366084] fixed right-0 top-0 bottom-0 overflow-hidden">
        <Image
          src="/images/logo/Property.jpg"
          alt="Lemara Commercial Property"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[#366084]/60 flex flex-col items-center justify-center p-8">
          <div className="text-center text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Lemara Commercial</h2>
            <p className="text-lg opacity-90">
              Access exclusive properties and manage your commercial real estate portfolio with Lemara Commercial&apos;s
              professional platform.
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center"></div>
      </div>

      {/* Terms Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={handleAcceptTerms}
        firstName={formData.firstName}
        lastName={formData.lastName}
      />

      {/* Global styles */}
      <style jsx global>{`
        .toast-container-custom .Toastify__toast {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 16px;
          margin-bottom: 16px;
        }
        
        .Toastify__toast-body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .Toastify__progress-bar {
          height: 3px;
          border-radius: 0 0 4px 4px;
        }

        .Toastify__close-button {
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .Toastify__close-button:hover {
          opacity: 1;
        }

        /* Input styling */
        input {
          background-color: white !important;
          color: #1f2937 !important;
        }

        input::placeholder {
          color: #9ca3af !important;
          opacity: 1;
        }

        /* Card styling */
        .rounded-xl {
          border-radius: 1rem;
        }

        .shadow-lg {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }

        /* Form container hover effect */
        .bg-white.rounded-xl {
          transition: all 0.3s ease;
        }

        .bg-white.rounded-xl:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        /* Improve input field focus states */
        input:focus {
          box-shadow: 0 0 0 2px rgba(54, 96, 132, 0.2) !important;
        }

        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }

        /* Ensure content starts from the top */
        .items-start {
          align-items: flex-start;
        }
      `}</style>
    </div>
  )
}
