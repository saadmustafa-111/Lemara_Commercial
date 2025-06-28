"use client"
import { useState, useEffect, useMemo } from "react"
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Plus,
  DollarSign,
  Building,
  Calendar,
  FileText,
  User,
  Hash,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  CreditCard,
} from "lucide-react"
import LoanDetailsModal from "../common/LoanDetailsModal"

export interface User {
  id: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  password: string
  email: string
  phone: string
  whatsapp: string
  twitter: string
  facebook: string
  linkedIn: string
  instagram: string
  nmls: string
  dre: string
  role: string
}

export interface CommercialLoan {
  id: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  ssn: number
  details: string
  address: string
  city: string
  state: string
  zip: string
  houseNumber: string
  businessNumber: string
  email: string
  annualIncome: number
  monthlyExpenses: number
  creditScore: number | null
  existingDebt: number
  businessName: string
  businesstype: string
  businessAddress: string
  annualBusinessRevenue: number
  loanAmount: number
  status: "in progress" | "submitted" | "approved" | "rejected"
  source: string
  submittedDate?: string
  user: User
  avatar?: string
}

export default function CommercialLoansTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [loans, setLoans] = useState<CommercialLoan[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [error, setError] = useState<string | null>(null)
  const [selectedLoan, setSelectedLoan] = useState<CommercialLoan | null>(null)
  const [userLoanCounts, setUserLoanCounts] = useState<Record<string, number>>({})

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const rowsPerPageOptions = [5, 10, 15, 20, 25]

  const fetchLoans = async () => {
    setIsLoading(true)
    setError(null)
    try {
      let response;
      
      try {
        // Try direct connection to the Heroku backend 
        response = await fetch(`https://lemara-9829c937fd90.herokuapp.com/loan`);
      } catch (corsError) {
        console.log("Falling back to proxy due to potential CORS issues:", corsError);
        // Fall back to our proxy API route
        response = await fetch('/api/loans');
      }
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log("Loans data from backend:", data);
      
      // Transform the data to ensure it matches our CommercialLoan interface
      const loansData = Array.isArray(data) ? data : (data.loans || []);
      
      // Process and standardize the loan data
      const processedLoans = loansData.map((loan: any) => {
        return {
          ...loan,
          // Ensure required fields are present with defaults if needed
          status: loan.status || 'submitted',
          submittedDate: loan.createdAt ? new Date(loan.createdAt).toLocaleDateString() : undefined,
          avatar: loan.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((loan.firstName || '') + ' ' + (loan.lastName || ''))}&background=0D8ABC&color=fff`,
          // Ensure user object is present
          user: loan.user || {
            id: loan.userId || 0,
            isActive: true,
            firstName: loan.firstName || '',
            lastName: loan.lastName || '',
            email: loan.email || '',
            phone: loan.houseNumber || '',
            role: 'user'
          }
        };
      });
      
      setLoans(processedLoans);
      
      // Calculate how many loans each user has
      const userCounts: Record<string, number> = {}
      processedLoans.forEach((loan: CommercialLoan) => {
        // We can use the user's email as a unique identifier
        const userEmail = loan.email
        userCounts[userEmail] = (userCounts[userEmail] || 0) + 1
      })
      setUserLoanCounts(userCounts)
    } catch (err) {
      console.error('Failed to fetch loans:', err)
      setError('Failed to load loans. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data initially and set up auto-refresh every 30 seconds
  useEffect(() => {
    fetchLoans();
    
    // Set up automatic refresh
    const refreshInterval = setInterval(() => {
      fetchLoans();
    }, 30000); // Refresh every 30 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [])

  // Filter and paginate data
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesSearch =
        String(loan.id).includes(searchTerm.toLowerCase()) ||
        `${loan.firstName} ${loan.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || loan.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [loans, searchTerm, filterStatus])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500"
      case "rejected":
        return "bg-red-500"
      case "submitted":
        return "bg-blue-500"
      case "in progress":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleViewLoan = async (loanId: number) => {
    // Show a loading state in just part of the UI rather than the whole table
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'flex';
    }
    
    try {
      // Always fetch fresh data from the backend
      let response;
      let loanData;
      
      try {
        // Try direct connection to the Heroku backend for specific loan
        response = await fetch(`https://lemara-9829c937fd90.herokuapp.com/loan/${loanId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        loanData = await response.json();
        
        // If the loan has a userId but no detailed user info, fetch user details
        if (loanData && loanData.userId && (!loanData.user || Object.keys(loanData.user).length === 0)) {
          try {
            const userResponse = await fetch(`https://lemara-9829c937fd90.herokuapp.com/user/${loanData.userId}`);
            if (userResponse.ok) {
              const userData = await userResponse.json();
              loanData.user = userData;
            }
          } catch (userError) {
            console.error("Failed to fetch user details:", userError);
            // Continue without user details
          }
        }
        
      } catch (corsError) {
        console.log("Falling back to proxy due to potential CORS issues:", corsError);
        // Fall back to our proxy API route
        response = await fetch(`/api/loans?id=${loanId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        loanData = await response.json();
      }

      // Process loan data to ensure it matches our interface
      const processedLoan = {
        ...loanData,
        status: loanData.status || 'submitted',
        submittedDate: loanData.createdAt ? new Date(loanData.createdAt).toLocaleDateString() : undefined,
        avatar: loanData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((loanData.firstName || '') + ' ' + (loanData.lastName || ''))}&background=0D8ABC&color=fff`,
        // Ensure user object is present
        user: loanData.user || {
          id: loanData.userId || 0,
          isActive: true,
          firstName: loanData.firstName || '',
          lastName: loanData.lastName || '',
          email: loanData.email || '',
          phone: loanData.houseNumber || '',
          role: 'user'
        }
      };
      
      setSelectedLoan(processedLoan);
    } catch (err) {
      console.error('Failed to fetch loan details:', err)
      setError('Failed to load loan details. Please try again later.')
    } finally {
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
  }

  const handleCloseLoanDetails = () => {
    setSelectedLoan(null)
  }

  // New function to filter by user email
  const filterByUser = (email: string) => {
    // Clear any other filters and search terms
    setFilterStatus("all")
    // Set the search term to the email to filter by user
    setSearchTerm(email)
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
            <CreditCard className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Commercial Loans</h1>
            <p className="text-gray-600 mt-1">Manage commercial loan applications and track their progress</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href="/admin/loans/new" className="inline-flex items-center px-6 py-3 bg-[#00a0d1] text-white font-medium rounded-xl hover:bg-[#008bb8] focus:outline-none focus:ring-4 focus:ring-[#00a0d1]/30 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5 mr-2" />
            New Loan Application
          </a>

          <button
            onClick={fetchLoans}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none transition-all duration-200 hover:scale-105 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
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
            className={`w-full pl-10 ${searchTerm && searchTerm.includes('@') ? 'pr-10' : 'pr-4'} py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] transition-all duration-200`}
          />
          {searchTerm && searchTerm.includes('@') && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Clear user filter"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="in progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-xl p-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">{error}</div>
            </div>
            <div className="ml-auto pl-3">
              <button 
                type="button" 
                className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100"
                onClick={() => setError(null)}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Filter Notification */}
      {searchTerm && searchTerm.includes('@') && (
        <div className="mb-6 p-4 bg-[#00a0d1]/10 border border-[#00a0d1]/30 rounded-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#00a0d1]/20 rounded-xl p-2">
              <User className="w-5 h-5 text-[#00a0d1]" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#00a0d1]">User Filter Active</h3>
              <div className="mt-1 text-sm text-gray-700">
                Showing all loan applications for user with email: <span className="font-medium">{searchTerm}</span>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <button 
                type="button" 
                className="inline-flex bg-[#00a0d1]/10 rounded-md p-1.5 text-[#00a0d1] hover:bg-[#00a0d1]/20"
                onClick={() => setSearchTerm('')}
              >
                <span className="sr-only">Clear filter</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 via-[#00a0d1]/10 to-[#00a0d1]/20">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00a0d1] rounded-lg flex items-center justify-center">
                      <Hash className="w-4 h-4 text-white" />
                    </div>
                    <span>Loan ID & Source</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Applicant</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Loan Purpose</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Dates & Status</span>
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
                      <span className="text-gray-600 font-medium text-lg">Loading loans from API...</span>
                      <p className="text-sm text-gray-500">Fetching the latest data from the server</p>
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
                      <div className="space-y-2">
                        <div className="text-base font-bold text-gray-900 group-hover:text-[#00a0d1] transition-colors">
                          {loan.id}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Building className="w-4 h-4 mr-1" />
                          {loan.source}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="font-semibold">{formatCurrency(loan.loanAmount)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <img
                            src={loan.avatar || "/placeholder.svg"}
                            alt={`${loan.firstName} ${loan.lastName}`}
                            className="w-full h-full rounded-2xl object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-gray-900">{loan.firstName} {loan.lastName}</div>
                          {userLoanCounts[loan.email] > 1 && (
                            <div 
                              onClick={() => filterByUser(loan.email)}
                              className="mt-1 text-xs px-2 py-1 bg-[#00a0d1]/10 rounded-full inline-flex items-center text-[#00a0d1] font-medium cursor-pointer hover:bg-[#00a0d1]/20 group-hover:scale-105 transition-transform" 
                              title={`Click to show all ${userLoanCounts[loan.email]} loan applications from this user`}
                            >
                              <span className="mr-1">👤</span>
                              {`+${userLoanCounts[loan.email] - 1} more application${userLoanCounts[loan.email] - 1 > 1 ? 's' : ''}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{loan.details}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>Created: {new Date(loan.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>Submitted: {loan.submittedDate || 'N/A'}</span>
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            loan.status,
                          )}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${getStatusDot(loan.status)}`}></div>
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </div>
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
                        <CreditCard className="w-12 h-12 text-[#00a0d1]" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-2">
                          {searchTerm ? "No matching loans found" : "No loans found in the database"}
                        </p>
                        <p className="text-base text-gray-600 mb-6 max-w-md">
                          {searchTerm
                            ? `No loans match "${searchTerm}". Try adjusting your search.`
                            : "Use the 'New Loan Application' button to create your first commercial loan application."}
                        </p>
                      </div>
                      {!searchTerm && (
                        <a href="/admin/loans/new" className="px-6 py-3 bg-[#00a0d1] text-white font-medium rounded-xl hover:bg-[#008bb8] transition-all hover:scale-105">
                          <Plus className="w-5 h-5 inline mr-2" />
                          Create New Application
                        </a>
                      )}
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
      {selectedLoan && (
        <LoanDetailsModal 
          loan={selectedLoan}
          onClose={handleCloseLoanDetails}
        />
      )}
      
      {/* Loading indicator for modal */}
      <div 
        id="loading-indicator" 
        style={{ display: 'none' }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#00a0d1] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <span className="text-gray-800 font-medium">Loading loan details...</span>
        </div>
      </div>
    </div>
  )
}
