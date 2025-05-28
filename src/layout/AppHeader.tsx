"use client"
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton"
import UserDropdown from "@/components/header/UserDropdown"
import { useAuth } from "@/context/AuthContext"
import { useSidebar } from "@/context/SidebarContext"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"

const AppHeader: React.FC = () => {
  const { user } = useAuth()
  const { isExpanded, isMobileOpen } = useSidebar()
  const displayName = user ? user.name : "Guest"

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  // Calculate sidebar width for header positioning
  const sidebarWidth = isMobileOpen ? 0 : isExpanded ? 290 : 90

  // Determine if sidebar is in expanded mode (more space available when collapsed)
  const hasMoreSpace = !isExpanded && !isMobileOpen

  // Normalize the user role for logic
  const userRole = user?.role?.toLowerCase() || "guest"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(
        (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
      )
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, visible])

  return (
    <header
      className={`fixed top-0 z-[99999] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 transition-all duration-500 ease-in-out ${
        visible ? "" : "transform translate-y-[-100%]"
      }`}
      style={{
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        fontFamily:
          "'Inter', 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        className={`flex items-center justify-between px-4 md:px-6 transition-all duration-500 ease-in-out ${
          hasMoreSpace ? "py-4" : "py-3"
        }`}
      >
        {/* Left - Brand Name and Welcome */}
        <div className="flex items-center gap-8 md:gap-12">
          <div className="hidden md:block">
            <div
              className={`font-semibold text-gray-800 dark:text-white tracking-wide transition-all duration-500 ease-in-out ${
                hasMoreSpace ? "text-2xl" : "text-xl"
              }`}
            >
              <span
                className={`font-light text-gray-600 dark:text-gray-300 transition-all duration-500 ease-in-out ${
                  hasMoreSpace ? "text-xl" : "text-lg"
                }`}
              >
                Welcome
              </span>
              <span
                className={`ml-2 font-bold bg-gradient-to-r from-[#00a0d1] to-[#0088b3] bg-clip-text text-transparent transition-all duration-500 ease-in-out ${
                  hasMoreSpace ? "text-2xl" : "text-xl"
                }`}
              >
                {displayName}
              </span>
            </div>
          </div>
        </div>
        {/* Right - Actions */}
        <div
          className={`flex items-center transition-all duration-500 ease-in-out ${
            hasMoreSpace ? "gap-4 md:gap-5" : "gap-2 md:gap-3"
          }`}
        >
          {/* Theme Toggle - Always visible */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              hasMoreSpace ? "scale-110" : "scale-100"
            }`}
          >
            <ThemeToggleButton />
          </div>

          {/* Notification Icon */}
          <Link
            href="#"
            className={`flex items-center justify-center rounded-full bg-[#00a0d1] text-white hover:bg-[#0088b3] transition-all duration-500 ease-in-out shadow-sm hover:shadow-md transform hover:scale-110 ${
              hasMoreSpace ? "w-12 h-12" : "w-10 h-10"
            } ${hasMoreSpace ? "flex" : "hidden sm:flex"}`}
          >
            <svg
              className={`transition-all duration-500 ease-in-out ${
                hasMoreSpace ? "w-6 h-6" : "w-5 h-5"
              }`}
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

          {/* Email Icon */}
          <Link
            href="#"
            className={`flex items-center justify-center rounded-full bg-[#00a0d1] text-white hover:bg-[#0088b3] transition-all duration-500 ease-in-out shadow-sm hover:shadow-md transform hover:scale-110 ${
              hasMoreSpace ? "w-12 h-12" : "w-10 h-10"
            } ${hasMoreSpace ? "flex" : "hidden sm:flex"}`}
          >
            <svg
              className={`transition-all duration-500 ease-in-out ${
                hasMoreSpace ? "w-6 h-6" : "w-5 h-5"
              }`}
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

          {/* -------- "Add Listing" - Only for NON-admin roles -------- */}
          {userRole !== "admin" && (
            <Link
              href="/dashboard/agent/add"
              className={`font-semibold text-white bg-[#9A2236] rounded-full hover:bg-[#851c2e] transition-all duration-500 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2236] tracking-wide ${
                hasMoreSpace ? "px-6 py-3 text-base" : "px-3 md:px-4 py-2 text-sm"
              } ${hasMoreSpace ? "inline-block" : "hidden sm:inline-block"}`}
            >
              Add Listing
            </Link>
          )}
          {/* -------------------------------------------------------- */}

          {/* User Dropdown - Always visible */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              hasMoreSpace ? "scale-110" : "scale-100"
            }`}
          >
            <UserDropdown />
          </div>
        </div>
      </div>
      {/* Mobile Welcome Message */}
      <div
        className={`md:hidden px-4 transition-all duration-500 ease-in-out ${
          hasMoreSpace ? "pb-3" : "pb-2"
        }`}
      >
        <div className="text-center">
          <span
            className={`font-light text-gray-600 dark:text-gray-300 transition-all duration-500 ease-in-out ${
              hasMoreSpace ? "text-base" : "text-sm"
            }`}
          >
            Welcome
          </span>
          <span
            className={`ml-1 font-semibold bg-gradient-to-r from-[#00a0d1] to-[#0088b3] bg-clip-text text-transparent transition-all duration-500 ease-in-out ${
              hasMoreSpace ? "text-xl" : "text-lg"
            }`}
          >
            {displayName}
          </span>
        </div>
      </div>
    </header>
  )
}

export default AppHeader