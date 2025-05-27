"use client";

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Download, 
  Filter,
  MoreHorizontal
} from 'lucide-react';
import FilterGroup from '../../../../components/commercial-listings/FilterGroup';
import ListingActionsModal from '../../../../components/commercial-listings/ListingActionsModal';
import { CommercialListing } from '../../../../types';
import FloatingActionButton from '../../../../components/commercial-listings/FloatingActionButton';
import './styles.css';
import Link from 'next/link';

export default function CommercialListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [showArchive, setShowArchive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Featured');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredListings = listings.filter(listing => {
    if (statusFilter !== 'All' && listing.status !== statusFilter) {
      return false;
    }
    // Additional filtering can be added based on activeFilter if needed
    return true;
  });

  return (
    <div className="p-4 md:p-6">
      {/* Header with title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">Commercial Listings</h1>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input 
              type="text" 
              placeholder="Search listings..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a0d1] focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#00a0d1] hover:bg-[#0088b3] text-white py-2 px-4 rounded-lg transition duration-300">
            <Plus size={18} />
            <span>Add Listing</span>
          </button>
        </div>
      </div>      {/* Filter section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <FilterGroup 
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <FilterGroup 
            filters={statusFilters}
            activeFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Main content with table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input 
                type="checkbox" 
                checked={showArchive}
                onChange={(e) => setShowArchive(e.target.checked)}
                className="rounded text-[#00a0d1] focus:ring-[#00a0d1]" 
              />
              <span>Show Archive</span>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rows:</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00a0d1]"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <button className="p-2 text-gray-500 hover:text-[#00a0d1] transition duration-300">
              <Download size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-[#00a0d1] transition duration-300">
              <Filter size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-[#00a0d1] transition duration-300">
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID#
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  List Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Create Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RE. Inc.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacts
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Img
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.source}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.city}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{Number(listing.listPrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.createDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.reInc}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.documents}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.contacts}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{listing.img}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      listing.status === 'Active' ? 'bg-green-100 text-green-800' :
                      listing.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                      listing.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {listing.status}
                    </span>
                  </td>                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                    <div className="relative inline-block">
                      <button 
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={() => {
                          setSelectedListing(listing.id);
                          setIsModalOpen(true);
                        }}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredListings.length)} to {Math.min(currentPage * rowsPerPage, filteredListings.length)} of {filteredListings.length} results
          </div>
          <nav className="flex justify-center">
            <ul className="flex items-center space-x-1">
              <li>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
              </li>
              {[...Array(Math.ceil(filteredListings.length / rowsPerPage))].map((_, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === idx + 1 
                        ? 'bg-[#00a0d1] text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredListings.length / rowsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredListings.length / rowsPerPage)}
                  className="px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>      {/* Action modal using our component */}      <ListingActionsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        listingId={selectedListing || "0"}
      />

      {/* Floating Action Button for adding new listings */}
      <FloatingActionButton href="/dashboard/admin/commercial-listings/add" label="Add Listing" />
    </div>
  );
}
