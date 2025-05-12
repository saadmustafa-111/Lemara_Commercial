"use client"

import type React from "react"

interface CheckboxProps {
  id: string
  label?: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange, className = "", disabled = false }) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only" // Hide the actual input
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
            checked
              ? "bg-[#06AED7] border-[#06AED7]" // Checked state - use the blue color from the design
              : "bg-white border-gray-300"
          } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !disabled && onChange({ target: { checked: !checked } } as any)}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 text-sm font-medium ${
            disabled ? "text-gray-400" : className || "text-gray-700"
          } cursor-pointer`}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
