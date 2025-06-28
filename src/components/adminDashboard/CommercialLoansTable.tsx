"use client"
import { useState, useEffect, useMemo } from "react"
import { Search, Filter, Edit, Trash2, Eye, MoreHorizontal, FileText, TrendingUp, Building, Calendar, Mail, Phone, MapPin, Star, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, RefreshCw } from 'lucide-react'
import LoanDetailsModal from "../common/LoanDetailsModal"
import { CommercialLoan } from "./commerical-loans-table"

// Interface that matches what we get from the API with optional fields
interface ApiLoan {
  id: string | number
  userId: string | number
  propertyAddress?: string
  loanAmount: number
  status: string
  createdAt: string
  updatedAt?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  propertyType?: string
  loanType?: string
  loanPurpose?: string
  loanTerm?: string
  creditScore?: string | number
  
  // Fields we need to map to CommercialLoan
  address?: string
  city?: string
  state?: string
  zip?: string
  houseNumber?: string
  businessNumber?: string
  annualIncome?: number
  monthlyExpenses?: number
  existingDebt?: number
  businessName?: string
  businesstype?: string
  businessAddress?: string
  annualBusinessRevenue?: number
  source?: string
}

// Map API loan to CommercialLoan interface
const mapToCommercialLoan = (loan: ApiLoan): CommercialLoan => {
  return {
    id: Number(loan.id),
    isActive: true,
    createdAt: loan.createdAt,
    updatedAt: loan.updatedAt || loan.createdAt,
    firstName: loan.firstName || "Unknown",
    lastName: loan.lastName || "User",
    ssn: 0, // Default value
    details: "",
    address: loan.address || loan.propertyAddress || "",
    city: loan.city || "Unknown_City",
    state: loan.state || "",
    zip: loan.zip || "",
    houseNumber: loan.phone || loan.houseNumber || "",
    businessNumber: loan.businessNumber || "",
    email: loan.email || "",
    annualIncome: loan.annualIncome || 0,
    monthlyExpenses: loan.monthlyExpenses || 0,
    creditScore: typeof loan.creditScore === 'string' ? Number(loan.creditScore) : (loan.creditScore || null),
    existingDebt: loan.existingDebt || 0,
    businessName: loan.businessName || "",
    businesstype: loan.businesstype || loan.propertyType || "Commercial",
    businessAddress: loan.businessAddress || loan.propertyAddress || "",
    annualBusinessRevenue: loan.annualBusinessRevenue || 0,
    loanAmount: loan.loanAmount,
    status: (loan.status?.toLowerCase() as "in progress" | "submitted" | "approved" | "rejected") || "submitted",
    source: loan.source || "Web",
    submittedDate: new Date(loan.createdAt).toLocaleDateString(),
    user: {
      id: Number(loan.userId) || 0,
      isActive: true,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt || loan.createdAt,
      firstName: loan.firstName || "Unknown",
      lastName: loan.lastName || "User",
      password: "",
      email: loan.email || "",
      phone: loan.phone || loan.houseNumber || "",
      whatsapp: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      instagram: "",
      nmls: "",
      dre: "",
      role: "user"
    },
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent((loan.firstName || '') + ' ' + (loan.lastName || ''))}&background=0D8ABC&color=fff`
  }
}

export default function CommercialLoansTable() {  
  const [isLoading, setIsLoading] = useState(true)
  const [loans, setLoans] = useState<CommercialLoan[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const rowsPerPageOptions = [5, 10, 15, 20, 25]
  
  // Add refresh trigger state
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null)
  
  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true)
      try {
        // First try direct connection to backend, if CORS issues use proxy
        let response;
        try {
          // Try direct connection to the Heroku backend
          response = await fetch(`https://lemara-9829c937fd90.herokuapp.com/loan`);
        } catch (corsError) {
          console.log("Falling back to proxy due to potential CORS issues:", corsError);
          // Fall back to our proxy API route
          response = await fetch(`/api/proxy/loans`);
        }
        
        if (!response.ok) {
          throw new Error(`Error fetching loans: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Log the data received from the API for debugging
        console.log("Data received from loan API:", data);
        
        // Transform API response to match our display needs
        const loansData = Array.isArray(data) ? data : (data.loans || []);
        
        // Map API loans to CommercialLoan interface required by our components
        const commercialLoans = await Promise.all(loansData.map(async (apiLoan: ApiLoan) => {
          // If user details are not included in the loan data, fetch them
          if (!apiLoan.firstName || !apiLoan.lastName || !apiLoan.email) {
            try {
              // Try to get user info
              let userResponse;
              try {
                userResponse = await fetch(`https://lemara-9829c937fd90.herokuapp.com/user/${apiLoan.userId}`);
              } catch (corsError) {
                userResponse = await fetch(`/api/proxy/users/${apiLoan.userId}`);
              }
              
              if (userResponse.ok) {
                const userData = await userResponse.json();
                apiLoan = {
                  ...apiLoan,
                  firstName: userData.firstName || "Unknown",
                  lastName: userData.lastName || "User",
                  email: userData.email || "unknown@example.com",
                  phone: userData.phone || "N/A",
                };
              }
            } catch (userError) {
              console.error("Error fetching user details:", userError);
            }
          }
          
          // Convert the API loan format to our CommercialLoan format
          return mapToCommercialLoan(apiLoan);
        }));
        
        setLoans(commercialLoans);
      } catch (error) {
        console.error("Failed to fetch loans:", error)
        // Set empty array on error
        setLoans([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoans()
  }, [refreshTrigger])
  
  // Filter and paginate data
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const fullName = `${loan.firstName} ${loan.lastName}`.toLowerCase()
      const addressSearch = (loan.address || '').toLowerCase()
      
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        addressSearch.includes(searchTerm.toLowerCase()) ||
        loan.email.toLowerCase().includes(searchTerm.toLowerCase())
        
      const matchesStatus = filterStatus === "all" || 
        (filterStatus === "pending" && loan.status === "submitted") || // Map pending to submitted
        (filterStatus === "reviewing" && loan.status === "in progress") || // Map reviewing to in progress
        loan.status === filterStatus
      
      const matchesType = filterType === "all" || 
        loan.businesstype.toLowerCase() === filterType.toLowerCase()
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [loans, searchTerm, filterStatus, filterType])

  const totalPages = Math.ceil(filteredLoans.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentLoans = filteredLoans.slice(startIndex, endIndex)
  
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
  
  // Handle view loan details
  const handleViewLoan = (loanId: number) => {
    setSelectedLoanId(loanId)
    setIsModalOpen(true)
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
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Commercial Loans</h1>
            <p className="text-gray-600 mt-1">Manage commercial loan applications</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            disabled={isLoading}
            onClick={() => setRefreshTrigger(prev => prev + 1)}
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
            placeholder="Search loans..."
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
              <option value="submitted">Submitted</option>
              <option value="in progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              <option value="all">All Business Types</option>
              <option value="LLC">LLC</option>
              <option value="Corporation">Corporation</option>
              <option value="Partnership">Partnership</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Retail">Retail</option>
              <option value="Office">Office</option>
              <option value="Mixed Use">Mixed Use</option>
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
            {isLoading ? "Loading..." : `${filteredLoans.length} of ${loans.length} loans`}
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
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Loan Details</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Applicant</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Property</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Status</span>
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
                      <span className="text-gray-600 font-medium text-lg">Loading loans...</span>
                    </div>
                  </td>
                </tr>
              ) : currentLoans.length > 0 ? (
                currentLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-gradient-to-r hover:from-[#00a0d1]/5 hover:to-[#00a0d1]/10 transition-all duration-300 group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-bold text-gray-900 group-hover:text-[#00a0d1] transition-colors">
                            Loan #{loan.id.toString().padStart(8, '0')}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(loan.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm font-bold text-green-600">
                            {formatCurrency(loan.loanAmount || 0)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-base font-medium text-gray-900">
                          {loan.firstName} {loan.lastName}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-1" />
                          {loan.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-1" />
                          {loan.houseNumber || loan.user.phone || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {loan.businesstype || "Commercial Property"}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {loan.address || loan.businessAddress || "Address not provided"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {loan.details || "Purpose not specified"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                          loan.status === "approved" ? "bg-green-100 text-green-800 border border-green-200" :
                          loan.status === "submitted" ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
                          loan.status === "rejected" ? "bg-red-100 text-red-800 border border-red-200" : 
                          loan.status === "in progress" ? "bg-blue-100 text-blue-800 border border-blue-200" :
                          "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            loan.status === "approved" ? "bg-green-500" :
                            loan.status === "submitted" ? "bg-yellow-500" :
                            loan.status === "rejected" ? "bg-red-500" :
                            loan.status === "in progress" ? "bg-blue-500" :
                            "bg-gray-500"
                          }`}
                        ></div>
                        {loan.status ? loan.status.charAt(0).toUpperCase() + loan.status.slice(1) : "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleViewLoan(loan.id)}
                          className="inline-flex items-center p-3 rounded-xl text-[#00a0d1] hover:bg-[#00a0d1]/10 transition-all duration-200 hover:scale-110 group/view border border-[#00a0d1]/20 shadow-sm hover:shadow-md"
                        >
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
                        <FileText className="w-12 h-12 text-[#00a0d1]" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-2">
                          {searchTerm ? "No matching loans found" : "No loans found"}
                        </p>
                        <p className="text-base text-gray-600 mb-6 max-w-md">
                          {searchTerm
                            ? `No loans match "${searchTerm}". Try adjusting your search.`
                            : "There are no loan applications in the system yet."}
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
        {!isLoading && filteredLoans.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-700 font-medium">
                  Showing <span className="font-bold text-[#00a0d1]">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-[#00a0d1]">{Math.min(endIndex, filteredLoans.length)}</span> of{" "}
                  <span className="font-bold text-[#00a0d1]">{filteredLoans.length}</span> results
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
      
      {/* Loan Details Modal */}
      {isModalOpen && selectedLoanId && (
        <LoanDetailsModal 
          loan={loans.find(loan => loan.id === selectedLoanId) || null}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLoanId(null);
          }}
        />
      )}
    </div>
  )
}
