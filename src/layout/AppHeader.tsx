"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const AppHeader: React.FC = () => {
  const { user } = useAuth();
  const displayName = user ? user.name : "Guest";

  return (
    <header className="sticky top-0 z-[99999] w-full bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left - Logo and Welcome */}
        <div className="flex items-center gap-8 md:gap-12">
          <Image
            src="/images/logo/lemaraLogo.png"
            alt="Lemara Logo"
            width={150}
            height={70}
            className="object-contain transition-transform duration-200 hover:scale-105"
          />

          {/* Show "Welcome Name" on medium+ screens with better spacing */}
          <div className="hidden md:block">
            <div className="text-xl font-bold text-gray-800 dark:text-white tracking-wide bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              <span className="font-light text-lg">Welcome</span>
              <span className="ml-2 font-extrabold text-xl bg-gradient-to-r from-[#00a0d1] to-[#0088b3] bg-clip-text text-transparent">
                {displayName}
              </span>
            </div>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle - Always visible */}
          <ThemeToggleButton />

          {/* Notification Icon - Hidden on small screens */}
          <Link
            href="#"
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-[#00a0d1] text-white hover:bg-[#0088b3] transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </Link>

          {/* Email Icon - Hidden on small screens */}
          <Link
            href="#"
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-[#00a0d1] text-white hover:bg-[#0088b3] transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </Link>

          {/* Add Listing Button - Hidden on small screens */}
          <Link
            href="/dashboard/agent/add"
            className="hidden sm:inline-block px-3 md:px-4 py-2 text-sm font-bold text-white bg-[#9A2236] rounded-full hover:bg-[#851c2e] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2236] tracking-wide"
          >
            Add Listing
          </Link>

          {/* User Dropdown - Always visible */}
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Welcome Message */}
      <div className="md:hidden px-4 pb-2">
        <div className="text-center">
          <span className="text-sm font-light text-gray-600 dark:text-gray-300">Welcome</span>
          <span className="ml-1 text-lg font-bold bg-gradient-to-r from-[#00a0d1] to-[#0088b3] bg-clip-text text-transparent">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;