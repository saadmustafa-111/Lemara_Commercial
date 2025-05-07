"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/badge/Badge';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import useLoading from '@/hooks/useLoading';

// Define types for the dashboard data
interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  status: string;
  grossIncome: string;
  netIncome: string;
  capRate: string;
  lotSize: string;
  buildArea: string;
  downPayment: string;
  price: string;
  category: string;
  image: string;
}

interface DashboardData {
  properties: Property[];
}

export default function AgentDashboard() {
  const { isLoading, withLoading } = useLoading(true);
  // Mock data for the dashboard with proper typing
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    properties: []
  });

  // Simulate fetching data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call with delay
        await withLoading(
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setDashboardData({
                properties: [
                  {
                    id: 1,
                    title: "It Sector!",
                    location: "Idaho",
                    type: "COMMERCIAL",
                    status: "ACTIVE",
                    grossIncome: "N/A",
                    netIncome: "N/A",
                    capRate: "N/A",
                    lotSize: "N/A",
                    buildArea: "N/A",
                    downPayment: "N/A",
                    price: "$122,222",
                    category: "Other",
                    image: "/images/no-image-placeholder.svg"
                  },
                  {
                    id: 2,
                    title: "Food Stall!",
                    location: "",
                    type: "COMMERCIAL",
                    status: "ACTIVE",
                    grossIncome: "N/A",
                    netIncome: "N/A",
                    capRate: "N/A",
                    lotSize: "N/A",
                    buildArea: "N/A",
                    downPayment: "N/A",
                    price: "$12,222",
                    category: "Express Car Washes",
                    image: "/images/no-image-placeholder.svg"
                  },
                  {
                    id: 3,
                    title: "Arden Way!",
                    location: "Sacramento, California",
                    type: "COMMERCIAL",
                    status: "ACTIVE",
                    grossIncome: "$143,870",
                    netIncome: "$125,870",
                    capRate: "5.72%",
                    lotSize: "1 Acres",
                    buildArea: "10,000 Sq Ft",
                    downPayment: "N/A",
                    price: "$2,200,000",
                    category: "Hotels",
                    image: "/images/property-sample.jpg"
                  }
                ]
              });
              resolve();
            }, 2000); // 2 second delay to simulate loading
          })
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [withLoading]);

  return (
    <div className="relative px-4 py-6 bg-white dark:bg-gray-900">
      {/* Loading overlay */}
      <LoadingOverlay 
        isLoading={isLoading} 
        withLogo={true}
        text="Loading properties..."
        fullScreen={true}
      />

      {/* Dashboard header */}
      <div className="flex items-center mb-4">
        <Link href="/dashboard">
          <div className="flex items-center text-[#0099cc] hover:text-[#007ab3] dark:text-[#00a0d1] dark:hover:text-[#0088b3]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="ml-2 text-2xl font-medium">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Property Update title */}
      <div className="mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Property Update</h1>
      </div>

      {/* Property cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-full">
        {dashboardData.properties.map(property => (
          <div key={property.id} className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm h-[580px] bg-white dark:bg-gray-800">
            <div className="relative h-64 w-full">
              <Image 
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-md">
                  {property.type}
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-[#1DAC2B] text-white text-xs font-bold px-3 py-1 rounded-md">
                  {property.status}
                </div>
              </div>
              {property.id === 3 && (
                <>
                  <div className="absolute bottom-1/2 left-3 translate-y-1/2">
                    <button className="bg-black/60 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-1/2 right-3 translate-y-1/2">
                    <button className="bg-black/60 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <button className="bg-black/60 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{property.title}</h3>
              {property.location && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{property.location}</p>
              )}
              {!property.location && <div className="mb-3"></div>}
              
              <div className="mb-3">
                <p className="font-medium text-gray-800 dark:text-gray-200">Income</p>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">Gross Operating Income</div>
                  <div className="text-right dark:text-gray-300">{property.grossIncome}</div>
                  <div className="text-gray-600 dark:text-gray-400">Net Operating Income</div>
                  <div className="text-right dark:text-gray-300">{property.netIncome}</div>
                  <div className="text-gray-600 dark:text-gray-400">CAP Rate</div>
                  <div className="text-right dark:text-gray-300">{property.capRate}</div>
                </div>
              </div>
              
              <div className="mb-auto">
                <p className="font-medium text-gray-800 dark:text-gray-200">Details</p>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">Lot Size</div>
                  <div className="text-right dark:text-gray-300">{property.lotSize}</div>
                  <div className="text-gray-600 dark:text-gray-400">Build Area</div>
                  <div className="text-right dark:text-gray-300">{property.buildArea}</div>
                  <div className="text-gray-600 dark:text-gray-400">Down Payment</div>
                  <div className="text-right dark:text-gray-300">{property.downPayment}</div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center bg-[#00a0d1] hover:bg-[#0088b3] dark:bg-[#0088b3] dark:hover:bg-[#00a0d1] text-white p-3 rounded-md transition-colors">
                <div className="font-bold">{property.price}</div>
                <div>{property.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}