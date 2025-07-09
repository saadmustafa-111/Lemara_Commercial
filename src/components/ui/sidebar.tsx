"use client"

import React from "react"
import Button from "@/components/ui/button/Button"
import { Menu } from "lucide-react"
import { useSidebar } from "@/context/SidebarContext"

export function SidebarTrigger({ className = "" }: { className?: string }) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="outline"
      size="sm"
      className={`h-9 w-9 ${className}`}
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
