'use client'
import { Save, X } from "lucide-react"
import { useState } from "react"

const AddContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    mobileNumber: "",
    country: "usa",
    state: "",
    city: "",
    address: "",
    zipcode: "",
    companyTitle: "",
    website: "",
  })

  // Error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zipcode: "",
    companyTitle: "",
    website: "",
  })

  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      })
    }
  }

  // Validate form data
  const validateForm = () => {
    let isValid = true
    const newErrors = {...errors}
    
    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
      isValid = false
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      isValid = false
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }
    
    // Phone number validation (basic)
    if (formData.mobileNumber && !/^[0-9\-\+\(\)\s]{10,15}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid phone number"
      isValid = false
    }
    
    // Zip code validation (US format)
    if (formData.zipcode && !/^\d{5}(-\d{4})?$/.test(formData.zipcode)) {
      newErrors.zipcode = "Please enter a valid US zip code"
      isValid = false
    }
    
    // Website validation (basic)
    if (formData.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+[\/\w\.-]*$/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL"
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus({ success: false, message: "" })
    
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      
      // Success
      const data = await response.json();
      setSubmitStatus({ 
        success: true, 
        message: "Contact added successfully!" 
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        mobileNumber: "",
        country: "usa",
        state: "",
        city: "",
        address: "",
        zipcode: "",
        companyTitle: "",
        website: "",
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ 
        success: false, 
        message: error.message || "Failed to add contact. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Array of all US states for dropdown
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
    "District of Columbia"
  ];

  return (
    <div className="w-full mx-auto p-6 dark:bg-gray-900">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-light text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">New Contact</h1>

        {/* Status message */}
        {submitStatus.message && (
          <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-8 border border-gray-100 dark:border-gray-700">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title (e.g. Manager)"
                className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className={`w-full px-4 py-3 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
            </div>
          </div>

          {/* Third row: Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
              <select 
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] appearance-none cursor-pointer text-gray-800 dark:text-gray-100`}
              >
                <option value="usa">United States of America</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
              <select 
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] appearance-none cursor-pointer text-gray-800 dark:text-gray-100`}
              >
                <option value="">Select a state</option>
                {usStates.map((state, index) => (
                  <option key={index} value={state.toLowerCase().replace(/\s/g, '-')}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="Enter your zip code"
                className={`w-full px-4 py-3 border ${errors.zipcode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Title</label>
              <input
                type="text"
                name="companyTitle"
                value={formData.companyTitle}
                onChange={handleChange}
                placeholder="Enter company title"
                className={`w-full px-4 py-3 border ${errors.companyTitle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.companyTitle && <p className="text-red-500 text-xs mt-1">{errors.companyTitle}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter company website"
                className={`w-full px-4 py-3 border ${errors.website ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-full focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] transition-all duration-300 hover:border-[#06AED7] dark:hover:border-[#00c1f5] bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 dark:placeholder-gray-400`}
              />
              {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => {
                // Reset form data and errors
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  title: "",
                  mobileNumber: "",
                  country: "usa",
                  state: "",
                  city: "",
                  address: "",
                  zipcode: "",
                  companyTitle: "",
                  website: "",
                });
                setErrors({
                  firstName: "",
                  lastName: "",
                  email: "",
                  title: "",
                  mobileNumber: "",
                  country: "",
                  state: "",
                  city: "",
                  address: "",
                  zipcode: "",
                  companyTitle: "",
                  website: "",
                });
                setSubmitStatus({ success: false, message: "" });
              }}
              className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-full bg-[#06AED7] text-white font-medium flex items-center gap-2 transition-all duration-300 hover:bg-[#0590b3] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#06AED7] focus:ring-offset-2 dark:bg-[#06AED7] dark:hover:bg-[#0590b3] dark:focus:ring-[#00c1f5] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <Save size={18} />
              {isSubmitting ? 'Saving...' : 'Save Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddContactForm