"use client"

import type React from "react"
import { useSidebar } from "@/context/SidebarContext"
import AppSidebar from "@/layout/AppSidebar"
import { DashboardHeader } from "@/components/commisions/dashboard-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  
  // Calculate sidebar width based on sidebar state
  const sidebarWidth = isMobileOpen ? 0 : isExpanded || isHovered ? 290 : 90;
  
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
        />
      )}
      
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
        {/* Sidebar */}
        <div className="relative z-50">
          <AppSidebar />
        </div>
        
        {/* Main content area */}
        <div 
          className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
          style={{
            marginLeft: `${sidebarWidth}px`,
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto min-h-0 w-full">{children}</main>
        </div>
      </div>
    </>
  );
}
