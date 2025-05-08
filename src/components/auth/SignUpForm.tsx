"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import Checkbox from "@/components/form/input/Checkbox"
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import { EyeCloseIcon, EyeIcon } from "@/icons"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { toast, ToastContainer, type ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    role: "",
    terms: "",
  })
  const [titleText, setTitleText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const fullTitle = "Create Account"

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

  // Implement the typing effect
  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTypingComplete(true)
      }
    }, 150)

    return () => {
      clearInterval(typingInterval)
    }
  }, [])

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

    if (!formData.name.trim()) {
      newErrors.name = "First name is required"
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

    if (!selectedRoleFromQuery) {
      newErrors.role = "Role selection is required"
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
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Form Data:", formData)
      console.log("Selected Role:", selectedRoleFromQuery)

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          role: selectedRoleFromQuery || "User",
        }),
      })

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
    <div className="flex items-center justify-center min-h-screen w-full bg-[#366084]">
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

      <div className="w-full max-w-md mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg border border-cyan-200">
        <div className="mb-8">
          <h1
            className={`mb-2 font-semibold text-gray-800 text-2xl sm:text-3xl relative ${typingComplete ? "text-animation-complete" : ""}`}
          >
            <span className="inline-block">{titleText}</span>
            <span
              className="inline-block w-1 h-8 bg-gray-800 ml-1 absolute"
              style={{
                animation: "blink 1s step-end infinite",
                display: titleText.length === fullTitle.length ? "none" : "inline-block",
              }}
            ></span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">Enter your details to create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* First Name */}
            <div className="sm:col-span-1">
              <Label htmlFor="name" className="mb-1.5 text-gray-700">
                Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                error={!!errors.name}
                hint={errors.name}
                className="bg-white text-gray-800 !rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            {/* Phone */}
            <div className="sm:col-span-1">
              <Label htmlFor="phone" className="mb-1.5 text-gray-700">
                Phone<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                error={!!errors.phone}
                hint={errors.phone}
                className="bg-white text-gray-800 !rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-1.5 text-gray-700">
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
              className="bg-white text-gray-800 !rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>

          {/* address*/}
          <div>
            <Label htmlFor="address" className="mb-1.5 text-gray-700">
              Address<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              error={!!errors.address}
              hint={errors.address}
              className="bg-white text-gray-800 !rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="mb-1.5 text-gray-700">
              Password<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={!!errors.password}
                hint={errors.password}
                className="bg-white text-gray-800 !rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <Checkbox
              id="terms"
              label="I agree to the terms and conditions"
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

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-32 py-2 font-medium text-white transition-all duration-300 rounded-full bg-[#022340] hover:bg-cyan-500 hover:scale-105 focus:ring-2 focus:ring-cyan-400 shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
              disabled={isSubmitting || authLoading}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                    className="animate-spin h-4 w-4 text-white"
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
                "Sign Up"
              )}
            </button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-gray-700 transition-colors hover:text-gray-900">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Add global styles for toast customization */}
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

        /* Override any dark styling in Input component */
        input {
          background-color: white !important;
          color: #1f2937 !important; /* text-gray-800 equivalent */
        }

        /* Make sure placeholder text is visible */
        input::placeholder {
          color: #9ca3af !important; /* text-gray-400 equivalent */
          opacity: 1;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
