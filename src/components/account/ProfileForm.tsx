"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserProfile, useProfile } from '@/hooks/useProfile';
import { toast } from 'react-hot-toast';

interface ProfileFormProps {
  initialData?: UserProfile;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const { updateProfile, uploadProfilePhoto, isLoading } = useProfile();
  const [formData, setFormData] = useState<UserProfile>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    whatsapp: initialData?.whatsapp || '',
    facebook: initialData?.facebook || '',
    twitter: initialData?.twitter || '',
    linkedIn: initialData?.linkedIn || '',
    instagram: initialData?.instagram || '',
    dre: initialData?.dre || '',
    nmls: initialData?.nmls || '',
    association: initialData?.association || '',
    photoUrl: initialData?.photoUrl || ''
  });
  // Set default profile photo from user's existing photo
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photoUrl || '/images/user/user-01.jpg');
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate field in real-time
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'phone':
      case 'whatsapp':
        if (value && !validatePhone(value)) {
          error = `${name === 'phone' ? 'Phone' : 'WhatsApp'} number is invalid`;
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is JPEG
      if (file.type !== 'image/jpeg') {
        setErrors({
          ...errors,
          photo: 'Only JPEG images are allowed'
        });
        return;
      }
      
      // Upload photo using our hook
      const photoUrl = await uploadProfilePhoto(file);
      
      if (photoUrl) {
        setPhotoPreview(photoUrl);
        setFormData({
          ...formData,
          photoUrl
        });
      }
    }
  };
  const deletePhoto = () => {
    // Reset to default photo instead of setting to null to ensure there's always a preview
    setPhotoPreview('/images/user/user-01.jpg');
    // Also update the form data
    setFormData({
      ...formData,
      photoUrl: '/images/user/user-01.jpg'
    });
    toast.success('Photo reset to default');
  };
  const cropPhoto = () => {
    // In a real implementation, this would open a cropping modal
    toast.success('Photo cropping feature will be available soon!');
  };
  // Additional validation for phone numbers
  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phone.trim() === '' || phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
      isValid = false;
    }
    
    if (formData.whatsapp && !validatePhone(formData.whatsapp)) {
      newErrors.whatsapp = "WhatsApp number is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const success = await updateProfile({
        ...formData,
        photoUrl: photoPreview || undefined
      });
      
      if (success) {
        toast.success('Profile updated successfully!');
        setShowSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred');
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Profile Details</h2>
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-600">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            Profile updated successfully!
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name:
            </label>            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]`}
              aria-describedby={errors.firstName ? "firstName-error" : ""}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName && <p id="firstName-error" className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>
          
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name:
            </label>            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]`}
              aria-describedby={errors.lastName ? "lastName-error" : ""}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName && <p id="lastName-error" className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email:
            </label>            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]`}
              aria-describedby={errors.email ? "email-error" : ""}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone:
            </label>            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]`}
              aria-describedby={errors.phone ? "phone-error" : ""}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* DRE License Number */}
          <div>
            <label htmlFor="dre" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              DRE LICENSE NUMBER
            </label>
            <input
              type="text"
              id="dre"
              name="dre"
              value={formData.dre}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
            />
          </div>

          {/* NMLS License Number */}
          <div>
            <label htmlFor="nmls" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              NMLS License Number
            </label>
            <input
              type="text"
              id="nmls"
              name="nmls"
              value={formData.nmls}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
            />
          </div>

          {/* Whatsapp */}
          <div>
            <label htmlFor="whatsapp" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Whatsapp
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">+1</span>
              </div>              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className={`w-full pl-10 px-4 py-3 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]`}
                aria-describedby={errors.whatsapp ? "whatsapp-error" : ""}
                aria-invalid={errors.whatsapp ? "true" : "false"}
              />
            </div>
            {errors.whatsapp && <p id="whatsapp-error" className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>}
          </div>
          
          {/* Facebook */}
          <div>
            <label htmlFor="facebook" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Facebook
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">https://</span>
              </div>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={formData.facebook.replace('https://', '')}
                onChange={(e) => {
                  // Remove https:// if user types it
                  const value = e.target.value.replace('https://', '');
                  setFormData({
                    ...formData,
                    facebook: value
                  });
                }}
                placeholder="facebook.com/yourprofile"
                className="w-full pl-20 px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
              />
            </div>
          </div>
          
          {/* Twitter */}
          <div>
            <label htmlFor="twitter" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Twitter
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">https://</span>
              </div>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter.replace('https://', '')}
                onChange={(e) => {
                  const value = e.target.value.replace('https://', '');
                  setFormData({
                    ...formData,
                    twitter: value
                  });
                }}
                placeholder="twitter.com/yourhandle"
                className="w-full pl-20 px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
              />
            </div>
          </div>
          
          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedIn" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              LinkedIn
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">https://</span>
              </div>
              <input
                type="text"
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn.replace('https://', '')}
                onChange={(e) => {
                  const value = e.target.value.replace('https://', '');
                  setFormData({
                    ...formData,
                    linkedIn: value
                  });
                }}
                placeholder="linkedin.com/in/yourprofile"
                className="w-full pl-20 px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
              />
            </div>
          </div>
          
          {/* Instagram */}
          <div>
            <label htmlFor="instagram" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Instagram
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">https://</span>
              </div>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram.replace('https://', '')}
                onChange={(e) => {
                  const value = e.target.value.replace('https://', '');
                  setFormData({
                    ...formData,
                    instagram: value
                  });
                }}
                placeholder="instagram.com/yourhandle"
                className="w-full pl-20 px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
              />
            </div>
          </div>
          
          {/* Association */}
          <div>
            <label htmlFor="association" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select which Association you are a member of
            </label>            <select
              id="association"
              name="association"
              value={formData.association}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a0d1] appearance-none"
              aria-label="Select Association"
            >              <option value="">-- Select One --</option>
              <option value="Amador County Association Of Realtors®">Amador County Association Of Realtors®</option>
              <option value="Arcadia Association Of Realtors®">Arcadia Association Of Realtors®</option>
              <option value="Bakersfield Association Of Realtors® Inc">Bakersfield Association Of Realtors® Inc</option>
              <option value="Bay Area Real Estate Information Service">Bay Area Real Estate Information Service</option>
              <option value="Bay East Association Of Realtors®">Bay East Association Of Realtors®</option>
              <option value="Beverly Hills/Greater Los Angeles AOR">Beverly Hills/Greater Los Angeles AOR</option>
              <option value="Big Bear Association Of Realtors®">Big Bear Association Of Realtors®</option>
              <option value="Bridge Association Of Realtors®">Bridge Association Of Realtors®</option>
              <option value="Burbank Association Of Realtors®">Burbank Association Of Realtors®</option>
              <option value="Calaveras County Association Of Realtors®">Calaveras County Association Of Realtors®</option>
              <option value="California Association Of Realtors® Inc">California Association Of Realtors® Inc</option>
              <option value="California Desert Association Of Realtors®">California Desert Association Of Realtors®</option>
              <option value="Central Valley Association Of Realtors® Inc">Central Valley Association Of Realtors® Inc</option>
              <option value="Citrus Valley Association Of Realtors®">Citrus Valley Association Of Realtors®</option>
              <option value="Conejo Simi Moorpark Association of REALTORS®">Conejo Simi Moorpark Association of REALTORS®</option>
              <option value="Contra Costa Association Of Realtors®">Contra Costa Association Of Realtors®</option>
              <option value="Downey Association Of Realtors®">Downey Association Of Realtors®</option>
              <option value="East Bay Association Of Realtors® Inc">East Bay Association Of Realtors® Inc</option>
              <option value="El Dorado County Association Of Realtors®">El Dorado County Association Of Realtors®</option>
              <option value="Fresno Association Of Realtors®">Fresno Association Of Realtors®</option>
              <option value="Glendale Association Of Realtors®">Glendale Association Of Realtors®</option>
              <option value="Greater Antelope Valley Association of REALTORS®">Greater Antelope Valley Association of REALTORS®</option>
              <option value="High Desert Association Of Realtors®">High Desert Association Of Realtors®</option>
              <option value="Humboldt Association Of Realtors®">Humboldt Association Of Realtors®</option>
              <option value="Imperial County Association Of Realtors®">Imperial County Association Of Realtors®</option>
              <option value="Inland Valleys Association Of Realtors®">Inland Valleys Association Of Realtors®</option>
              <option value="Kern River Lake Isabella Board Of Realtors® Inc">Kern River Lake Isabella Board Of Realtors® Inc</option>
              <option value="Kings County Board Of Realtors®">Kings County Board Of Realtors®</option>
              <option value="Lake County Association Of Realtors®">Lake County Association Of Realtors®</option>
              <option value="Lake Tahoe Board Of Realtors®">Lake Tahoe Board Of Realtors®</option>
              <option value="Lassen Association Of Realtors®">Lassen Association Of Realtors®</option>
              <option value="Madera Association Of Realtors®">Madera Association Of Realtors®</option>
              <option value="Marin Association Of Realtors®">Marin Association Of Realtors®</option>
              <option value="Mariposa County Board Of Realtors®">Mariposa County Board Of Realtors®</option>
              <option value="Mendocino Association Of Realtors®">Mendocino Association Of Realtors®</option>
              <option value="Merced County Association Of Realtors®">Merced County Association Of Realtors®</option>
              <option value="Monterey County Association Of Realtors® Inc">Monterey County Association Of Realtors® Inc</option>
              <option value="Napa Valley Vintners">Napa Valley Vintners</option>
              <option value="Nevada County Association Of Realtors®">Nevada County Association Of Realtors®</option>
              <option value="Northern Solano County Association Of Realtors®">Northern Solano County Association Of Realtors®</option>
              <option value="North San Diego County Association Of Realtors®">North San Diego County Association Of Realtors®</option>
              <option value="North Santa Barbara County Regional MLSM">North Santa Barbara County Regional MLS</option>
              <option value="Orange County Association Of Realtors®">Orange County Association Of Realtors®</option>
              <option value="Pacific West Association Of Realtors®">Pacific West Association Of Realtors®</option>
              <option value="Palm Springs Regional Association Of Realtors®">Palm Springs Regional Association Of Realtors®</option>
              <option value="Palos Verdes Board Of Realtors®">Palos Verdes Board Of Realtors®</option>
              <option value="Pasadena-Foothills Association Of Realtors®">Pasadena-Foothills Association Of Realtors®</option>
              <option value="Placer County Association Of Realtors®">Placer County Association Of Realtors®</option>
              <option value="Plumas Association Of Realtors®">Plumas Association Of Realtors®</option>
              <option value="Real Estate Business Service">Real Estate Business Service</option>
              <option value="Ridgecrest Area Association Of Realtors®">Ridgecrest Area Association Of Realtors®</option>
              <option value="Russian River Real Estate">Russian River Real Estate</option>
              <option value="Sacramento Association Of Realtors®">Sacramento Association Of Realtors®</option>
              <option value="San Benito County Association Of Realtors®">San Benito County Association Of Realtors®</option>
              <option value="San Diego Association Of Realtors®">San Diego Association Of Realtors®</option>
              <option value="San Francisco Association Of Realtors®">San Francisco Association Of Realtors®</option>
              <option value="San Francisco Multiple Listing Service Inc">San Francisco Multiple Listing Service Inc</option>
              <option value="San Luis Obispo Association Of Realtors®">San Luis Obispo Association Of Realtors®</option>
              <option value="San Mateo County Association Of Realtors®">San Mateo County Association Of Realtors®</option>
              <option value="Santa Barbara Association Of Realtors®">Santa Barbara Association Of Realtors®</option>
              <option value="Santa Clara County Association Of Realtors®">Santa Clara County Association Of Realtors®</option>
              <option value="Santa Cruz County Association Of Realtors®">Santa Cruz County Association Of Realtors®</option>
              <option value="Santa Maria Association Of Realtors®">Santa Maria Association Of Realtors®</option>
              <option value="Santa Ynez Valley Association Of Realtors®">Santa Ynez Valley Association Of Realtors®</option>
              <option value="Shasta Association Of Realtors®">Shasta Association Of Realtors®</option>
              <option value="Sierra North Valley Association Of Realtors®">Sierra North Valley Association Of Realtors®</option>
              <option value="Siskiyou Association Of Realtors®">Siskiyou Association Of Realtors®</option>
              <option value="Solano Association Of Realtors®">Solano Association Of Realtors®</option>
              <option value="Southland Regional Association Of Realtors®">Southland Regional Association Of Realtors®</option>
              <option value="Southwest Riverside County Association Of Realtors®">Southwest Riverside County Association Of Realtors®</option>
              <option value="Stanislaus County Multiple Listing ServiceM">Stanislaus County Multiple Listing Service</option>
              <option value="Sutter/Yuba Association Of Realtors®">Sutter/Yuba Association Of Realtors®</option>
              <option value="Tehama County Association Of Realtors®">Tehama County Association Of Realtors®</option>
              <option value="Trinity County Association Of Realtors®">Trinity County Association Of Realtors®</option>
              <option value="Tulare County Association Of Realtors®">Tulare County Association Of Realtors®</option>
              <option value="Tuolumne County Association Of Realtors®">Tuolumne County Association Of Realtors®</option>
              <option value="United Multiple Listing Service Inc">United Multiple Listing Service Inc</option>
              <option value="Ventura County Coastal Association Of Realtors®">Ventura County Coastal Association Of Realtors®</option>
              <option value="West Contra Costa Association Of Realtors®">West Contra Costa Association Of Realtors®</option>
              <option value="West San Gabriel Valley Association Of Realtors®">West San Gabriel Valley Association Of Realtors®</option>
              <option value="Western Nevada County Association Of Realtors®">Western Nevada County Association Of Realtors®</option>
              <option value="Women's Council Of Realtors® Santa Clara Chapter">Women's Council Of Realtors® Santa Clara Chapter</option>
              <option value="Yosemite Gateway Association Of Realtors®">Yosemite Gateway Association Of Realtors®</option>
            </select>
          </div>
          
          {/* Photo Upload */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo:
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange}
                  className="sr-only"
                  aria-describedby={errors.photo ? "photo-error" : ""}
                  aria-invalid={errors.photo ? "true" : "false"}
                />
                <label
                  htmlFor="photo"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a0d1] cursor-pointer"
                >
                  Choose File
                </label>
                <span className="ml-2 text-sm text-gray-500">{photoPreview ? 'File selected' : 'No file chosen'}</span>
              </div>
              <div className="text-sm text-gray-500">
                **Photo size should be in <span className="font-bold">200x200</span>, only <span className="font-bold">jpeg</span> allowed
              </div>
            </div>
            {errors.photo && <p id="photo-error" className="mt-1 text-sm text-red-500">{errors.photo}</p>}
          </div>
          
          {/* Photo Preview */}
          {photoPreview && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <Image 
                    src={photoPreview} 
                    alt="Profile Preview" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={cropPhoto}
                    className="text-[#00a0d1] hover:underline"
                  >
                    Crop Photo
                  </button>
                  <button 
                    type="button" 
                    onClick={deletePhoto}
                    className="text-red-500 hover:underline"
                  >
                    Delete Photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>        <div className="flex justify-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 py-3 bg-[#00a0d1] text-white font-medium rounded-full hover:bg-[#0080a9] focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
