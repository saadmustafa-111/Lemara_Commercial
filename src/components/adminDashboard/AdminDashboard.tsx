"use client";
import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { BarChart3, Users, Building, TrendingUp, MapPin, Eye, Edit, Trash2, Plus, Search, Filter, Bell, Settings, User } from 'lucide-react';

// Define types for our dashboard data
=======
import { BarChart3, Users, Building, TrendingUp, MapPin, Eye, Edit, Trash2, Plus, Search, Filter, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import Badge from '@/components/ui/badge/Badge';
import useLoading from '@/hooks/useLoading';

// Define types for our real estate dashboard data
>>>>>>> Stashed changes
interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  location: string;
  image: string;
  status: string;
  agent: string;
  created: string;
  views: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

interface Agent {
  id: number;
  name: string;
  email: string;
  avatar: string;
  properties: number;
  sales: number;
  joined: string;
  status: string;
}

interface DashboardData {
  adminStats: {
    totalProperties: number;
    totalAgents: number;
    totalSales: number;
    activeListings: number;
    monthlyRevenue: number;
    avgPrice: number;
  };
  recentProperties: Property[];
  topAgents: Agent[];
}

export default function RealEstateAdminDashboard() {
<<<<<<< Updated upstream
  const [isLoading, setIsLoading] = useState(true);
=======
  const { isLoading, withLoading } = useLoading(true);
  
  // Mock data for the real estate dashboard with proper typing
>>>>>>> Stashed changes
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    adminStats: {
      totalProperties: 0,
      totalAgents: 0,
      totalSales: 0,
      activeListings: 0,
      monthlyRevenue: 0,
      avgPrice: 0
    },
    recentProperties: [],
    topAgents: []
  });

  // Simulate fetching data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
<<<<<<< Updated upstream
        setTimeout(() => {
          setDashboardData({
            adminStats: {
              totalProperties: 1247,
              totalAgents: 34,
              totalSales: 156,
              activeListings: 892,
              monthlyRevenue: 2840000,
              avgPrice: 750000
            },
            recentProperties: [
              {
                id: 1,
                title: "Modern Downtown Apartment",
                type: "Apartment",
                price: 450000,
                location: "Downtown, NYC",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
                status: "active",
                agent: "Sarah Johnson",
                created: "2 days ago",
                views: 247,
                bedrooms: 2,
                bathrooms: 2,
                area: 1200
              },
              {
                id: 2,
                title: "Luxury Villa with Pool",
                type: "Villa",
                price: 1200000,
                location: "Beverly Hills, CA",
                image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
                status: "pending",
                agent: "Michael Brown",
                created: "1 week ago",
                views: 892,
                bedrooms: 5,
                bathrooms: 4,
                area: 3500
              },
              {
                id: 3,
                title: "Cozy Suburban House",
                type: "House",
                price: 680000,
                location: "Suburbs, TX",
                image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
                status: "sold",
                agent: "Emma Wilson",
                created: "3 days ago",
                views: 156,
                bedrooms: 3,
                bathrooms: 2,
                area: 2100
              },
              {
                id: 4,
                title: "Penthouse with City View",
                type: "Penthouse",
                price: 2500000,
                location: "Manhattan, NYC",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
                status: "active",
                agent: "David Chen",
                created: "5 days ago",
                views: 1247,
                bedrooms: 4,
                bathrooms: 3,
                area: 2800
              }
            ],
            topAgents: [
              { 
                id: 1, 
                name: "Sarah Johnson", 
                email: "sarah.johnson@realestate.com", 
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", 
                properties: 28,
                sales: 12,
                joined: "Jan 2023",
                status: "active"
              },
              { 
                id: 2, 
                name: "Michael Brown", 
                email: "michael.brown@realestate.com", 
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face", 
                properties: 34,
                sales: 18,
                joined: "Mar 2022",
                status: "active"
              },
              { 
                id: 3, 
                name: "Emma Wilson", 
                email: "emma.wilson@realestate.com", 
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face", 
                properties: 22,
                sales: 9,
                joined: "Aug 2023",
                status: "active"
              }
            ]
          });
          setIsLoading(false);
        }, 1500);
=======
        // Simulate API call with delay
        await withLoading(
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setDashboardData({
                adminStats: {
                  totalProperties: 178,
                  totalAgents: 24,
                  totalSales: 48,
                  activeListings: 94,
                  monthlyRevenue: 425000,
                  avgPrice: 875000
                },
                recentProperties: [
                  {
                    id: 100079,
                    title: "520 ACR MIXED LICENSED GRN HS & OUTDR",
                    type: "Land",
                    price: 9990000,
                    location: "Lake Nacimiento",
                    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
                    status: "active",
                    agent: "AJ Rana",
                    created: "7/23/2019",
                    views: 542,
                    bedrooms: 0,
                    bathrooms: 0,
                    area: 520
                  },
                  {
                    id: 100100,
                    title: "LICENSED GREEN-HOUSE CANNABIS FARM",
                    type: "Farm",
                    price: 7750000,
                    location: "Salinas",
                    image: "https://images.unsplash.com/photo-1605146768851-eda79da39897?w=400&h=300&fit=crop",
                    status: "sold",
                    agent: "AJ Rana",
                    created: "8/19/2019",
                    views: 868,
                    bedrooms: 0,
                    bathrooms: 0,
                    area: 0
                  },
                  {
                    id: 100104,
                    title: "ESTABLISHED DELI CAFE AND GYRO",
                    type: "Commercial",
                    price: 89000,
                    location: "Newark",
                    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
                    status: "active",
                    agent: "AJ Rana",
                    created: "8/22/2019",
                    views: 866,
                    bedrooms: 0,
                    bathrooms: 0,
                    area: 0
                  },
                  {
                    id: 100135,
                    title: "SUCCESSFUL ASSISTED LIVING FACILITY",
                    type: "Commercial",
                    price: 9750000,
                    location: "Sacramento",
                    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
                    status: "active",
                    agent: "AJ Rana",
                    created: "8/27/2019",
                    views: 9,
                    bedrooms: 0,
                    bathrooms: 0,
                    area: 0
                  },
                  {
                    id: 100238,
                    title: "OPPORTUNITY TO BUY MULTI-FAMILY BUILDING",
                    type: "Multi-Family",
                    price: 35449230,
                    location: "San Francisco",
                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
                    status: "active",
                    agent: "AJ Rana",
                    created: "2/2/2020",
                    views: 0,
                    bedrooms: 24,
                    bathrooms: 18,
                    area: 14500
                  }
                ],
                topAgents: [
                  { 
                    id: 1, 
                    name: "AJ Rana", 
                    email: "agent@lemaraconstruction.com", 
                    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop&crop=face", 
                    properties: 42,
                    sales: 18,
                    joined: "Jul 2019",
                    status: "active"
                  },
                  { 
                    id: 2, 
                    name: "Abdul Shah", 
                    email: "ashah@lemaraconstruction.com", 
                    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=60&h=60&fit=crop&crop=face", 
                    properties: 2,
                    sales: 1,
                    joined: "May 2022",
                    status: "active"
                  },
                  { 
                    id: 3, 
                    name: "Sarah Johnson", 
                    email: "sjohnson@lemaraconstruction.com", 
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", 
                    properties: 0,
                    sales: 0,
                    joined: "Mar 2022",
                    status: "active"
                  }
                ]
              });
              resolve();
            }, 1500);
          })
        );
>>>>>>> Stashed changes
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const { adminStats, recentProperties, topAgents } = dashboardData;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'sold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
<<<<<<< Updated upstream
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Real Estate Admin</h1>
=======
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lemara Commercial</h1>
>>>>>>> Stashed changes
                  <p className="text-sm text-gray-500 dark:text-gray-400">Property Management Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, agents..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Settings className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
<<<<<<< Updated upstream
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</span>
=======
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lemara Admin</span>
>>>>>>> Stashed changes
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.totalProperties.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.totalAgents}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.totalSales}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.activeListings}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatPrice(adminStats.monthlyRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatPrice(adminStats.avgPrice)}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Properties */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Properties</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Property</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentProperties.map(property => (
                    <div key={property.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{property.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{property.location}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
<<<<<<< Updated upstream
                              <span>{property.bedrooms} beds</span>
                              <span>{property.bathrooms} baths</span>
                              <span>{property.area.toLocaleString()} sqft</span>
=======
                              {property.bedrooms > 0 && <span>{property.bedrooms} beds</span>}
                              {property.bathrooms > 0 && <span>{property.bathrooms} baths</span>}
                              {property.area > 0 && <span>{property.area.toLocaleString()} sqft</span>}
                              {property.type && <span>{property.type}</span>}
>>>>>>> Stashed changes
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(property.price)}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Eye className="w-4 h-4" />
                            <span>{property.views} views</span>
                            <span>•</span>
                            <span>Agent: {property.agent}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Agents */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Agents</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {topAgents.map(agent => (
                    <div key={agent.id} className="flex items-center space-x-3">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{agent.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{agent.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{agent.properties} properties</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{agent.sales} sales</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
<<<<<<< Updated upstream
                  <button className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <Plus className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Add Property</div>
                  </button>
                  
                  <button className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <Users className="w-5 h-5 text-green-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Add Agent</div>
                  </button>
                  
                  <button className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <BarChart3 className="w-5 h-5 text-purple-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">View Reports</div>
                  </button>
                  
                  <button className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <Settings className="w-5 h-5 text-orange-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Settings</div>
                  </button>
=======
                  <Link href="/dashboard/admin/properties/add" className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <Plus className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Add Property</div>
                  </Link>
                  
                  <Link href="/dashboard/admin/agents/add" className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <Users className="w-5 h-5 text-green-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Add Agent</div>
                  </Link>
                  
                  <Link href="/dashboard/admin/reports" className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <BarChart3 className="w-5 h-5 text-purple-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">View Reports</div>
                  </Link>
                  
                  <Link href="/dashboard/admin/settings" className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <Settings className="w-5 h-5 text-orange-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Settings</div>
                  </Link>
>>>>>>> Stashed changes
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}