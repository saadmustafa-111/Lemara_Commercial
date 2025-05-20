"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Checkbox from "@/components/form/input/Checkbox"
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import { EyeCloseIcon, EyeIcon } from "@/icons"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { toast, ToastContainer, type ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LogIn, Linkedin } from 'lucide-react';

// Define custom toast style type
interface CustomToastStyle extends Omit<ToastOptions, "icon"> {
  style?: React.CSSProperties
  progressStyle?: React.CSSProperties
  icon?: string
}

export default function SignInForm() {
  const router = useRouter()
  const { signin, error: authError, isAuthenticated, getRedirectPath } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [signInAttempted, setSignInAttempted] = useState(false)

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

  // Effect to handle redirection after successful authentication
  useEffect(() => {
    // Create toast styles inside the useEffect to prevent dependency array issues
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

    if (signInAttempted && isAuthenticated && !isSubmitting) {
      console.log("Authentication successful, preparing to redirect...");
      
      // Show success toast with custom styling
      toast.success(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Login Successful!</span>
          <span className="text-sm opacity-90">Redirecting you to dashboard...</span>
        </div>,
        successToastStyle as ToastOptions,
      )

      // Redirect after a short delay to allow the toast to be seen
      const redirectTimeout = setTimeout(() => {
        const redirectPath = getRedirectPath() || "/dashboard";
        console.log("Redirecting to:", redirectPath);
        router.push(redirectPath);
      }, 2000)
      
      // Clean up timeout if component unmounts
      return () => clearTimeout(redirectTimeout);
    }
  }, [isAuthenticated, signInAttempted, getRedirectPath, router, isSubmitting])
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

  // Validate form
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Set loading states
      setIsSubmitting(true)
      setSignInAttempted(true)
      
      // Clear any existing auth data before attempting login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      console.log("Attempting signin with:", formData.email);
      
      // Authenticate the user - the useEffect will handle redirection
      await signin(formData.email, formData.password)
      
      // Check if authentication was successful
      console.log("Signin function completed. isAuthenticated:", isAuthenticated);
      
    } catch (error) {
      console.error("Signin failed:", error)
      // Reset the sign-in attempt flag if there was an error
      setSignInAttempted(false)

      // Show error toast
      toast.error(
        <div className="flex flex-col">
          <span className="text-lg font-medium mb-1">Login Failed</span>
          <span className="text-sm opacity-90">Please check your credentials and try again.</span>
        </div>,
        errorToastStyle as ToastOptions,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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

      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 py-12 mx-6 bg-white rounded-xl border border-gray-100 shadow-lg">
          <div className="mb-10 text-center">
            <h1 className="mb-3 font-bold text-[#06AED7] text-2xl sm:text-3xl md:text-[28px] ">
              Agent Login
            </h1>
            <p className="text-base text-gray-600 mt-2">Enter your credentials to continue your journey</p>
            <div className="mt-6 mb-8 border-b border-gray-200"></div>
          </div>
          
          {/* Third-party login buttons with enhanced styling */}
          <div className="space-y-4 mb-8">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md hover:translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
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
              <span>Sign in with Google</span>
            </button>
            
            <button
              type="button"
              onClick={handleLinkedinSignup}
              className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md hover:translate-y-0.5"
            >
              <Linkedin size={20} className="text-[#0077B5]" />
              <span>Sign in with LinkedIn</span>
            </button>
          </div>

          {/* OR Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-500 bg-white font-medium">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="mb-2 text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                hint={errors.email}
                className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2 text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  hint={errors.password}
                  className="bg-white text-gray-800 !rounded-lg border-gray-300 focus:border-[#366084] focus:ring-[#366084] shadow-sm"
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

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember"
                label="Remember me"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="text-gray-900"
              />

              <Link
                href="/forgot-password"
                className="text-sm text-[#366084] font-medium transition-colors hover:text-[#022340]"
              >
                Forgot password?
              </Link>
            </div>

            {authError && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{authError}</div>}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-48 py-3 font-medium text-white transition-all duration-300 rounded-full bg-[#06AED7] hover:bg-[#022340] hover:translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-[#366084] focus:ring-offset-2 shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
                disabled={isSubmitting}
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
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-center text-gray-600 mt-6">
              Are you new to Lemara Commercial?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#366084] transition-colors hover:text-[#022340]"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Property Image */}
      <div className="hidden lg:block w-1/2 bg-[#366084] relative overflow-hidden">
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
      `}</style>
    </div>
  )
}