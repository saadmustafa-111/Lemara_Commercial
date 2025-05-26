"use client"
import { useEffect, useState } from "react"
import {
  Users,
  Building,
  TrendingUp,
  MapPin,
  Eye,
  Edit,
  Plus,
  Filter,
  DollarSign,
  Star,
  Mail,
  Home,
  Briefcase,
  Factory,
  TreePine,
  ChevronRight,
  Activity,
  Target,
  ArrowUpRight,
  Clock,
  CheckCircle,
  MoreHorizontal,
  Download,
  FileText,
  Phone,
  Calendar,
  UserCheck,
  MessageSquare,
  Search,
  Bell,
  Settings,
  BarChart3,
} from "lucide-react"

// Define types for our real estate dashboard data
interface Property {
  id: number
  title: string
  type: string
  price: number
  location: string
  image: string
  status: string
  agent: string
  created: string
  views: number
  bedrooms: number
  bathrooms: number
  area: number
  featured?: boolean
  commission: number
}

interface Agent {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  properties: number
  sales: number
  revenue: number
  joined: string
  status: string
  rating: number
  commission: number
  specialization: string
  experience: number
  closingRate: number
}

interface Client {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  type: string
  budget: number
  location: string
  requirements: string
  status: string
  assignedAgent: string
  lastContact: string
  priority: string
  propertiesViewed: number
  source: string
}

interface DashboardData {
  adminStats: {
    totalProperties: number
    totalAgents: number
    totalSales: number
    activeListings: number
    monthlyRevenue: number
    avgPrice: number
    pendingDeals: number
    viewsThisMonth: number
    totalClients: number
    activeClients: number
  }
  recentProperties: Property[]
  topAgents: Agent[]
  recentClients: Client[]
  recentActivity: Array<{
    id: number
    type: string
    message: string
    time: string
    user: string
  }>
}

export default function EnhancedRealEstateAdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the real estate dashboard with proper typing
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    adminStats: {
      totalProperties: 0,
      totalAgents: 0,
      totalSales: 0,
      activeListings: 0,
      monthlyRevenue: 0,
      avgPrice: 0,
      pendingDeals: 0,
      viewsThisMonth: 0,
      totalClients: 0,
      activeClients: 0,
    },
    recentProperties: [],
    topAgents: [],
    recentClients: [],
    recentActivity: [],
  })

  // Simulate fetching data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setTimeout(() => {
          setDashboardData({
            adminStats: {
              totalProperties: 178,
              totalAgents: 24,
              totalSales: 48,
              activeListings: 94,
              monthlyRevenue: 425000,
              avgPrice: 875000,
              pendingDeals: 12,
              viewsThisMonth: 15420,
              totalClients: 156,
              activeClients: 89,
            },
            recentProperties: [
              {
                id: 100079,
                title: "520 ACR Mixed Licensed Greenhouse",
                type: "Land",
                price: 9990000,
                location: "Lake Nacimiento, CA",
                image: "/placeholder.svg?height=80&width=120",
                status: "active",
                agent: "AJ Rana",
                created: "2024-01-15",
                views: 542,
                bedrooms: 0,
                bathrooms: 0,
                area: 520,
                featured: true,
                commission: 299700,
              },
              {
                id: 100100,
                title: "Licensed Cannabis Farm Facility",
                type: "Farm",
                price: 7750000,
                location: "Salinas, CA",
                image: "/placeholder.svg?height=80&width=120",
                status: "sold",
                agent: "AJ Rana",
                created: "2024-01-10",
                views: 868,
                bedrooms: 0,
                bathrooms: 0,
                area: 0,
                commission: 232500,
              },
              {
                id: 100104,
                title: "Established Deli Cafe Business",
                type: "Commercial",
                price: 89000,
                location: "Newark, CA",
                image: "/placeholder.svg?height=80&width=120",
                status: "active",
                agent: "Sarah Johnson",
                created: "2024-01-08",
                views: 866,
                bedrooms: 0,
                bathrooms: 0,
                area: 0,
                commission: 2670,
              },
              {
                id: 100135,
                title: "Assisted Living Facility",
                type: "Commercial",
                price: 9750000,
                location: "Sacramento, CA",
                image: "/placeholder.svg?height=80&width=120",
                status: "pending",
                agent: "Abdul Shah",
                created: "2024-01-05",
                views: 234,
                bedrooms: 0,
                bathrooms: 0,
                area: 0,
                commission: 292500,
              },
              {
                id: 100238,
                title: "Multi-Family Investment Property",
                type: "Multi-Family",
                price: 35449230,
                location: "San Francisco, CA",
                image: "/placeholder.svg?height=80&width=120",
                status: "active",
                agent: "AJ Rana",
                created: "2024-01-01",
                views: 1205,
                bedrooms: 24,
                bathrooms: 18,
                area: 14500,
                featured: true,
                commission: 1063477,
              },
            ],
            topAgents: [
              {
                id: 1,
                name: "AJ Rana",
                email: "aj.rana@lemara.com",
                phone: "(555) 123-4567",
                avatar: "/placeholder.svg?height=40&width=40",
                properties: 42,
                sales: 18,
                revenue: 2450000,
                joined: "2019-07-15",
                status: "active",
                rating: 4.9,
                commission: 73500,
                specialization: "Commercial & Industrial",
                experience: 8,
                closingRate: 85,
              },
              {
                id: 2,
                name: "Sarah Johnson",
                email: "sarah.j@lemara.com",
                phone: "(555) 234-5678",
                avatar: "/placeholder.svg?height=40&width=40",
                properties: 28,
                sales: 12,
                revenue: 1890000,
                joined: "2022-03-10",
                status: "active",
                rating: 4.8,
                commission: 56700,
                specialization: "Luxury Residential",
                experience: 5,
                closingRate: 78,
              },
              {
                id: 3,
                name: "Abdul Shah",
                email: "abdul.s@lemara.com",
                phone: "(555) 345-6789",
                avatar: "/placeholder.svg?height=40&width=40",
                properties: 15,
                sales: 8,
                revenue: 1250000,
                joined: "2022-05-20",
                status: "active",
                rating: 4.7,
                commission: 37500,
                specialization: "Investment Properties",
                experience: 6,
                closingRate: 82,
              },
              {
                id: 4,
                name: "Michael Chen",
                email: "michael.c@lemara.com",
                phone: "(555) 456-7890",
                avatar: "/placeholder.svg?height=40&width=40",
                properties: 22,
                sales: 10,
                revenue: 1680000,
                joined: "2021-11-05",
                status: "active",
                rating: 4.6,
                commission: 50400,
                specialization: "Multi-Family",
                experience: 7,
                closingRate: 75,
              },
            ],
            recentClients: [
              {
                id: 1,
                name: "Robert Martinez",
                email: "robert.m@email.com",
                phone: "(555) 987-6543",
                avatar: "/placeholder.svg?height=40&width=40",
                type: "Buyer",
                budget: 2500000,
                location: "San Francisco, CA",
                requirements: "Commercial office space, downtown area",
                status: "active",
                assignedAgent: "AJ Rana",
                lastContact: "2024-01-20",
                priority: "high",
                propertiesViewed: 8,
                source: "Website",
              },
              {
                id: 2,
                name: "Jennifer Wilson",
                email: "jennifer.w@email.com",
                phone: "(555) 876-5432",
                avatar: "/placeholder.svg?height=40&width=40",
                type: "Seller",
                budget: 0,
                location: "Sacramento, CA",
                requirements: "Selling luxury residential property",
                status: "negotiating",
                assignedAgent: "Sarah Johnson",
                lastContact: "2024-01-19",
                priority: "high",
                propertiesViewed: 0,
                source: "Referral",
              },
              {
                id: 3,
                name: "David Thompson",
                email: "david.t@email.com",
                phone: "(555) 765-4321",
                avatar: "/placeholder.svg?height=40&width=40",
                type: "Investor",
                budget: 5000000,
                location: "Bay Area, CA",
                requirements: "Multi-family investment properties",
                status: "active",
                assignedAgent: "Michael Chen",
                lastContact: "2024-01-18",
                priority: "medium",
                propertiesViewed: 12,
                source: "Cold Call",
              },
              {
                id: 4,
                name: "Lisa Anderson",
                email: "lisa.a@email.com",
                phone: "(555) 654-3210",
                avatar: "/placeholder.svg?height=40&width=40",
                type: "Buyer",
                budget: 1200000,
                location: "Oakland, CA",
                requirements: "Industrial warehouse space",
                status: "viewing",
                assignedAgent: "Abdul Shah",
                lastContact: "2024-01-17",
                priority: "medium",
                propertiesViewed: 5,
                source: "Social Media",
              },
              {
                id: 5,
                name: "James Rodriguez",
                email: "james.r@email.com",
                phone: "(555) 543-2109",
                avatar: "/placeholder.svg?height=40&width=40",
                type: "Seller",
                budget: 0,
                location: "San Jose, CA",
                requirements: "Selling tech startup office",
                status: "lead",
                assignedAgent: "Sarah Johnson",
                lastContact: "2024-01-16",
                priority: "low",
                propertiesViewed: 0,
                source: "Website",
              },
              {
                id: 6,
                name: "Maria Garcia",
                email: "maria.g@email.com",
                phone: "(555) 432-1098",
                avatar: "/placeholder.svg?height=40&width=40",
                type: "Investor",
                budget: 8000000,
                location: "Los Angeles, CA",
                requirements: "Large commercial developments",
                status: "active",
                assignedAgent: "AJ Rana",
                lastContact: "2024-01-15",
                priority: "high",
                propertiesViewed: 15,
                source: "Referral",
              },
            ],
            recentActivity: [
              {
                id: 1,
                type: "sale",
                message: "New sale completed for $2.5M commercial property",
                time: "2 hours ago",
                user: "AJ Rana",
              },
              {
                id: 2,
                type: "listing",
                message: "New property listed in downtown Sacramento",
                time: "4 hours ago",
                user: "Sarah Johnson",
              },
              {
                id: 3,
                type: "inquiry",
                message: "New client inquiry for industrial properties",
                time: "6 hours ago",
                user: "Abdul Shah",
              },
              {
                id: 4,
                type: "meeting",
                message: "Client meeting scheduled for tomorrow",
                time: "8 hours ago",
                user: "Michael Chen",
              },
            ],
          })
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const { adminStats, recentProperties, topAgents, recentClients, recentActivity } = dashboardData

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-emerald-100 text-emerald-800 border-emerald-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      sold: "bg-blue-100 text-blue-800 border-blue-200",
      negotiating: "bg-purple-100 text-purple-800 border-purple-200",
      viewing: "bg-orange-100 text-orange-800 border-orange-200",
      lead: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    }
    return styles[priority as keyof typeof styles] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getPropertyTypeIcon = (type: string) => {
    const icons = {
      commercial: <Briefcase className="w-4 h-4" />,
      land: <TreePine className="w-4 h-4" />,
      farm: <TreePine className="w-4 h-4" />,
      "multi-family": <Building className="w-4 h-4" />,
      industrial: <Factory className="w-4 h-4" />,
    }
    return icons[type.toLowerCase() as keyof typeof icons] || <Home className="w-4 h-4" />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-700 font-semibold text-lg">Loading Dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing your real estate insights</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Real Estate Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search properties, agents, clients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.totalProperties}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-medium ml-1">+12%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Listings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.activeListings}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-medium ml-1">+8%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{formatPrice(adminStats.monthlyRevenue)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-medium ml-1">+15%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.totalSales}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-medium ml-1">+22%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.totalClients}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-medium ml-1">+18%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.activeClients}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-medium ml-1">+25%</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
          <div className="p-6">
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "properties", label: "Properties", icon: Building },
                { id: "agents", label: "Agents", icon: Users },
                { id: "clients", label: "Clients", icon: UserCheck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Properties Table - Full Width */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Recent Properties</h3>
                    <p className="text-gray-600 text-sm mt-1">Latest commercial property listings</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl">
                      <Plus className="w-4 h-4" />
                      <span className="font-medium">Add Property</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentProperties.slice(0, 3).map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 group"
                    >
                      {/* Property Image and Basic Info */}
                      <div className="flex items-center space-x-6 flex-1 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                          />
                          {property.featured && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                              <Star className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 font-bold text-lg mb-2">{property.title}</h4>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{property.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getPropertyTypeIcon(property.type)}
                              <span>{property.type}</span>
                            </div>
                            {property.area > 0 && <span>{property.area.toLocaleString()} sqft</span>}
                          </div>
                        </div>
                      </div>

                      {/* Price and Commission */}
                      <div className="text-right px-6">
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</p>
                        <p className="text-sm text-emerald-600 font-medium">
                          Commission: {formatPrice(property.commission)}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="px-6">
                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(property.status)}`}
                        >
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </div>

                      {/* Agent and Date */}
                      <div className="px-6 text-center">
                        <p className="text-gray-900 font-semibold">{property.agent}</p>
                        <p className="text-sm text-gray-500">{formatDate(property.created)}</p>
                      </div>

                      {/* Views */}
                      <div className="px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 font-semibold">{property.views}</span>
                        </div>
                        <p className="text-xs text-gray-500">views</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pl-6">
                        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Showing 3 of {adminStats.totalProperties} properties</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                      <span>View All Properties</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Agents and Clients */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Agents */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Top Performing Agents</h3>
                  <p className="text-gray-600 text-sm mt-1">This month's leaders</p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {topAgents.slice(0, 3).map((agent, index) => (
                      <div
                        key={agent.id}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="relative">
                            <img
                              src={agent.avatar || "/placeholder.svg"}
                              alt={agent.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {index + 1}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h4 className="text-gray-900 font-semibold text-lg">{agent.name}</h4>
                            <p className="text-sm text-gray-600">{agent.specialization}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm font-medium text-gray-900">{agent.sales} sales</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-amber-400 fill-current" />
                                <span className="text-sm text-gray-600">{agent.rating}</span>
                              </div>
                              <span className="text-sm text-emerald-600">{agent.closingRate}% close rate</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{formatPrice(agent.revenue)}</p>
                          <p className="text-sm text-emerald-600">+{formatPrice(agent.commission)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Clients */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Recent Clients</h3>
                  <p className="text-gray-600 text-sm mt-1">Latest client interactions</p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {recentClients.slice(0, 3).map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <img
                            src={client.avatar || "/placeholder.svg"}
                            alt={client.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />

                          <div className="flex-1">
                            <h4 className="text-gray-900 font-semibold">{client.name}</h4>
                            <p className="text-sm text-gray-600">
                              {client.type} • {client.location}
                            </p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(client.status)}`}
                              >
                                {client.status}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(client.priority)}`}
                              >
                                {client.priority}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {client.budget > 0 && (
                            <p className="text-lg font-bold text-gray-900">{formatPrice(client.budget)}</p>
                          )}
                          <p className="text-sm text-gray-500">{client.assignedAgent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Properties</h3>
                  <p className="text-gray-600 text-sm mt-1">Manage your property listings</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl">
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Add Property</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 group"
                  >
                    {/* Property Image and Basic Info */}
                    <div className="flex items-center space-x-6 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                        />
                        {property.featured && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 font-bold text-lg mb-2">{property.title}</h4>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{property.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPropertyTypeIcon(property.type)}
                            <span>{property.type}</span>
                          </div>
                          {property.area > 0 && <span>{property.area.toLocaleString()} sqft</span>}
                        </div>
                      </div>
                    </div>

                    {/* Price and Commission */}
                    <div className="text-right px-6">
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</p>
                      <p className="text-sm text-emerald-600 font-medium">
                        Commission: {formatPrice(property.commission)}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="px-6">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(property.status)}`}
                      >
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>

                    {/* Agent and Date */}
                    <div className="px-6 text-center">
                      <p className="text-gray-900 font-semibold">{property.agent}</p>
                      <p className="text-sm text-gray-500">{formatDate(property.created)}</p>
                    </div>

                    {/* Views */}
                    <div className="px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-semibold">{property.views}</span>
                      </div>
                      <p className="text-xs text-gray-500">views</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pl-6">
                      <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "agents" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Agents</h3>
                  <p className="text-gray-600 text-sm mt-1">Manage your real estate agents</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl">
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Add Agent</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topAgents.map((agent, index) => (
                  <div
                    key={agent.id}
                    className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={agent.avatar || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-gray-200"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-gray-900 font-bold text-lg">{agent.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{agent.rating}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-3">{agent.specialization}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-500 text-xs">Properties</p>
                            <p className="text-gray-900 font-semibold">{agent.properties}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Sales</p>
                            <p className="text-gray-900 font-semibold">{agent.sales}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Experience</p>
                            <p className="text-gray-900 font-semibold">{agent.experience} years</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Close Rate</p>
                            <p className="text-emerald-600 font-semibold">{agent.closingRate}%</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-xs">Revenue</p>
                            <p className="text-gray-900 font-bold">{formatPrice(agent.revenue)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Clients</h3>
                  <p className="text-gray-600 text-sm mt-1">Manage your client relationships</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl">
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Add Client</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={client.avatar || "/placeholder.svg"}
                        alt={client.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                      />

                      <div className="flex-1">
                        <h4 className="text-gray-900 font-bold text-lg mb-1">{client.name}</h4>
                        <p className="text-gray-600 text-sm">{client.type}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(client.status)}`}
                          >
                            {client.status}
                          </span>
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(client.priority)}`}
                          >
                            {client.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{client.location}</span>
                      </div>
                      {client.budget > 0 && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>Budget: {formatPrice(client.budget)}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Last contact: {formatDate(client.lastContact)}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-500 text-sm">Assigned Agent</span>
                        <span className="text-gray-900 font-medium text-sm">{client.assignedAgent}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-500 text-sm">Properties Viewed</span>
                        <span className="text-gray-900 font-medium text-sm">{client.propertiesViewed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Source</span>
                        <span className="text-gray-900 font-medium text-sm">{client.source}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar - Always visible */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3"></div>
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Pending Deals</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{adminStats.pendingDeals}</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Avg. Price</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">{formatPrice(adminStats.avgPrice)}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === "sale" && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                        {activity.type === "listing" && <Plus className="w-4 h-4 text-blue-600" />}
                        {activity.type === "inquiry" && <Mail className="w-4 h-4 text-purple-600" />}
                        {activity.type === "meeting" && <Calendar className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm font-medium">{activity.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-600 text-xs">{activity.user}</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-600 text-xs">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl transition-all group">
                    <Plus className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-blue-900 text-sm font-medium">Add Property</p>
                  </button>

                  <button className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200 rounded-xl transition-all group">
                    <Users className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-emerald-900 text-sm font-medium">Add Agent</p>
                  </button>

                  <button className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-xl transition-all group">
                    <FileText className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-purple-900 text-sm font-medium">Reports</p>
                  </button>

                  <button className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-xl transition-all group">
                    <Download className="w-5 h-5 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-orange-900 text-sm font-medium">Export</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
