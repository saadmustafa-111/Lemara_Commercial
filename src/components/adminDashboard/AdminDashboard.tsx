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
  }
  recentProperties: Property[]
  topAgents: Agent[]
  recentActivity: Array<{
    id: number
    type: string
    message: string
    time: string
    user: string
  }>
}

export default function RealEstateAdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

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
    },
    recentProperties: [],
    topAgents: [],
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

  const { adminStats, recentProperties, topAgents, recentActivity } = dashboardData

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
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800 border-gray-200"
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.totalProperties}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+12%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Listings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.activeListings}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+8%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{formatPrice(adminStats.monthlyRevenue)}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+15%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{adminStats.totalSales}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 text-sm font-medium ml-1">+22%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width Layout */}
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
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 transition-all">
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
                  className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-gray-50 hover:bg-white"
                >
                  {/* Property Image and Basic Info */}
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      {property.featured && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 font-semibold text-lg mb-1">{property.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{property.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
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
                    <p className="text-sm text-gray-500">Commission: {formatPrice(property.commission)}</p>
                  </div>

                  {/* Status */}
                  <div className="px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(property.status)}`}
                    >
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>

                  {/* Agent and Date */}
                  <div className="px-6 text-center">
                    <p className="text-gray-900 font-medium">{property.agent}</p>
                    <p className="text-sm text-gray-500">{formatDate(property.created)}</p>
                  </div>

                  {/* Views */}
                  <div className="px-6 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{property.views}</span>
                    </div>
                    <p className="text-xs text-gray-500">views</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pl-6">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">Showing 5 of {adminStats.totalProperties} properties</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                  <span>View All Properties</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Agents and Other Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Agents - Larger Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Top Performing Agents</h3>
                <p className="text-gray-600 text-sm mt-1">This month's leaders</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topAgents.map((agent, index) => (
                    <div
                      key={agent.id}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-gray-50 hover:bg-white"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="relative">
                          <img
                            src={agent.avatar || "/placeholder.svg"}
                            alt={agent.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-gray-900 font-semibold">{agent.name}</h4>
                          <p className="text-sm text-gray-600">{agent.properties} properties</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm font-medium text-gray-900">{agent.sales} sales</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-amber-400 fill-current" />
                              <span className="text-sm text-gray-600">{agent.rating}</span>
                            </div>
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
          </div>

          {/* Right Sidebar Content */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Pending Deals</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{adminStats.pendingDeals}</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
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
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group">
                    <Plus className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-900 text-sm font-medium">Add Property</p>
                  </button>

                  <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group">
                    <Users className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-900 text-sm font-medium">Add Agent</p>
                  </button>

                  <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group">
                    <FileText className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-900 text-sm font-medium">Reports</p>
                  </button>

                  <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group">
                    <Download className="w-5 h-5 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-900 text-sm font-medium">Export</p>
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
