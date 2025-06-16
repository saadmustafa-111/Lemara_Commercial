"use client"
import React from 'react'

type ProgressStepProps = {
  currentStep: number
  totalSteps: number
}

const FormProgressIndicator: React.FC<ProgressStepProps> = ({ currentStep, totalSteps }) => {  return (
    <div className="mb-8">
      <div className="flex justify-between mb-3">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div 
            key={step} 
            className={`relative flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold shadow-md
              ${currentStep >= step 
                ? 'bg-[#00a0d1] text-white' 
                : 'bg-gray-200 text-gray-500'} 
              transition-all duration-300 transform ${currentStep === step ? 'scale-110' : ''}`}
          >
            {step}
            {step < totalSteps && (
              <div 
                className={`absolute top-1/2 left-full h-[3px] w-[calc(100%-2rem)] -translate-y-1/2
                  ${currentStep > step ? 'bg-[#00a0d1]' : 'bg-gray-200'} 
                  transition-all duration-300`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs font-medium text-gray-600 px-1">
        <span className={`${currentStep === 1 ? 'text-[#00a0d1] font-semibold' : ''}`}>Basic Info</span>
        <span className={`${currentStep === 2 ? 'text-[#00a0d1] font-semibold' : ''}`}>Applicant's Information</span>
        <span className={`${currentStep === 3 ? 'text-[#00a0d1] font-semibold' : ''}`}>Review</span>
      </div>
    </div>
  )
}

export default FormProgressIndicator
