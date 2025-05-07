"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";

const AppHeader: React.FC = () => {
  const { user } = useAuth();
  
  // Get user's display name or use a fallback
  const displayName = user ? user.name : 'Guest';
  
  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between w-full px-6 py-3">
        {/* Left side - Welcome message */}
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-gray-800 dark:text-white">Welcome, {displayName}</h1>
        </div>

        {/* Right side - Action buttons and user profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggleButton />
          
          {/* Notification Button */}
          <Link href="#" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#00a0d1] text-white hover:bg-[#0088b3] dark:bg-[#0088b3] dark:hover:bg-[#00a0d1]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </Link>
          
          {/* Email Button */}
          <Link href="#" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#00a0d1] text-white hover:bg-[#0088b3] dark:bg-[#0088b3] dark:hover:bg-[#00a0d1]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Link>
          
          {/* Add Listing Button */}
          <Link href="/add-listing" className="flex items-center justify-center px-4 py-2 font-medium text-white rounded-md bg-[#9A2236] hover:bg-[#851c2e] dark:bg-[#b02e45] dark:hover:bg-[#9A2236]">
            Add Listing
          </Link>
          
          {/* User Profile Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
