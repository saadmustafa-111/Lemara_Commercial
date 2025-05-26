"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import {
  Eye,
  Edit3,
  Trash2,
  Mail,
  Copy,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings,
  Users,
  Calendar,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Download,
} from "lucide-react"
import AddEmailModal from "./AddEmailModal"
import axiosInstance from "@/lib/axios"

interface EmailList {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  emails: string[]
}

interface ViewEmailsModalProps {
  isOpen: boolean
  onClose: () => void
  emails: string[]
  listName: string
}

const ViewEmailsModal: React.FC<ViewEmailsModalProps> = ({ isOpen, onClose, emails, listName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-gray-200 dark:border-gray-700 relative z-[10000]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{listName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                <Users className="w-4 h-4 mr-1" />
                {emails.length} email{emails.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto max-h-[60vh] scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {emails.length > 0 ? (
            <div className="space-y-3">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="group flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-sm font-bold">{(index + 1).toString().padStart(2, "0")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{email}</p>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => navigator.clipboard.writeText(email)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover:scale-110"
                      title="Copy email"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No emails in this list</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Total: {emails.length} email{emails.length !== 1 ? "s" : ""}
          </div>
          <div className="flex space-x-3">
            {emails.length > 0 && (
              <button
                onClick={() => {
                  const emailText = emails.join("\n")
                  navigator.clipboard.writeText(emailText)
                }}
                className="px-6 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-105 shadow-sm"
              >
                <Copy className="w-4 h-4 mr-2 inline" />
                Copy All
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const EmailLists: React.FC = () => {
  const [emailLists, setEmailLists] = useState<EmailList[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedList, setSelectedList] = useState<EmailList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination options
  const rowsPerPageOptions = [5, 10, 15, 20, 25]

  // Filter and paginate data
  const filteredLists = useMemo(() => {
    return emailLists.filter((list) => list.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [emailLists, searchTerm])

  const totalPages = Math.ceil(filteredLists.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentLists = filteredLists.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, rowsPerPage])

  // Fetch email lists from API
  const fetchEmailLists = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await axiosInstance.get("/email-list")
      const lists = response.data || []
      setEmailLists(lists)
    } catch (error: any) {
      console.error("Error fetching email lists:", error)

      if (error.response) {
        const errorMessage =
          error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`
        setError(errorMessage)
      } else if (error.request) {
        setError("No response from server. Please check your connection.")
      } else {
        setError("Failed to fetch email lists. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Delete email list
  const deleteEmailList = async (listId: number) => {
    try {
      await axiosInstance.delete(`/email-list/${listId}`)
      setEmailLists((prevLists) => prevLists.filter((list) => list.id !== listId))
    } catch (error: any) {
      console.error("Error deleting email list:", error)

      let errorMessage = "Failed to delete email list."
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage
      }

      alert(errorMessage)
    }
  }

  // Handle view emails
  const handleViewEmails = (list: EmailList) => {
    setSelectedList(list)
    setIsViewModalOpen(true)
  }

  // Handle successful email list addition
  const handleAddEmails = (emails: string[], listName: string) => {
    fetchEmailLists()
  }

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToFirstPage = () => goToPage(1)
  const goToLastPage = () => goToPage(totalPages)
  const goToPreviousPage = () => goToPage(currentPage - 1)
  const goToNextPage = () => goToPage(currentPage + 1)

  // Fetch data on component mount
  useEffect(() => {
    fetchEmailLists()
  }, [])

  return (
    <div className="p-6 sm:p-8 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Email Lists</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your email campaigns and subscribers</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Emails
          </button>

          <button
            onClick={fetchEmailLists}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200 hover:scale-105 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
            placeholder="Search email lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="px-3 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 focus:border-blue-500 dark:focus:border-blue-400 text-sm font-medium"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} rows
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {isLoading ? "Loading..." : `${filteredLists.length} of ${emailLists.length} lists`}
          </div>
        </div>
      </div>

      <AddEmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddEmails={handleAddEmails} />

      <ViewEmailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        emails={selectedList?.emails || []}
        listName={selectedList?.name || ""}
      />

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-xl border-2 border-red-200 dark:border-red-500/20 shadow-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium">{error}</p>
            </div>
            <button
              onClick={fetchEmailLists}
              className="ml-4 px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors font-medium text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span>List Details</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Campaigns</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Subscribers</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-5 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <MoreHorizontal className="w-4 h-4" />
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                        Loading email lists...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : currentLists.length > 0 ? (
                currentLists.map((list, index) => (
                  <tr
                    key={list.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-750 dark:hover:to-gray-700 transition-all duration-300 group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <span className="text-white text-lg font-bold">{list.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {list.name}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            Created{" "}
                            {new Date(list.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                          <Settings className="w-4 h-4 mr-1.5" />0 campaigns
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm">
                          <Users className="w-4 h-4 mr-2" />
                          {list.emails.length} emails
                        </span>
                        {list.emails.length > 0 && (
                          <button
                            onClick={() => handleViewEmails(list)}
                            className="inline-flex items-center p-2.5 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110 group/btn border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md"
                            title="View emails"
                          >
                            <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="inline-flex items-center p-3 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 hover:scale-110 group/edit border border-emerald-200 dark:border-emerald-700 shadow-sm hover:shadow-md"
                          title="Edit list"
                        >
                          <Edit3 className="w-5 h-5 group-hover/edit:rotate-12 transition-transform" />
                        </button>
                        <button
                          className="inline-flex items-center p-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 hover:scale-110 group/delete border border-red-200 dark:border-red-700 shadow-sm hover:shadow-md"
                          onClick={() => deleteEmailList(list.id)}
                          title="Delete list"
                        >
                          <Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center shadow-lg">
                        <Mail className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {searchTerm ? "No matching lists found" : "No email lists found"}
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                          {searchTerm
                            ? `No lists match "${searchTerm}". Try adjusting your search.`
                            : "Get started by creating your first email list to manage your subscribers."}
                        </p>
                        {!searchTerm && (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Email List
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && filteredLists.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Showing <span className="font-bold text-blue-600 dark:text-blue-400">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {Math.min(endIndex, filteredLists.length)}
                  </span>{" "}
                  of <span className="font-bold text-blue-600 dark:text-blue-400">{filteredLists.length}</span> results
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                  title="First page"
                >
                  <ChevronsLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                  title="Previous page"
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
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
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
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                  title="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-sm"
                  title="Last page"
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

export default EmailLists
