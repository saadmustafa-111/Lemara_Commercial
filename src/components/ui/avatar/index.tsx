"use client"

import React from "react"
import DefaultAvatar from "./Avatar"

interface AvatarProps {
  className?: string
  children?: React.ReactNode
}

export function Avatar({ className = "", children }: AvatarProps) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
}

interface AvatarImageProps {
  className?: string
  src?: string
  alt?: string
}

export function AvatarImage({ className = "", src, alt = "" }: AvatarImageProps) {
  return <img className={`aspect-square h-full w-full ${className}`} src={src} alt={alt} />
}

interface AvatarFallbackProps {
  className?: string
  children?: React.ReactNode
}

export function AvatarFallback({ className = "", children }: AvatarFallbackProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  )
}

// For backward compatibility
export { DefaultAvatar }
