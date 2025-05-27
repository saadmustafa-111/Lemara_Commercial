"use client"
import { useState, useEffect, useMemo } from "react"
import { Search, Filter, Edit, Trash2, Eye, MoreHorizontal, UserPlus, DollarSign, Building, Calendar, Mail, Phone, MapPin, Star, Heart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RefreshCw } from 'lucide-react'

interface Client {
  id: number
  name: string
  email: string
  phone: string
  type: string
  totalSpent: number
  properties: number
  joinDate: string
  status: string
  avatar: string
  location: string
  rating: number
  lastActivity: string
  preferredAgent: string
  budget: number
}

export default function EnhancedClientsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const rowsPerPageOptions = [5, 10, 15, 20, 25]

  useEffect(() => {
    const fetchClients = async () => {
      setTimeout(() => {
        const mockClients: Client[] = [
          {
            id: 1,
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "+1 (555) 123-4567",
            type: "Buyer",
            totalSpent: 1250000,
            properties: 2,
            joinDate: "Jan 15, 2023",
            status: "active",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
            location: "Los Angeles, CA",
            rating: 4.8,
            lastActivity: "2 days ago",
            preferredAgent: "AJ Rana",
            budget: 2000000,
          },
          {
            id: 2,
            name: "Sarah Williams",
            email: "sarah.williams@email.com",
            phone: "+1 (555) 234-5678",
            type: "Seller",
            totalSpent: 0,
            properties: 1,
            joinDate: "Mar 8, 2023",
            status: "active",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
            location: "San Francisco, CA",
            rating: 4.9,
            lastActivity: "1 day ago",
            preferredAgent: "Sarah Johnson",
            budget: 0,
          },
          {
            id: 3,
            name: "Michael Johnson",
            email: "michael.johnson@email.com",
            phone: "+1 (555) 345-6789",
            type: "Investor",
            totalSpent: 3200000,
            properties: 5,
            joinDate: "Nov 22, 2022",
            status: "active",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
            location: "San Diego, CA",
            rating: 4.7,
            lastActivity: "5 hours ago",
            preferredAgent: "Emily Chen",
            budget: 5000000,
          },
          {
            id: 4,
            name: "Emily Davis",
            email: "emily.davis@email.com",
            phone: "+1 (555) 456-7890",
            type: "Buyer",
            totalSpent: 750000,
            properties: 1,
            joinDate: "Jun 10, 2023",
            status: "inactive",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
            location: "Sacramento, CA",
            rating: 4.5,
            lastActivity: "2 weeks ago",
            preferredAgent: "Abdul Shah",
            budget: 900000,
          },
          {
            id: 5,
            name: "Robert Brown",
            email: "robert.brown@email.com",
            phone: "+1 (555) 567-8901",
            type: "Seller",
            totalSpent: 0,
            properties: 2,
            joinDate: "Feb 14, 2023",
            status: "active",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
            location: "Oakland, CA",
            rating: 4.6,
            lastActivity: "3 days ago",
            preferredAgent: "AJ Rana",
            budget: 0,
          },
          {
            id: 6,
            name: "Lisa Anderson",
            email: "lisa.anderson@email.com",
            phone: "+1 (555) 678-9012",
            type: "Investor",
            totalSpent: 4500000,
            properties: 8,
            joinDate: "Aug 5, 2022",
            status: "active",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
            location: "Fresno, CA",
            rating: 4.9,
            lastActivity: "1 hour ago",
            preferredAgent: "Sarah Johnson",
            budget: 10000000,
          },
        ]

        setClients(mockClients)
        setIsLoading(false)
      }, 1000)
    }

    fetchClients()
  }, [])

  // Filter and paginate data
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.preferredAgent.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || client.status === filterStatus
      const matchesType = filterType === "all" || client.type === filterType
      return matchesSearch && matchesStatus && matchesType
    })
  }, [clients, searchTerm, filterStatus, filterType])

  const totalPages = Math.ceil(filteredClients.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, rowsPerPage])

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    )
  }

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToFirstPage = () => goToPage(1)
  const goToLastPage = () => goToPage(totalPages)
  const goToPreviousPage = () => goToPage(currentPage - 1)
  const goToNextPage = () => goToPage(currentPage + 1)

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#00a0d1] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Clients Management</h1>
            <p className="text-gray-600 mt-1">Manage your clients and track their property transactions</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center px-6 py-3 bg-[#00a0d1] text-white font-medium rounded-xl hover:bg-[#008bb8] focus:outline-none focus:ring-4 focus:ring-[#00a0d1]/30 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
            <UserPlus className="w-5 h-5 mr-2" />
            Add Client
          </button>

          <button
            disabled={isLoading}
            className="inline-flex items-center px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none transition-all duration-200 hover:scale-105 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] transition-all duration-200"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="Investor">Investor</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Show:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} rows
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            {isLoading ? "Loading..." : `${filteredClients.length} of ${clients.length} clients`}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 via-[#00a0d1]/10 to-[#00a0d1]/20">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00a0d1] rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span>Client Details</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Type & Rating</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Financial</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Agent & Location</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center justify-center space-x-2">
                    <MoreHorizontal className="w-4 h-4" />
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-[#00a0d1] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                      </div>
                      <span className="text-gray-600 font-medium text-lg">Loading clients...</span>
                    </div>
                  </td>
                </tr>
              ) : currentClients.length > 0 ? (
                currentClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gradient-to-r hover:from-[#00a0d1]/5 hover:to-[#00a0d1]/10 transition-all duration-300 group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative">
                          <img
                            src={client.avatar || "/placeholder.svg"}
                            alt={client.name}
                            className="w-full h-full rounded-2xl object-cover"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${client.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                          ></div>
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-bold text-gray-900 group-hover:text-[#00a0d1] transition-colors">
                            {client.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail className="w-4 h-4 mr-1" />
                            {client.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="w-4 h-4 mr-1" />
                            {client.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="space-y-2">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-[#00a0d1]/10 text-[#00a0d1] border border-[#00a0d1]/20">
                          {client.type}
                        </span>
                        {renderStars(client.rating)}
                        <div className="text-xs text-gray-600">Last: {client.lastActivity}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-bold text-gray-900">{formatCurrency(client.budget)}</span>
                        </div>
                        <div className="text-xs text-gray-600">Budget</div>
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{client.properties} Properties</span>
                        </div>
                        <div className="text-sm font-bold text-green-600">{formatCurrency(client.totalSpent)}</div>
                        <div className="text-xs text-gray-600">Total Spent</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{client.preferredAgent}</div>
                        <div className="text-xs text-gray-600">Preferred Agent</div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{client.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          Joined {client.joinDate}
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${client.status === "active" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-gray-100 text-gray-800 border border-gray-200"}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${client.status === "active" ? "bg-emerald-500" : "bg-gray-500"}`}
                          ></div>
                          {client.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="inline-flex items-center p-3 rounded-xl text-[#00a0d1] hover:bg-[#00a0d1]/10 transition-all duration-200 hover:scale-110 group/view border border-[#00a0d1]/20 shadow-sm hover:shadow-md">
                          <Eye className="w-5 h-5 group-hover/view:scale-110 transition-transform" />
                        </button>
                        <button className="inline-flex items-center p-3 rounded-xl text-emerald-600 hover:bg-emerald-100 transition-all duration-200 hover:scale-110 group/edit border border-emerald-200 shadow-sm hover:shadow-md">
                          <Edit className="w-5 h-5 group-hover/edit:rotate-12 transition-transform" />
                        </button>
                        <button className="inline-flex items-center p-3 rounded-xl text-red-600 hover:bg-red-100 transition-all duration-200 hover:scale-110 group/delete border border-red-200 shadow-sm hover:shadow-md">
                          <Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#00a0d1]/20 to-[#00a0d1]/30 rounded-3xl flex items-center justify-center shadow-lg">
                        <Heart className="w-12 h-12 text-[#00a0d1]" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-2">
                          {searchTerm ? "No matching clients found" : "No clients found"}
                        </p>
                        <p className="text-base text-gray-600 mb-6 max-w-md">
                          {searchTerm
                            ? `No clients match "${searchTerm}". Try adjusting your search.`
                            : "Get started by adding your first client to manage your customer relationships."}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && filteredClients.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-700 font-medium">
                  Showing <span className="font-bold text-[#00a0d1]">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-[#00a0d1]">{Math.min(endIndex, filteredClients.length)}</span> of{" "}
                  <span className="font-bold text-[#00a0d1]">{filteredClients.length}</span> results
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border-2 border-gray-300 text-gray-500 hover:text-[#00a0d1] hover:border-[#00a0d1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <ChevronsLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border-2 border-gray-300 text-gray-500 hover:text-[#00a0d1] hover:border-[#00a0d1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm ${
                          currentPage === pageNumber
                            ? "bg-[#00a0d1] text-white shadow-lg"
                            : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#00a0d1] hover:text-[#00a0d1]"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border-2 border-gray-300 text-gray-500 hover:text-[#00a0d1] hover:border-[#00a0d1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border-2 border-gray-300 text-gray-500 hover:text-[#00a0d1] hover:border-[#00a0d1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <ChevronsRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
