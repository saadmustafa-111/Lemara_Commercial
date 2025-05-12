'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Contact, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const MyContacts = () => {
  const router = useRouter();
  
  // Sample data for contacts
  const contactsData = [
    { id: 1, name: "John Doe", title: "CEO", phone: "(555) 123-4567", email: "john.doe@example.com", company: "Tech Innovations" },
    { id: 2, name: "Jane Smith", title: "Marketing Director", phone: "(555) 234-5678", email: "jane.smith@example.com", company: "Global Marketing" },
    { id: 3, name: "Robert Johnson", title: "Sales Manager", phone: "(555) 345-6789", email: "robert.j@example.com", company: "Sales Pro Inc." },
    { id: 4, name: "Emily Davis", title: "HR Specialist", phone: "(555) 456-7890", email: "emily.d@example.com", company: "People First" },
    { id: 5, name: "Michael Brown", title: "CTO", phone: "(555) 567-8901", email: "michael.b@example.com", company: "Tech Solutions" },
    { id: 6, name: "Sarah Wilson", title: "Product Manager", phone: "(555) 678-9012", email: "sarah.w@example.com", company: "Product Experts" },
    { id: 7, name: "David Lee", title: "Financial Analyst", phone: "(555) 789-0123", email: "david.l@example.com", company: "Finance Plus" },
    { id: 8, name: "Lisa Taylor", title: "Operations Director", phone: "(555) 890-1234", email: "lisa.t@example.com", company: "Efficient Ops" },
    { id: 9, name: "Kevin Miller", title: "IT Manager", phone: "(555) 901-2345", email: "kevin.m@example.com", company: "IT Solutions" },
    { id: 10, name: "Amanda Clark", title: "Customer Service", phone: "(555) 012-3456", email: "amanda.c@example.com", company: "Support Masters" },
    { id: 11, name: "Thomas White", title: "Research Lead", phone: "(555) 234-5678", email: "thomas.w@example.com", company: "Innovation Labs" },
    { id: 12, name: "Jessica Brown", title: "Design Manager", phone: "(555) 345-6789", email: "jessica.b@example.com", company: "Creative Designs" },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter contacts based on search
  const filteredContacts = contactsData.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastContact = currentPage * rowsPerPage;
  const indexOfFirstContact = indexOfLastContact - rowsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle delete contact
  const handleDeleteContact = (id: number) => {
    // In a real app, you would call an API to delete the contact
    console.log(`Delete contact with ID: ${id}`);
  };

  // Handle edit contact
  const handleEditContact = (id: number) => {
    // In a real app, you would navigate to an edit page with this ID
    console.log(`Edit contact with ID: ${id}`);
    router.push(`/dashboard/agent/editcontact/${id}`);
  };

  return (
    <>
      <div className='flex flex-col gap-4 w-full p-4 dark:bg-gray-900'>
        <div className='flex items-center gap-3'>
          <span><Contact size={50} color="#06AED7" /></span>
          <h1 className='text-[32px] text-[#06AED7] font-bold dark:text-[#00c1f5]'>
            My Contacts
          </h1>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-8 py-3 w-full max-w-md">
            <Search className="text-[#06AED7] dark:text-[#00c1f5] mr-2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or location"
              className="bg-transparent outline-none border-none text-sm w-full text-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="ml-4 text-black dark:text-white bg-white dark:bg-gray-800 px-8 py-3 border border-black dark:border-gray-600 rounded-full transition-all duration-300 hover:bg-[#06AED7] dark:hover:bg-[#0590b3] hover:text-white hover:border-[#06AED7] dark:hover:border-[#0590b3]">
            Actions
          </button>
        </div>

        <div className='flex items-center gap-3.5'>
          <button className="ml-4 text-black dark:text-white bg-white dark:bg-gray-800 px-8 py-3 border border-black dark:border-gray-600 rounded-full transition-all duration-300 hover:bg-[#06AED7] dark:hover:bg-[#0590b3] hover:text-white hover:border-[#06AED7] dark:hover:border-[#0590b3]">
            Create Group
          </button>
          <button onClick={() => router.push('/dashboard/agent/addcontact')} className="ml-4 text-black dark:text-white bg-white dark:bg-gray-800 px-8 py-3 border border-black dark:border-gray-600 rounded-full transition-all duration-300 hover:bg-[#06AED7] dark:hover:bg-[#0590b3] hover:text-white hover:border-[#06AED7] dark:hover:border-[#0590b3]">
            Create New Contact
          </button>        
        </div>

        {/* Contacts Table */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{contact.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{contact.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{contact.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEditContact(contact.id)}
                          className="text-[#06AED7] hover:text-[#048eb1] transition-colors dark:text-[#00c1f5] dark:hover:text-[#00a9d9]"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-500 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                  currentPage === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                  currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{indexOfFirstContact + 1}</span> to{" "}
                  <span className="font-medium">
                    {indexOfLastContact > filteredContacts.length ? filteredContacts.length : indexOfLastContact}
                  </span>{" "}
                  of <span className="font-medium">{filteredContacts.length}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <label className="mr-2 text-sm text-gray-700 dark:text-gray-300">Rows per page:</label>
                  <select 
                    value={rowsPerPage} 
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page when changing rows per page
                    }}
                    className="border border-gray-300 dark:border-gray-600 rounded-md text-sm p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                        currentPage === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                          currentPage === number
                            ? 'z-10 bg-[#06AED7] dark:bg-[#0590b3] text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                        currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyContacts