"use client";
import Link from 'next/link';
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
    <div className="w-full">
      {/* Header with title and Create Campaign button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <h1 className="text-xl text-blue-500 font-bold">Email Campaigns</h1>
        </div>
        <Link href="/dashboard/addemailcompaigns">
          <div className="bg-white text-black border border-gray-300 rounded-full px-4 py-2 font-medium cursor-pointer text-center">
            Create a Campaign
          </div>
        </Link>
      </div>

      {/* Campaign Count */}
      <div className="mb-6">
        <p className="text-sm">2 Campaigns / 907 Emails</p>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <div className="relative flex-1 max-w-96">
          <input 
            type="text" 
            className="pl-10 pr-4 py-2 border rounded-md w-full" 
            placeholder="Search by Name, Location or Brokerage"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>
        <div className="flex-shrink-0">
          <select className="border rounded-md py-2 px-3 w-full sm:w-auto">
            <option>All Campaigns</option>
          </select>
        </div>
      </div>

      {/* Campaign Table - No Scroll */}
      <div className="bg-white rounded-md shadow mb-4">
        <div className="w-full">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '20%'}}>CAMPAIGN</th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '9%'}}>
                  EMAIL REQ
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '9%'}}>
                  SENT<br/>
                  <span className="text-[10px]">% REQ</span>
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '9%'}}>
                  DELIVERED<br/>
                  <span className="text-[10px]">% SENT</span>
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '9%'}}>
                  OPENED<br/>
                  <span className="text-[10px]">% DEL</span>
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '9%'}}>
                  CLICKED<br/>
                  <span className="text-[10px]">% OPEN</span>
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '11%'}}>
                  PROPERTY<br/>
                  <span className="text-[10px]">% OPEN</span>
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '12%'}}>
                  OM/FLYER<br/>
                  <span className="text-[10px]">% OPEN</span>
                </th>
                <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '12%'}}>
                  DD<br/>
                  <span className="text-[10px]">% OPEN</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-2 py-4" style={{width: '20%'}}>
                    <div className="truncate text-sm font-medium mb-1" title={campaign.name}>
                      {campaign.name}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <button className="text-[10px] border border-gray-300 rounded px-2 py-1 w-fit">Details</button>
                      <button className="text-[10px] border border-gray-300 rounded px-2 py-1 w-fit">Report</button>
                    </div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '9%'}}>{campaign.emailRequested}</td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '9%'}}>
                    {campaign.sent}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '9%'}}>
                    {campaign.delivered}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '9%'}}>
                    {campaign.opened}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '9%'}}>
                    {campaign.clicked}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '11%'}}>
                    {campaign.clickedProperty}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '12%'}}>
                    {campaign.clickedOM}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                  <td className="px-1 py-4 text-center text-sm" style={{width: '12%'}}>
                    {campaign.clickedDD}
                    <div className="text-[10px] text-gray-500">0%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
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