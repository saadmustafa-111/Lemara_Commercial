"use client";

import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Download, 
  Filter,
  MoreHorizontal,
  Building,
  Eye,
  Edit,
  Trash2,
  Users,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import FilterGroup from '../../../../components/commercial-listings/FilterGroup';
import ListingActionsModal from '../../../../components/commercial-listings/ListingActionsModal';
import { CommercialListing } from '../../../../types';
import FloatingActionButton from '../../../../components/commercial-listings/FloatingActionButton';
import './styles.css';
import Link from 'next/link';

export default function CommercialListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showArchive, setShowArchive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filters = ['All', 'Admin', 'Agent'];
  const statusFilters = ['Featured', 'Active', 'Inactive', 'Sold'];

  // Sample data to match the image
  const listings = [
    {
      id: '100079',
      source: 'AJ Rana',
      name: '520 ACR MIXED LICENSED GRN HS & OUTD...',
      city: 'Lake Nacimiento',
      listPrice: '9990000.00',
      createDate: '7/23/2019',
      reInc: 'N',
      documents: 'N',
      contacts: '642',
      img: '1',
      status: 'Active'
    },
    {
      id: '100100',
      source: 'AJ Rana',
      name: 'LICENSED GREEN-HOUSE CANNABIS FARM!',
      city: 'Salinas',
      listPrice: '7750000.00',
      createDate: '8/19/2019',
      reInc: 'N',
      documents: 'N',
      contacts: '868',
      img: '1',
      status: 'Sold'
    },
    {
      id: '100104',
      source: 'AJ Rana',
      name: 'ESTABLISHED DELI CAFE AND GYRO!',
      city: 'Newark',
      listPrice: '89000.00',
      createDate: '8/22/2019',
      reInc: 'N',
      documents: 'N',
      contacts: '866',
      img: '1',
      status: 'Active'
    },
    {
      id: '100135',
      source: 'AJ Rana',
      name: 'SUCCESSFUL ASSISTED LIVING FACILITY!',
      city: '',
      listPrice: '9750000.00',
      createDate: '8/27/2019',
      reInc: 'N',
      documents: 'N',
      contacts: '9',
      img: '1',
      status: 'Active'
    },
    {
      id: '100238',
      source: 'AJ Rana',
      name: 'OPPORTUNITY TO BUY MULTI-FAMILY BUILD...',
      city: '',
      listPrice: '35449230.00',
      createDate: '2/2/2020',
      reInc: 'N',
      documents: 'N',
      contacts: '',
      img: '1',
      status: 'Active'
    },
    {
      id: '100239',
      source: 'AJ Rana',
      name: 'Opportunity To Buy Multi-Family Building!',
      city: 'Redlands',
      listPrice: '45390240.00',
      createDate: '2/2/2020',
      reInc: 'N',
      documents: 'N',
      contacts: '3',
      img: '1',
      status: 'Active'
    },
    {
      id: '100240',
      source: 'AJ Rana',
      name: 'Opportunity To Buy Multi-Family Building!',
      city: 'Hemet',
      listPrice: '37431968.00',
      createDate: '2/2/2020',
      reInc: 'N',
      documents: 'N',
      contacts: '3',
      img: '1',
      status: 'Active'
    },
    {
      id: '100241',
      source: 'AJ Rana',
      name: 'OPPORTUNITY TO BUY MULTI-FAMILY BUILD...',
      city: 'Riverside',
      listPrice: '37136220.00',
      createDate: '2/2/2020',
      reInc: 'N',
      documents: 'N',
      contacts: '3',
      img: '1',
      status: 'Active'
    },
    {
      id: '100256',
      source: 'AJ Rana',
      name: 'Multifamily Building For Sale!',
      city: 'Chico',
      listPrice: '5104008.00',
      createDate: '3/4/2020',
      reInc: 'N',
      documents: 'N',
      contacts: '',
      img: '1',
      status: 'Active'
    },
    {
      id: '100371',
      source: 'AJ Rana',
      name: '',
      city: 'Dublin',
      listPrice: '1550000.00',
      createDate: '2/5/2022',
      reInc: 'N',
      documents: 'N',
      contacts: '6',
      img: '',
      status: 'Active'
    },
    {
      id: '100372',
      source: 'Abdul Shah',
      name: 'Arden Way',
      city: 'Sacramento',
      listPrice: '2200000.00',
      createDate: '7/8/2023',
      reInc: 'N',
      documents: 'N',
      contacts: '2',
      img: '1',
      status: 'Active'
    },
    {
      id: '100374',
      source: 'Abdul Shah',
      name: '',
      city: '',
      listPrice: '0.00',
      createDate: '4/23/2024',
      reInc: 'N',
      documents: 'N',
      contacts: '0',
      img: '',
      status: 'Active'
    },
  ];
  // Filter and paginate data
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [listings, searchTerm, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredListings.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  
  // Format currency
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#00a0d1] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <Building className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Commercial Listings</h1>
            <p className="text-gray-600 mt-1">Manage your commercial property listings</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* <Link 
            href="/dashboard/admin/commercial-listings/add"
            className="inline-flex items-center px-6 py-3 bg-[#00a0d1] text-white font-medium rounded-xl hover:bg-[#008bb8] focus:outline-none focus:ring-4 focus:ring-[#00a0d1]/30 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Listing
          </Link> */}

          <button
            disabled={isLoading}
            className="inline-flex items-center px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none transition-all duration-200 hover:scale-105 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] transition-all duration-200"
          />
        </div>

        <div className="flex items-center space-x-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a0d1]/30 focus:border-[#00a0d1] text-sm font-medium"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Sold">Sold</option>
              <option value="Featured">Featured</option>
              <option value="Inactive">Inactive</option>
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
              {[5, 10, 15, 20, 25].map((option) => (
                <option key={option} value={option}>
                  {option} rows
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            {isLoading ? "Loading..." : `${filteredListings.length} listings`}
          </div>
        </div>
      </div>      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 via-[#00a0d1]/10 to-[#00a0d1]/20">
              <tr><th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"><div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00a0d1] rounded-lg flex items-center justify-center">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <span>Listing Details</span>
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Listed Date
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
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
                <tr><td colSpan={7} className="px-6 py-16 text-center"><div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-[#00a0d1] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                      </div>
                      <span className="text-gray-600 font-medium text-lg">Loading listings...</span>
                    </div>
                  </td>
                </tr>
              ) : currentListings.length > 0 ? (
                currentListings.map((listing) => (<tr key={listing.id} className="hover:bg-gradient-to-r hover:from-[#00a0d1]/5 hover:to-[#00a0d1]/10 transition-all duration-300 group"><td className="px-6 py-5 whitespace-nowrap"><div className="flex items-center"><div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1]/20 to-[#00a0d1]/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"><Building className="w-8 h-8 text-[#00a0d1]" /></div><div className="ml-4"><div className="text-base font-bold text-gray-900 group-hover:text-[#00a0d1] transition-colors">{listing.name.length > 30 ? `${listing.name.substring(0, 30)}...` : listing.name}</div><div className="flex items-center text-sm text-gray-500 mt-1">ID: {listing.id}</div><div className="flex items-center text-sm text-gray-500">{listing.contacts ? `${listing.contacts} contacts` : "No contacts"} | {listing.documents === 'Y' ? 'Has documents' : 'No documents'}</div></div></div></td><td className="px-6 py-5 whitespace-nowrap"><div className="font-medium text-gray-900">{listing.source}</div></td><td className="px-6 py-5 whitespace-nowrap"><div className="font-medium text-gray-900">{listing.city || 'Unknown location'}</div></td><td className="px-6 py-5 whitespace-nowrap"><div className="font-bold text-gray-900">{formatCurrency(listing.listPrice)}</div></td><td className="px-6 py-5 whitespace-nowrap"><div className="text-sm text-gray-900">{listing.createDate}</div></td><td className="px-6 py-5 whitespace-nowrap"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          listing.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          listing.status === 'Sold' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                          listing.status === 'Inactive' ? 'bg-gray-100 text-gray-800 border border-gray-200' :
                          'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}><div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            listing.status === 'Active' ? 'bg-emerald-500' :
                            listing.status === 'Sold' ? 'bg-blue-500' :
                            listing.status === 'Inactive' ? 'bg-gray-500' :
                            'bg-yellow-500'
                          }`}></div>{listing.status}</span></td><td className="px-6 py-5 whitespace-nowrap text-center">
<div className="flex items-center justify-center space-x-2"><Link href={`/dashboard/admin/commercial-listings/view/${listing.id}`} className="inline-flex items-center p-3 rounded-xl text-[#00a0d1] hover:bg-[#00a0d1]/10 transition-all duration-200 hover:scale-110 group/view border border-[#00a0d1]/20 shadow-sm hover:shadow-md"><Eye className="w-5 h-5 group-hover/view:scale-110 transition-transform" /></Link><Link href={`/dashboard/admin/commercial-listings/edit/${listing.id}`} className="inline-flex items-center p-3 rounded-xl text-emerald-600 hover:bg-emerald-100 transition-all duration-200 hover:scale-110 group/edit border border-emerald-200 shadow-sm hover:shadow-md"><Edit className="w-5 h-5 group-hover/edit:rotate-12 transition-transform" /></Link><button onClick={() => {setSelectedListing(listing.id);setIsModalOpen(true);}} className="inline-flex items-center p-3 rounded-xl text-red-600 hover:bg-red-100 transition-all duration-200 hover:scale-110 group/delete border border-red-200 shadow-sm hover:shadow-md"><Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform" /></button></div></td></tr>
                ))
              ) : (
                <tr><td colSpan={7} className="px-6 py-20 text-center"><div className="flex flex-col items-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#00a0d1]/20 to-[#00a0d1]/30 rounded-3xl flex items-center justify-center shadow-lg">
                        <Building className="w-12 h-12 text-[#00a0d1]" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-2">
                          {searchTerm ? "No matching listings found" : "No listings found"}
                        </p>
                        <p className="text-base text-gray-600 mb-6 max-w-md">
                          {searchTerm
                            ? `No listings match "${searchTerm}". Try adjusting your search.`
                            : "Get started by adding your first commercial listing."}
                        </p>
                      </div>
                      <Link
                        href="/dashboard/admin/commercial-listings/add"
                        className="inline-flex items-center px-6 py-3 bg-[#00a0d1] text-white font-medium rounded-xl hover:bg-[#008bb8] focus:outline-none focus:ring-4 focus:ring-[#00a0d1]/30 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Listing
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>        {/* Pagination */}
        {!isLoading && filteredListings.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-700 font-medium">
                  Showing <span className="font-bold text-[#00a0d1]">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-[#00a0d1]">{Math.min(endIndex, filteredListings.length)}</span> of{" "}
                  <span className="font-bold text-[#00a0d1]">{filteredListings.length}</span> results
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
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
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
                    );
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
      </div>      {/* Action modal using our component */}
      <ListingActionsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        listingId={selectedListing || "0"}
      />
    </div>
  );
}
