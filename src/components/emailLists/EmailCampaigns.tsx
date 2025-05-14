"use client";

import React, { useState } from 'react';

interface Campaign {
  id: number;
  name: string;
  emailRequested: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  clickedProperty: number;
  clickedOM: number;
  clickedDD: number;
}

const EmailCampaigns: React.FC = () => {
  // Sample data to match the image
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: 'Velit architecto ali',
      emailRequested: 1,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      clickedProperty: 0,
      clickedOM: 0,
      clickedDD: 0
    },
    {
      id: 2,
      name: 'Iaon',
      emailRequested: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      clickedProperty: 0,
      clickedOM: 0,
      clickedDD: 0
    }
  ]);

  // Metrics data for charts
  const emailSentTotal = 700;
  const emailDeliveredTotal = 700;
  const emailOpenedTotal = 600;
  const emailClickedTotal = 678;

  return (
    <div>
      {/* Header with title and Create Campaign button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <h1 className="text-xl text-blue-500 font-bold">Email Campaigns</h1>
        </div>
        <button className="bg-white text-black border border-gray-300 rounded-full px-4 py-2 font-medium">
          Create a Campaign
        </button>
      </div>

      {/* Campaign Count */}
      <div className="mb-6">
        <p className="text-sm">2 Campaigns / 907 Emails</p>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Chart 1: Email Sent & Delivered */}
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Donut chart for Sent vs Delivered */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Cyan segment for Delivered (900) */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#00BCD4"
                strokeWidth="20"
                strokeDasharray="251.2 0"
                transform="rotate(-90 50 50)"
              />
              {/* Red segment for Email Sent (700) */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#FF5252"
                strokeWidth="20"
                strokeDasharray="125.6 125.6"
                transform="rotate(-90 50 50)"
              />
              {/* White center */}
              <circle cx="50" cy="50" r="30" fill="white" />
            </svg>
          </div>
          <div className="ml-4">
            <div className="flex items-center mb-1">
              <div className="w-4 h-2 bg-cyan-500 mr-2"></div>
              <span className="text-xs">Delivered (900)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-2 bg-red-500 mr-2"></div>
              <span className="text-xs">Email Sent (700)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Opened vs Delivered Emails */}
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Donut chart for Opened vs Delivered */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Red segment for Delivered (700) */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#FF5252"
                strokeWidth="20"
                strokeDasharray="125.6 125.6"
                transform="rotate(-90 50 50)"
              />
              {/* Dark blue segment for Opened (600) */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#0D47A1"
                strokeWidth="20"
                strokeDasharray="107.7 143.5"
                transform="rotate(-90 50 50)"
              />
              {/* White center */}
              <circle cx="50" cy="50" r="30" fill="white" />
            </svg>
          </div>
          <div className="ml-4">
            <div className="flex items-center mb-1">
              <div className="w-4 h-2 bg-blue-900 mr-2"></div>
              <span className="text-xs">Opened (600)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-2 bg-red-500 mr-2"></div>
              <span className="text-xs">Delivered Emails (700)</span>
            </div>
          </div>
        </div>

        {/* Chart 3: Clicked vs Emails Clicked */}
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Donut chart for Clicked vs Emails Clicked */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Red segment for Emails Clicked (91%) */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#FF5252"
                strokeWidth="20"
                strokeDasharray="226.1 25.1"
                transform="rotate(-90 50 50)"
              />
              {/* Pink segment for Clicked (678) */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#FF80AB"
                strokeWidth="20"
                strokeDasharray="121.4 129.8"
                transform="rotate(-90 50 50)"
              />
              {/* White center */}
              <circle cx="50" cy="50" r="30" fill="white" />
            </svg>
          </div>
          <div className="ml-4">
            <div className="flex items-center mb-1">
              <div className="w-4 h-2 bg-pink-400 mr-2"></div>
              <span className="text-xs">Clicked (678)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-2 bg-red-500 mr-2"></div>
              <span className="text-xs">Emails Clicked (91%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-2 mb-4">
        <div className="relative">
          <input 
            type="text" 
            className="pl-10 pr-4 py-2 border rounded-md w-96" 
            placeholder="Search by Name, Location or Brokerage"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>
        <div>
          <select className="border rounded-md py-2 px-3">
            <option>All Campaigns</option>
          </select>
        </div>
      </div>      {/* Campaign Table */}
      <div className="bg-white rounded-md shadow mb-4">
        <div className="overflow-x-auto" style={{ minWidth: '100%' }}>
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">CAMPAIGN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">EMAIL REQUESTED</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Sent<br/>
                  % of Requested
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Delivered<br/>
                  % of Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Opened<br/>
                  % of Delivered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Clicked<br/>
                  % of Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Clicked Property<br/>
                  % of Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Clicked OM / Flyer<br/>
                  % of Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Clicked DD<br/>
                  % of Opened
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {campaign.name}
                      <div className="space-x-2 mt-2">
                        <button className="text-xs border border-gray-300 rounded-md px-3 py-1">View Details</button>
                        <button className="text-xs border border-gray-300 rounded-md px-3 py-1">Download Report</button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{campaign.emailRequested}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.sent}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.delivered}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.opened}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.clicked}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.clickedProperty}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.clickedOM}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {campaign.clickedDD}
                    <div className="text-xs text-gray-500">0%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">Rows per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div>
          <span>1</span>
        </div>
      </div>
    </div>
  );
};

export default EmailCampaigns;
