import React from 'react'
import AgentsTable from '@/components/adminDashboard/AgentsTable'

export default function AgentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Agents Management</h1>
      <AgentsTable />
    </div>
  )
}
