"use client";

import { useState } from 'react';

// Define the user profile type
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  instagram: string;
  dre: string;
  nmls: string;
  association: string;
  photoUrl?: string;
}

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch user profile data
  const getUserProfile = async (): Promise<UserProfile | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, make an API call to fetch user profile
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      const mockProfile: UserProfile = {
        firstName: 'AJ',
        lastName: 'Rana',
        email: 'ajrana@lemaracommercial.com',
        phone: '510-737-8500',
        whatsapp: '510-737-8500',
        facebook: 'https://web.facebook.com/lemaracommercial/',
        twitter: 'https://twitter.com/lemara2017',
        linkedIn: 'https://www.linkedin.com/in/aj-rana-35946b156/',
        instagram: '',
        dre: '3244',
        nmls: '987894645',
        association: '',
        photoUrl: '/images/user/user-01.jpg'
      };
      
      setIsLoading(false);
      return mockProfile;
    } catch (err) {
      setError('Failed to fetch profile data');
      setIsLoading(false);
      return null;
    }
  };
  
  // Function to update user profile
  const updateProfile = async (profileData: UserProfile): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, make an API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      console.log('Profile data sent to server:', profileData);
      
      // Simulate successful update
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Failed to update profile');
      setIsLoading(false);
      return false;
    }
  };
  
  // Function to upload profile photo
  const uploadProfilePhoto = async (file: File): Promise<string | null> => {
    if (!file) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, upload the file to a server or storage service
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload delay
      
      // Create a temporary URL for the uploaded file (simulated)
      const photoUrl = URL.createObjectURL(file);
      
      setIsLoading(false);
      return photoUrl;
    } catch (err) {
      setError('Failed to upload photo');
      setIsLoading(false);
      return null;
    }
  };
  
  return {
    isLoading,
    error,
    getUserProfile,
    updateProfile,
    uploadProfilePhoto
  };
}
