"use client"

import type React from "react"

import { SidebarProvider } from "@/context/SidebarContext"
import AppSidebar from "@/layout/AppSidebar"
import { DashboardHeader } from "@/components/commisions/dashboard-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 lg:ml-[90px] xl:ml-[290px]">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto min-h-0 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
