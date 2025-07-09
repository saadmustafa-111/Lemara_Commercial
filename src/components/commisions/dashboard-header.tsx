"use client"

import React from "react"
import { Menu } from "lucide-react"
import Button from "@/components/ui/button/Button"
import { useSidebar } from "@/context/SidebarContext"

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar()
  
  return (
    <header className="flex h-16 items-center justify-between border-b border-blue-100 bg-white/80 backdrop-blur-sm px-4 md:px-6 shadow-sm w-full sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="h-9 w-9 hover:bg-blue-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Commission Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-blue-600 font-medium">Welcome to Commission Dashboard</div>
      </div>
    </header>
  )
}
