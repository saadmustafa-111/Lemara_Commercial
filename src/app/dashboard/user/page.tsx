"use client"
import React from 'react'
import { useAuth } from '../../../context/AuthContext'

export default function UserDashboardPage() {
  const { user } = useAuth()
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'User'}! Here's your account overview.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Applications</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">Commercial Loans</p>
            <p className="text-gray-500 text-sm">Submit and track your commercial loan applications</p>
            
            <div className="mt-4">
              <a href="/dashboard/user/commercial-loan" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Apply now
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Additional quick access cards can be added here */}
        </div>
        
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="text-gray-600">
            <p>No recent activities found.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
