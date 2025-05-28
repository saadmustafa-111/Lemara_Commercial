"use client"
import { useState, useEffect, useMemo } from "react"
import { Search, Filter, Edit, Trash2, Eye, MoreHorizontal, Plus, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { CommercialListing } from '@/types'

export default function MLSListingsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [listings, setListings] = useState<CommercialListing[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [showArchived, setShowArchived] = useState(false)
  
  const rowsPerPageOptions = [10, 20, 30, 50]

  useEffect(() => {
    const fetchListings = async () => {
      setTimeout(() => {
        // Mock data based on the MLS listings from the image
        const mockListings: CommercialListing[] = [
          {
            id: '1',
            source: 'AJ Rana',
            name: '1225 S Mary AVE SUNNYVALE, California 94087',
            city: 'SUNNYVALE',
            listPrice: '125000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '2',
            source: 'AJ Rana',
            name: '1347 COLEMAN SANTA CLARA, California 95050',
            city: 'SANTA CLARA',
            listPrice: '135000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '3',
            source: 'AJ Rana',
            name: '930 W Hamilton CAMPBELL, California 95008',
            city: 'CAMPBELL',
            listPrice: '200000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '4',
            source: 'AJ Rana',
            name: '2114 Senter 11 B SAN JOSE, California 95112',
            city: 'SAN JOSE',
            listPrice: '190000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '5',
            source: 'AJ Rana',
            name: '452 E Lake AVE WATSONVILLE, California 95076',
            city: 'WATSONVILLE',
            listPrice: '400000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '6',
            source: 'AJ Rana',
            name: '17541 Vierra Canyon RD PRUNEDALE, California',
            city: 'PRUNEDALE',
            listPrice: '149000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '7',
            source: 'AJ Rana',
            name: '627 Main ST SUISUN CITY, California 94585',
            city: 'SUISUN CITY',
            listPrice: '350000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '8',
            source: 'AJ Rana',
            name: '431 Tyler ST MONTEREY, California 93940',
            city: 'MONTEREY',
            listPrice: '399000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '9',
            source: 'AJ Rana',
            name: '6950 Almaden Expy SAN JOSE, California 95120',
            city: 'SAN JOSE',
            listPrice: '170000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '10',
            source: 'AJ Rana',
            name: '8th S Mission & San Carlos CARMEL, California',
            city: 'CARMEL',
            listPrice: '190000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '11',
            source: 'AJ Rana',
            name: '1544 Sanborn SALINAS, California 93905',
            city: 'SALINAS',
            listPrice: '180000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '12',
            source: 'AJ Rana',
            name: '1120 Bird AVE SAN JOSE, California 95125',
            city: 'SAN JOSE',
            listPrice: '40000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '13',
            source: 'AJ Rana',
            name: 'Main ST SALINAS, California 93901',
            city: 'SALINAS',
            listPrice: '550000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '14',
            source: 'AJ Rana',
            name: '2180 Tully Road SAN JOSE, California 95122',
            city: 'SAN JOSE',
            listPrice: '120000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '15',
            source: 'AJ Rana',
            name: 'Address not disclosed SAN RAFAEL, California',
            city: 'SAN RAFAEL',
            listPrice: '333000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '16',
            source: 'AJ Rana',
            name: '960 FRONT ST SOLEDAD, California 93960',
            city: 'SOLEDAD',
            listPrice: '399000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '17',
            source: 'AJ Rana',
            name: '925 Blossom Hill Rd SAN JOSE, California 95123',
            city: 'SAN JOSE',
            listPrice: '125000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '18',
            source: 'AJ Rana',
            name: '925 Blossom Hill rd SAN JOSE, California 95123',
            city: 'SAN JOSE',
            listPrice: '175000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '19',
            source: 'AJ Rana',
            name: '2200 Eastridge Mall SAN JOSE, California 95122',
            city: 'SAN JOSE',
            listPrice: '175000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          },
          {
            id: '20',
            source: 'AJ Rana',
            name: '2200 Eastridge SAN JOSE, California 95122',
            city: 'SAN JOSE',
            listPrice: '150000.00',
            createDate: '11/7/2022 7:23 AM',
            reInc: 'N',
            documents: 'N',
            contacts: '0',
            img: '0',
            status: 'Active'
          }
        ];

        setListings(mockListings);
        setIsLoading(false);
      }, 1000);
    };

    fetchListings();
  }, []);

  // Filter and paginate data
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch = 
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.source.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || listing.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [listings, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredListings.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-500 p-2 rounded-lg mr-4">
            <Search className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold">MLS Listings</h1>
          <p className="text-gray-500 ml-2">Manage your real estate listings</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-5 h-5 mr-1" />
            Add Listing
          </button>
          <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 bg-white"
            >
              <option value="all">All Roles</option>
              <option value="agent">Agent</option>
              <option value="broker">Broker</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center space-x-1">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500 text-sm">Show:</span>
            <div className="border border-gray-300 rounded-lg py-1 px-2 bg-white">
              <span className="text-sm">{rowsPerPage} rows</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredListings.length} of {listings.length} listings
          </div>
        </div>
      </div>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          All Listings
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
          Featured
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
          Business
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
          Multi-Family
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
          Industrial
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
          Residential
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID#
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Source
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                City
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                List Price($)
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Modified Date
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Loading state
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-5"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <div className="h-4 bg-gray-200 rounded w-14"></div>
                    </td>
                    <td className="px-2 py-2 border border-gray-300 text-center">
                      <div className="h-4 bg-gray-200 rounded w-6 mx-auto"></div>
                    </td>
                  </tr>
                ))
            ) : (
              currentListings.map((listing, index) => {
                return (
                  <tr key={listing.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-4 py-3 text-sm">
                      {listing.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                          <img src={`/images/user/user-${parseInt(listing.id) % 5 + 1}.jpg`} alt={listing.source} className="h-full w-full object-cover" />
                        </div>
                        <span>{listing.source}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {listing.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {listing.city}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-green-600">
                      {formatCurrency(listing.listPrice)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-col">
                        <span>{listing.createDate.split(" ")[0]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <div className="flex justify-center space-x-1">
                        <button className="p-1 hover:bg-blue-50 rounded-full" title="View">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-blue-50 rounded-full" title="Edit">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-red-50 rounded-full" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
