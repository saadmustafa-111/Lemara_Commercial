"use client"

import React from "react"

interface ProgressProps {
  value?: number
  max?: number
  className?: string
}

export function Progress({ value = 0, max = 100, className = "" }: ProgressProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100)

  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 ${className}`}>
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
}
