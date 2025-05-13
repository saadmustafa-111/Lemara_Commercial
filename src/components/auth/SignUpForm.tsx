"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Checkbox from "@/components/form/input/Checkbox"
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { toast, ToastContainer, type ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserPlus } from "lucide-react"

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
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    whatsapp: "",
    facebook: "",
    twitter: "",
    linkedln: "",
    instagram: "",
    nmls: "",
    dre: "",
  })
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    whatsapp: "",
    facebook: "",
    linkedln: "",
    twitter: "",
    instagram: "",
    nmls: "",
    dre: "",
    role: "",
    terms: "",
  })

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
    }
  }, [selectedRoleFromQuery])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required"
      isValid = false
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "First name is required"
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

    if (!formData.address) {
      newErrors.address = "Address is required"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Form Data:", formData)
      console.log("Selected Role:", selectedRoleFromQuery)

      // Add this before the fetch call
      console.log("Sending data to API:", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedln: formData.linkedln,
        instagram: formData.instagram,
        nmls: formData.nmls,
        dre: formData.dre,
        role: selectedRoleFromQuery || "User",
      })

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          whatsapp: formData.whatsapp,
          facebook: formData.facebook,
          twitter: formData.twitter,
          linkedln: formData.linkedln,
          instagram: formData.instagram,
          nmls: formData.nmls,
          dre: formData.dre,
          role: selectedRoleFromQuery || "User",
        }),
      })

      // Add this after the fetch call (before the if statement)
      console.log("API Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Signup failed:", errorData)
        toast.error(
          <div className="flex flex-col">
            <span className="text-lg font-medium mb-1">Signup Failed</span>
            <span className="text-sm opacity-90">{errorData.message || "Please try again later."}</span>
          </div>,
          errorToastStyle as ToastOptions,
        )
        return
      }

      const data = await response.json()
      console.log("Signup successful:", data)

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
    } catch (error: unknown) {
      console.error("Signup failed:", error)
      toast.error(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Signup Failed</span>
          <span className="text-sm opacity-90">Please try again later.</span>
        </div>,
        errorToastStyle as ToastOptions,
      )
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="w-full max-w-md px-6 sm:px-8 py-8 mx-4 sm:mx-6 my-4 sm:my-6 bg-white rounded-xl border border-gray-100 shadow-lg">
          <div className="mb-6">
            {/* Simple centered title without animation */}
            <h1 className="mb-3 font-bold text-[#06AED7] text-2xl sm:text-3xl md:text-[28px] text-center">
              Agent Registration
            </h1>
            <p className="text-base text-gray-600 mt-2 text-center">Enter your details to create your account</p>
            <div className="mt-4 mb-5 border-b border-gray-200"></div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* First Name */}
              <div className="sm:col-span-1">
                <Label htmlFor="name" className="mb-1 text-gray-700 font-medium text-sm">
                  First Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  error={!!errors.firstname}
                  hint={errors.firstname}
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
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  error={!!errors.lastname}
                  hint={errors.lastname}
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
                id="linkedln"
                name="linkedln"
                value={formData.linkedln}
                onChange={handleChange}
                placeholder="Enter your LinkedIn "
                error={!!errors.linkedln}
                hint={errors.linkedln}
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

            {/* Terms */}
            <div className="flex items-center">
              <Checkbox
                id="terms"
                label="Click to view & sign the Independent Contractor Agreement terms"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
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
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-[#366084] transition-colors hover:text-[#022340]">
                Sign in
              </Link>
            </p>
          </form>
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
