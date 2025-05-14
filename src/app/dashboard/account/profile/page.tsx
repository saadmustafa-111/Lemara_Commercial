"use client";
import React, { useEffect, useState } from 'react';
import ProfileForm from '@/components/account/ProfileForm';
import { UserProfile, useProfile } from '@/hooks/useProfile';
import { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const { getUserProfile, isLoading } = useProfile();
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setUserData(profile);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="container px-4 py-6 mx-auto">
      <Toaster position="top-right" />      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#00a0d1] text-2xl">👤 Profile</span>
        </div>
      </div>
      
      <div className="mb-6">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a0d1]"></div>
          </div>
        ) : userData ? (
          <ProfileForm initialData={userData} />
        ) : (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <p className="text-center text-gray-600 dark:text-gray-400">Failed to load profile data. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
