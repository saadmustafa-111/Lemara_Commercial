"use client"
import { useState, useEffect, useMemo } from "react"
import { Search, Building, Home, Star, Heart, RefreshCw } from "lucide-react"

interface Property {
  id: number
  name: string
  address: string
  type: string
  subType: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  status: "active" | "pending" | "sold"
  featured: boolean
  image: string
  location: string
  rating: number
  listedDate: string
}

export default function PropertyOverviewTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const rowsPerPageOptions = [5, 10, 15, 20, 25]

  useEffect(() => {
    const fetchProperties = async () => {
      setTimeout(() => {
        const mockProperties: Property[] = [
          {
            id: 1,
            name: "Sunset Villa",
            address: "123 Ocean Drive, Malibu, CA",
            type: "Residential",
            subType: "Single Family Home",
            price: 1250000,
            area: 2500,
            bedrooms: 4,
            bathrooms: 3,
            status: "active",
            featured: true,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
            location: "Malibu, CA",
            rating: 4.8,
            listedDate: "Jan 15, 2023",
          },
          {
            id: 2,
            name: "Downtown Loft",
            address: "456 Main St, Los Angeles, CA",
            type: "Residential",
            subType: "Condo",
            price: 750000,
            area: 1200,
            bedrooms: 2,
            bathrooms: 2,
            status: "pending",
            featured: true,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
            location: "Los Angeles, CA",
            rating: 4.5,
            listedDate: "Feb 10, 2023",
          },
          {
            id: 3,
            name: "Harvest Acres",
            address: "789 Rural Route, Fresno, CA",
            type: "Agriculture",
            subType: "Farm Land",
            price: 2000000,
            area: 50000,
            bedrooms: 0,
            bathrooms: 0,
            status: "active",
            featured: false,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
            location: "Fresno, CA",
            rating: 4.2,
            listedDate: "Mar 5, 2023",
          },
          {
            id: 4,
            name: "Wellness Center",
            address: "101 Health Blvd, San Diego, CA",
            type: "Healthcare and Fitness",
            subType: "Medical Office",
            price: 3500000,
            area: 8000,
            bedrooms: 0,
            bathrooms: 4,
            status: "sold",
            featured: false,
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
            location: "San Diego, CA",
            rating: 4.9,
            listedDate: "Dec 12, 2022",
          },
          {
            id: 5,
            name: "Gourmet Restaurant",
            address: "202 Culinary Ave, San Francisco, CA",
            type: "Residents and Foods",
            subType: "Restaurant",
            price: 1800000,
            area: 3500,
            bedrooms: 0,
            bathrooms: 2,
            status: "active",
            featured: true,
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
            location: "San Francisco, CA",
            rating: 4.7,
            listedDate: "Apr 20, 2023",
          },
          {
            id: 6,
            name: "Retail Plaza",
            address: "303 Shopping Center Rd, Sacramento, CA",
            type: "Real Estate",
            subType: "Commercial",
            price: 4200000,
            area: 12000,
            bedrooms: 0,
            bathrooms: 6,
            status: "pending",
            featured: false,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
            location: "Sacramento, CA",
            rating: 4.4,
            listedDate: "May 15, 2023",
          },
          {
            id: 7,
            name: "Mountain Retreat",
            address: "555 Pine Ridge, Lake Tahoe, CA",
            type: "Residential",
            subType: "Cabin",
            price: 950000,
            area: 1800,
            bedrooms: 3,
            bathrooms: 2,
            status: "sold",
            featured: true,
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
            location: "Lake Tahoe, CA",
            rating: 4.6,
            listedDate: "Jun 1, 2023",
          },
          {
            id: 8,
            name: "Organic Farm",
            address: "777 Green Valley Rd, Napa, CA",
            type: "Agriculture",
            subType: "Vineyard",
            price: 5500000,
            area: 75000,
            bedrooms: 0,
            bathrooms: 0,
            status: "pending",
            featured: false,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            location: "Napa, CA",
            rating: 4.8,
            listedDate: "Jul 20, 2023",
          },
        ]

        setProperties(mockProperties)
        setIsLoading(false)
      }, 1000)
    }

    fetchProperties()
  }, [])

  // Filter and paginate data
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || property.status === filterStatus
      const matchesType = filterType === "all" || property.type === filterType
      return matchesSearch && matchesStatus && matchesType
    })
  }, [properties, searchTerm, filterStatus, filterType])

  // Group properties by featured status
  const groupedProperties = useMemo(() => {
    const featured = filteredProperties.filter((p) => p.featured)
    const normal = filteredProperties.filter((p) => !p.featured)
    return { featured, normal }
  }, [filteredProperties])

  const totalPages = Math.ceil(filteredProperties.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, rowsPerPage])

  const formatCurrency = (amount: number) => {
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

  const renderPropertyTable = (title: string, properties: Property[], isFeatured: boolean) => {
    if (properties.length === 0) return null

    // Group by status
    const activeProperties = properties.filter((p) => p.status === "active")
    const pendingProperties = properties.filter((p) => p.status === "pending")
    const soldProperties = properties.filter((p) => p.status === "sold")

    return (
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 via-[#00a0d1]/10 to-[#00a0d1]/20 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 ${isFeatured ? "bg-[#00a0d1]" : "bg-gray-400"} rounded-lg flex items-center justify-center`}
              >
                {isFeatured ? <Heart className="w-4 h-4 text-white" /> : <Building className="w-4 h-4 text-white" />}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <span className="text-sm text-gray-600">({properties.length} properties)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 via-[#00a0d1]/5 to-[#00a0d1]/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>Property Details</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4" />
                      <span>Property Type</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                        Sold
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {/* Group properties by type and subtype */}
                {Array.from(new Set(properties.map((p) => `${p.type}|${p.subType}`))).map((typeSubType) => {
                  const [type, subType] = typeSubType.split("|")
                  const typeProperties = properties.filter((p) => p.type === type && p.subType === subType)
                  const activeCount = typeProperties.filter((p) => p.status === "active")
                  const pendingCount = typeProperties.filter((p) => p.status === "pending")
                  const soldCount = typeProperties.filter((p) => p.status === "sold")

                  return (
                    <tr
                      key={typeSubType}
                      className="hover:bg-gradient-to-r hover:from-[#00a0d1]/5 hover:to-[#00a0d1]/10 transition-all duration-300 group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <img
                              src={typeProperties[0]?.image || "/placeholder.svg?height=400&width=600"}
                              alt={type}
                              className="w-full h-full rounded-2xl object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-bold text-gray-900 group-hover:text-[#00a0d1] transition-colors">
                              {type}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{subType}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {typeProperties.length} propert{typeProperties.length === 1 ? "y" : "ies"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-[#00a0d1]/10 text-[#00a0d1] border border-[#00a0d1]/20">
                            {type}
                          </span>
                          <div className="text-sm text-gray-600">{subType}</div>
                          <div className="text-xs text-gray-500">
                            Price range: {formatCurrency(Math.min(...typeProperties.map((p) => p.price)))} -{" "}
                            {formatCurrency(Math.max(...typeProperties.map((p) => p.price)))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-emerald-600">{activeCount.length}</div>
                          {activeCount.length > 0 && (
                            <div className="space-y-1">
                              {activeCount.slice(0, 2).map((property) => (
                                <div key={property.id} className="text-xs text-gray-600 truncate max-w-[120px]">
                                  {property.name}
                                </div>
                              ))}
                              {activeCount.length > 2 && (
                                <div className="text-xs text-gray-500">+{activeCount.length - 2} more</div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-amber-600">{pendingCount.length}</div>
                          {pendingCount.length > 0 && (
                            <div className="space-y-1">
                              {pendingCount.slice(0, 2).map((property) => (
                                <div key={property.id} className="text-xs text-gray-600 truncate max-w-[120px]">
                                  {property.name}
                                </div>
                              ))}
                              {pendingCount.length > 2 && (
                                <div className="text-xs text-gray-500">+{pendingCount.length - 2} more</div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-600">{soldCount.length}</div>
                          {soldCount.length > 0 && (
                            <div className="space-y-1">
                              {soldCount.slice(0, 2).map((property) => (
                                <div key={property.id} className="text-xs text-gray-600 truncate max-w-[120px]">
                                  {property.name}
                                </div>
                              ))}
                              {soldCount.length > 2 && (
                                <div className="text-xs text-gray-500">+{soldCount.length - 2} more</div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#00a0d1] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <Building className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Property Overview</h1>
            <p className="text-gray-600 mt-1">Browse and manage your property listings by category and status</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
            placeholder="Search properties..."
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
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Healthcare and Fitness">Healthcare and Fitness</option>
              <option value="Residents and Foods">Residents and Foods</option>
              <option value="Residential">Residential</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            {isLoading ? "Loading..." : `${filteredProperties.length} of ${properties.length} properties`}
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#00a0d1] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <span className="text-gray-600 font-medium text-lg mt-4">Loading properties...</span>
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="space-y-8">
          {/* Featured Properties Table */}
          {groupedProperties.featured.length > 0 &&
            renderPropertyTable("Featured Properties", groupedProperties.featured, true)}

          {/* Normal Properties Table */}
          {groupedProperties.normal.length > 0 &&
            renderPropertyTable("Standard Properties", groupedProperties.normal, false)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-gradient-to-br from-[#00a0d1]/20 to-[#00a0d1]/30 rounded-3xl flex items-center justify-center shadow-lg">
            <Building className="w-12 h-12 text-[#00a0d1]" />
          </div>
          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-gray-900 mb-2">
              {searchTerm ? "No matching properties found" : "No properties found"}
            </p>
            <p className="text-base text-gray-600 mb-6 max-w-md">
              {searchTerm
                ? `No properties match "${searchTerm}". Try adjusting your search.`
                : "Get started by adding your first property to your portfolio."}
            </p>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      {!isLoading && filteredProperties.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-t border-gray-200 rounded-xl mt-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00a0d1]">{groupedProperties.featured.length}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{groupedProperties.normal.length}</div>
                <div className="text-sm text-gray-600">Standard</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {filteredProperties.filter((p) => p.status === "active").length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {filteredProperties.filter((p) => p.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {filteredProperties.filter((p) => p.status === "sold").length}
                </div>
                <div className="text-sm text-gray-600">Sold</div>
              </div>
            </div>

            <div className="text-sm text-gray-700 font-medium">
              Total Properties: <span className="font-bold text-[#00a0d1]">{filteredProperties.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
