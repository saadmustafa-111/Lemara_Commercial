"use client"
import Sidebar from "../../layout/AppSidebar"
import type React from "react"

import Header from "../../layout/AppHeader"
import { useSidebar } from "@/context/SidebarContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()

  // Calculate sidebar width
  const sidebarWidth = isMobileOpen ? 0 : isExpanded || isHovered ? 290 : 90

  // Calculate header height based on sidebar state
  const headerHeight = !isExpanded && !isHovered && !isMobileOpen ? 72 : 88

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 flex relative">
      {/* Sidebar */}
      <div className="relative z-50">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-500 ease-in-out"
        style={{
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        {/* Header */}
        <div className="relative z-40">
          <Header />
        </div>

        {/* Page content */}
        <main
          className="flex-1 p-4 md:p-6 overflow-x-hidden transition-all duration-500 ease-in-out"
          style={{
            marginTop: `${headerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <div className="w-full max-w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
