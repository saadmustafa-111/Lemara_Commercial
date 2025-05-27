"use client"
import { useEffect, useState } from "react"
import {
  Users,
  Building,
  Eye,
  Edit,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  Download,
  UserCheck,
  BarChart3,
  CreditCard,
  PieChart,
  Globe,
} from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  ComposedChart,
} from "recharts"

interface DashboardData {
  adminStats: {
    totalProperties: number
    totalClients: number
    totalAgents: number
    monthlyRevenue: number
    commercialLoans: number
  }
  salesData: Array<{
    month: string
    sales: number
    revenue: number
    year: number
  }>
  locationData: Array<{
    city: string
    sales: number
    value: number
    coordinates: [number, number]
  }>
  recentTransactions: Array<{
    id: string
    property: string
    client: string
    agent: string
    amount: number
    date: string
    status: string
    type: string
  }>
}

// Vector Map Component
function VectorMap({ locationData }: { locationData: DashboardData["locationData"] }) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  // More accurate California bounds
  const mapBounds = {
    minLat: 32.0,
    maxLat: 42.0,
    minLng: -125.0,
    maxLng: -114.0,
  }

  // Convert coordinates to SVG positions with better accuracy
  const coordToSVG = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100
    return { x, y }
  }

  // Get smaller, more realistic dot size based on sales volume
  const getDotSize = (sales: number) => {
    const maxSales = Math.max(...locationData.map((l) => l.sales))
    const minSize = 3
    const maxSize = 8
    return minSize + (sales / maxSales) * (maxSize - minSize)
  }

  // Get dot color based on sales volume with better color scheme
  const getDotColor = (sales: number) => {
    const maxSales = Math.max(...locationData.map((l) => l.sales))
    const intensity = sales / maxSales
    if (intensity > 0.8) return "#dc2626" // Red for highest
    if (intensity > 0.6) return "#ea580c" // Orange
    if (intensity > 0.4) return "#ca8a04" // Yellow
    if (intensity > 0.2) return "#16a34a" // Green
    return "#2563eb" // Blue for lowest
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden border border-slate-300">
      {/* California map SVG */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* More detailed California outline */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="mapShadow">
            <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" floodColor="#64748b" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Detailed California outline */}
        <path
          d="M20,15 L25,12 L30,10 L35,9 L40,8.5 L45,9 L50,10 L55,12 L60,15 L65,18 L70,22 L75,27 L80,33 L83,40 L85,47 L86,54 L85,61 L83,68 L80,74 L76,79 L71,83 L65,86 L58,88 L50,89 L42,88 L35,86 L28,83 L22,79 L17,74 L14,68 L12,61 L11,54 L12,47 L14,40 L16,33 L18,27 L20,21 Z"
          fill="url(#mapGradient)"
          stroke="#64748b"
          strokeWidth="0.8"
          filter="url(#mapShadow)"
        />

        {/* State border details */}
        <path d="M20,15 L85,47" stroke="#94a3b8" strokeWidth="0.2" opacity="0.3" strokeDasharray="1,1" />

        {/* Location dots */}
        {locationData.map((location) => {
          const { x, y } = coordToSVG(location.coordinates[1], location.coordinates[0])
          const dotSize = getDotSize(location.sales)
          const dotColor = getDotColor(location.sales)

          return (
            <g key={location.city}>
              {/* Subtle glow effect */}
              <circle cx={x} cy={y} r={dotSize + 1} fill={dotColor} opacity="0.2" className="animate-pulse" />
              {/* Main dot */}
              <circle
                cx={x}
                cy={y}
                r={dotSize}
                fill={dotColor}
                stroke="white"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200 hover:scale-150 drop-shadow-sm"
                onMouseEnter={() => setHoveredLocation(location.city)}
                onMouseLeave={() => setHoveredLocation(null)}
              />
              {/* City label for major cities */}
              {location.sales > 100 && (
                <text
                  x={x + dotSize + 2}
                  y={y + 1}
                  fontSize="2.5"
                  fill="#374151"
                  className="font-medium pointer-events-none"
                  style={{ textShadow: "0 0 2px white" }}
                >
                  {location.city.split(" ")[0]}
                </text>
              )}
            </g>
          )
        })}

        {/* Map grid lines for reference */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.2" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Enhanced tooltip */}
      {hoveredLocation && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-xl p-4 border border-gray-200 z-10 min-w-[180px]">
          {(() => {
            const location = locationData.find((l) => l.city === hoveredLocation)
            if (!location) return null
            return (
              <div className="text-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900 text-base">{location.city}</p>
                  <div
                    className="w-3 h-3 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: getDotColor(location.sales) }}
                  ></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sales:</span>
                    <span className="font-semibold text-gray-900">{location.sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-semibold text-gray-900">{formatPrice(location.value)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg/Sale:</span>
                    <span className="font-semibold text-gray-900">{formatPrice(location.value / location.sales)}</span>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Enhanced legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <p className="text-xs font-bold text-gray-900 mb-2">Sales Volume</p>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-gray-600">Low (50-70)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-gray-600">Med (70-100)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
            <span className="text-gray-600">High (100-130)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-5 h-5 rounded-full bg-red-600"></div>
            <span className="text-gray-600">Very High (130+)</span>
          </div>
        </div>
      </div>

      {/* Map title */}
      <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-1 border border-gray-200">
        <p className="text-xs font-semibold text-gray-700">California Sales Map</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    adminStats: {
      totalProperties: 0,
      totalClients: 0,
      totalAgents: 0,
      monthlyRevenue: 0,
      commercialLoans: 0,
    },
    salesData: [],
    locationData: [],
    recentTransactions: [],
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setTimeout(() => {
          setDashboardData({
            adminStats: {
              totalProperties: 847,
              totalClients: 1234,
              totalAgents: 67,
              monthlyRevenue: 2850000,
              commercialLoans: 45,
            },
            salesData: [
              { month: "Jan", sales: 45, revenue: 2100000, year: 2024 },
              { month: "Feb", sales: 52, revenue: 2450000, year: 2024 },
              { month: "Mar", sales: 48, revenue: 2200000, year: 2024 },
              { month: "Apr", sales: 61, revenue: 2800000, year: 2024 },
              { month: "May", sales: 55, revenue: 2650000, year: 2024 },
              { month: "Jun", sales: 67, revenue: 3100000, year: 2024 },
              { month: "Jul", sales: 72, revenue: 3350000, year: 2024 },
              { month: "Aug", sales: 68, revenue: 3200000, year: 2024 },
              { month: "Sep", sales: 58, revenue: 2750000, year: 2024 },
              { month: "Oct", sales: 74, revenue: 3450000, year: 2024 },
              { month: "Nov", sales: 81, revenue: 3800000, year: 2024 },
              { month: "Dec", sales: 79, revenue: 3650000, year: 2024 },
            ],
            locationData: [
              { city: "Los Angeles", sales: 145, value: 12500000, coordinates: [-118.2437, 34.0522] },
              { city: "San Francisco", sales: 123, value: 18700000, coordinates: [-122.4194, 37.7749] },
              { city: "San Diego", sales: 98, value: 8900000, coordinates: [-117.1611, 32.7157] },
              { city: "Sacramento", sales: 87, value: 6200000, coordinates: [-121.4944, 38.5816] },
              { city: "Oakland", sales: 76, value: 7800000, coordinates: [-122.2711, 37.8044] },
              { city: "Fresno", sales: 54, value: 4100000, coordinates: [-119.7871, 36.7378] },
            ],
            recentTransactions: [
              {
                id: "TXN-001",
                property: "520 ACR Mixed Licensed Greenhouse",
                client: "Green Valley Corp",
                agent: "AJ Rana",
                amount: 9990000,
                date: "2024-12-15",
                status: "completed",
                type: "sale",
              },
              {
                id: "TXN-002",
                property: "Luxury Downtown Condo",
                client: "Sarah Williams",
                agent: "Mike Johnson",
                amount: 1250000,
                date: "2024-12-14",
                status: "pending",
                type: "sale",
              },
              {
                id: "TXN-003",
                property: "Commercial Office Building",
                client: "Tech Solutions Inc",
                agent: "Lisa Chen",
                amount: 4500000,
                date: "2024-12-13",
                status: "completed",
                type: "lease",
              },
              {
                id: "TXN-004",
                property: "Suburban Family Home",
                client: "Johnson Family",
                agent: "David Brown",
                amount: 750000,
                date: "2024-12-12",
                status: "completed",
                type: "sale",
              },
              {
                id: "TXN-005",
                property: "Industrial Warehouse",
                client: "Logistics Plus",
                agent: "Emma Davis",
                amount: 2300000,
                date: "2024-12-11",
                status: "in-progress",
                type: "sale",
              },
            ],
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-green-100 text-green-800 border-green-200"
      case "lease":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  const pieData = [
    { name: "Residential", value: 45, amount: 15200000 },
    { name: "Commercial", value: 30, amount: 12800000 },
    { name: "Industrial", value: 15, amount: 8400000 },
    { name: "Land", value: 10, amount: 4600000 },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-12 pt-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your real estate business.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            Add Property
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Properties */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 text-xs font-semibold">+12%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Total Properties</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(dashboardData.adminStats.totalProperties)}
            </p>
            <p className="text-gray-500 text-xs">Active listings</p>
          </div>
        </div>

        {/* Total Clients */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 text-xs font-semibold">+18%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Total Clients</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(dashboardData.adminStats.totalClients)}
            </p>
            <p className="text-gray-500 text-xs">Registered users</p>
          </div>
        </div>

        {/* Total Agents */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 text-xs font-semibold">+5%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Total Agents</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(dashboardData.adminStats.totalAgents)}
            </p>
            <p className="text-gray-500 text-xs">Active agents</p>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 text-xs font-semibold">+24%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatPrice(dashboardData.adminStats.monthlyRevenue)}
            </p>
            <p className="text-gray-500 text-xs">This month</p>
          </div>
        </div>

        {/* Commercial Loans */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 text-xs font-semibold">+8%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-1">Commercial Loans</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(dashboardData.adminStats.commercialLoans)}
            </p>
            <p className="text-gray-500 text-xs">Active loans</p>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Sales Analytics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sales Analytics</h3>
              <p className="text-gray-600 text-sm">Monthly sales performance and revenue</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dashboardData.salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis yAxisId="left" stroke="#666" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" fill="#6366f1" name="Sales Count" radius={[4, 4, 0, 0]} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Revenue ($)"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Revenue by Type</h3>
              <p className="text-gray-600 text-sm">Property type performance</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <RechartsPieChart data={pieData}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </RechartsPieChart>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sales by Location</h3>
            <p className="text-gray-600 text-sm">Geographic distribution of sales performance</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VectorMap locationData={dashboardData.locationData} />
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Cities</h4>
            {dashboardData.locationData.map((location, index) => (
              <div
                key={location.city}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-500" : "bg-blue-500"}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{location.city}</p>
                    <p className="text-xs text-gray-600">{location.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">{formatPrice(location.value)}</p>
                  <p className="text-xs text-gray-600">Total value</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Transactions</h3>
              <p className="text-gray-600 text-sm">Latest property transactions and deals</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                View All
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Card Layout */}
        <div className="block lg:hidden">
          <div className="divide-y divide-gray-100">
            {dashboardData.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono text-blue-600 font-semibold mb-1">{transaction.id}</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{transaction.property}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Client</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{transaction.client}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Agent</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{transaction.agent}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount</p>
                    <p className="text-sm font-bold text-gray-900">{formatPrice(transaction.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
                    <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}
                  >
                    {transaction.status}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getTypeColor(transaction.type)}`}
                  >
                    {transaction.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dashboardData.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-blue-600 font-semibold">{transaction.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-semibold text-gray-900 truncate">{transaction.property}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{transaction.client}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{transaction.agent}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-gray-900">{formatPrice(transaction.amount)}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getTypeColor(transaction.type)}`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
