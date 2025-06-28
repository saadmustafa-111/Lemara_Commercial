"use client"
import { useState, useEffect, useMemo } from "react"
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
} from "lucide-react"

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  createdAt: string
  isActive: boolean
  title?: string
  country?: string
  state?: string
  city?: string
  address?: string
  zipcode?: string
  companyTitle?: string
  website?: string
  avatar?: string // Keeping this for UI purposes
}

export default function ContactsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const rowsPerPageOptions = [5, 10, 15, 20, 25]

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true)
        
        try {
          // Fetch from the actual backend API
          const response = await fetch('https://lemara-9829c937fd90.herokuapp.com/contacts/admin/all', { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            
            // Add avatar field for UI if missing and ensure all required fields have default values
            const contactsWithAvatars = data.map((contact: any) => ({
              id: contact.id || 0,
              firstName: contact.firstName || "",
              lastName: contact.lastName || "",
              email: contact.email || "",
              mobileNumber: contact.mobileNumber || "",
              createdAt: contact.createdAt || new Date().toISOString(),
              isActive: typeof contact.isActive === 'boolean' ? contact.isActive : true,
              title: contact.title || "",
              country: contact.country || "",
              state: contact.state || "",
              city: contact.city || "",
              address: contact.address || "",
              zipcode: contact.zipcode || "",
              companyTitle: contact.companyTitle || "",
              website: contact.website || "",
              avatar: contact.avatar || `https://ui-avatars.com/api/?name=${contact.firstName || ""}+${contact.lastName || ""}&background=00a0d1&color=fff`
            }))
            
            setContacts(contactsWithAvatars)
            return
          } else {
            console.warn('API response not OK:', response.status, response.statusText)
            throw new Error(`API returned ${response.status}: ${response.statusText}`)
          }
        } catch (apiError) {
          console.warn('API fetch failed, falling back to mock data:', apiError)
        }
        
        // If API call fails, use mock data
        console.info('Using mock contact data')
        const mockContacts: Contact[] = [
          {
            id: 1,
            firstName: "Safa",
            lastName: "Noor",
            email: "safa.noor@firnas.tech",
            mobileNumber: "04343432434",
            createdAt: "2025-06-28T09:02:42.760Z",
            isActive: true,
            title: "Manager",
            country: "USA",
            state: "Alabama",
            city: "Montgomery",
            address: "123 Tech Avenue",
            zipcode: "22010",
            companyTitle: "Firnaas",
            website: "https://firnas.tech/",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
          },
          {
            id: 2,
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@example.com",
            mobileNumber: "+1 (555) 123-4567",
            createdAt: "2025-06-20T09:00:00.000Z",
            isActive: true,
            title: "Sales Representative",
            country: "USA",
            companyTitle: "Lemara Commercial"
          },
          {
            id: 3,
            firstName: "Emma",
            lastName: "Johnson",
            email: "emma.johnson@example.com",
            mobileNumber: "+1 (555) 234-5678",
            createdAt: "2025-05-15T11:30:00.000Z",
            isActive: false,
            title: "Marketing Director",
            website: "https://emmaportfolio.com",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face"
          },
          {
            id: 4,
            firstName: "Michael",
            lastName: "Davis",
            email: "michael.davis@example.com",
            mobileNumber: "+1 (555) 345-6789",
            createdAt: "2025-04-10T14:45:00.000Z",
            isActive: true,
            companyTitle: "Davis Properties"
          },
          {
            id: 5,
            firstName: "Sarah",
            lastName: "Williams",
            email: "sarah.williams@example.com",
            mobileNumber: "+1 (555) 456-7890",
            createdAt: "2025-03-05T08:15:00.000Z",
            isActive: true,
            title: "Property Manager",
            country: "Canada",
            city: "Toronto",
            companyTitle: "Global Realty"
          }
        ]
        
        // Add avatar field for UI if missing
        const contactsWithAvatars = mockContacts.map((contact) => ({
          ...contact,
          firstName: contact.firstName || "",
          lastName: contact.lastName || "",
          email: contact.email || "",
          mobileNumber: contact.mobileNumber || "",
          avatar: contact.avatar || `https://ui-avatars.com/api/?name=${contact.firstName || ""}+${contact.lastName || ""}&background=00a0d1&color=fff`
        }))
        
        setContacts(contactsWithAvatars)
      } catch (error) {
        console.error('Error in contact loading process:', error)
        // Set empty array on error
        setContacts([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchContacts()
  }, [])

  // Filter and paginate data
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Safely check if fields exist and are not null before calling toLowerCase()
      const matchesSearch =
        (contact.firstName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.lastName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.mobileNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.companyTitle?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.country?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (contact.city?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === "all" || (filterStatus === "active" ? contact.isActive : !contact.isActive)
      return matchesSearch && matchesStatus
    })
  }, [contacts, searchTerm, filterStatus])

  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentContacts = filteredContacts.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, rowsPerPage])

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToFirstPage = () => goToPage(1)
  const goToLastPage = () => goToPage(totalPages)
  const goToPreviousPage = () => goToPage(currentPage - 1)
  const goToNextPage = () => goToPage(currentPage + 1)

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date)
    } catch (error) {
      console.error('Invalid date format:', dateString)
      return dateString
    }
  }

  // Function to refresh contacts data
  const refreshContacts = () => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true)
        
        try {
          // Fetch from the actual backend API
          const response = await fetch('https://lemara-9829c937fd90.herokuapp.com/contacts/admin/all', { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            // Prevent caching
            cache: 'no-store'
          })
          
          if (response.ok) {
            const data = await response.json()
            
            // Add avatar field for UI if missing and ensure all required fields have default values
            const contactsWithAvatars = data.map((contact: any) => ({
              id: contact.id || 0,
              firstName: contact.firstName || "",
              lastName: contact.lastName || "",
              email: contact.email || "",
              mobileNumber: contact.mobileNumber || "",
              createdAt: contact.createdAt || new Date().toISOString(),
              isActive: typeof contact.isActive === 'boolean' ? contact.isActive : true,
              title: contact.title || "",
              country: contact.country || "",
              state: contact.state || "",
              city: contact.city || "",
              address: contact.address || "",
              zipcode: contact.zipcode || "",
              companyTitle: contact.companyTitle || "",
              website: contact.website || "",
              avatar: contact.avatar || `https://ui-avatars.com/api/?name=${contact.firstName || ""}+${contact.lastName || ""}&background=00a0d1&color=fff`
            }))
            
            setContacts(contactsWithAvatars)
            console.info('Contacts refreshed from API successfully')
            return
          } else {
            console.warn('API response not OK during refresh:', response.status, response.statusText)
            throw new Error(`API returned ${response.status}: ${response.statusText}`)
          }
        } catch (apiError) {
          console.warn('API refresh failed, showing existing data:', apiError)
        }
        
        // On refresh error, we don't modify the existing contacts
        // Just show a console message
        console.info('Unable to refresh contacts from API')
      } catch (error) {
        console.error('Error in refresh process:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchContacts()
  }

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#00a0d1] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contacts Management</h1>
            <p className="text-gray-600 mt-1">Manage your contacts and keep track of important information</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center px-6 py-3 bg-[#00a0d1] text-white font-medium rounded-xl hover:bg-[#008bb8] focus:outline-none focus:ring-4 focus:ring-[#00a0d1]/30 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
            <UserPlus className="w-5 h-5 mr-2" />
            Add Contact
          </button>

          <button
            disabled={isLoading}
            onClick={refreshContacts}
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
            placeholder="Search contacts..."
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
            {isLoading ? "Loading..." : `${filteredContacts.length} of ${contacts.length} contacts`}
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
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span>Name</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created</span>
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
                      <span className="text-gray-600 font-medium text-lg">Loading contacts...</span>
                    </div>
                  </td>
                </tr>
              ) : currentContacts.length > 0 ? (
                currentContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gradient-to-r hover:from-[#00a0d1]/5 hover:to-[#00a0d1]/10 transition-all duration-300 group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative">
                          <img
                            src={contact.avatar || "/placeholder.svg"}
                            alt={`${contact.firstName} ${contact.lastName}`}
                            className="w-full h-full rounded-2xl object-cover"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${contact.isActive ? "bg-green-500" : "bg-gray-400"}`}
                          ></div>
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-bold text-gray-900 group-hover:text-[#00a0d1] transition-colors">
                            {contact.firstName} {contact.lastName}
                          </div>
                          {contact.title && (
                            <div className="text-sm text-gray-500">{contact.title}</div>
                          )}
                          {contact.companyTitle && (
                            <div className="text-xs text-gray-400">{contact.companyTitle}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {contact.mobileNumber}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {contact.email}
                      </div>
                      {contact.website && (
                        <div className="text-xs text-gray-400 mt-1 ml-6">{contact.website}</div>
                      )}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(contact.createdAt)}
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
                        <User className="w-12 h-12 text-[#00a0d1]" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-2">
                          {searchTerm ? "No matching contacts found" : "No contacts found"}
                        </p>
                        <p className="text-base text-gray-600 mb-6 max-w-md">
                          {searchTerm
                            ? `No contacts match "${searchTerm}". Try adjusting your search.`
                            : "Get started by adding your first contact to your address book."}
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
        {!isLoading && filteredContacts.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-700 font-medium">
                  Showing <span className="font-bold text-[#00a0d1]">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-[#00a0d1]">{Math.min(endIndex, filteredContacts.length)}</span> of{" "}
                  <span className="font-bold text-[#00a0d1]">{filteredContacts.length}</span> results
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
