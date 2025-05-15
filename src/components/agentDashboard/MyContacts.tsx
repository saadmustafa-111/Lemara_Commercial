"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Contact, Search, Pencil, Trash2, ChevronLeft, ChevronRight, X, Edit, Users } from "lucide-react"

const MyContacts = () => {
  const router = useRouter()

  // Sample data for contacts
  const contactsData = [
    {
      id: 1,
      name: "John Doe",
      title: "CEO",
      phone: "(555) 123-4567",
      email: "john.doe@example.com",
      company: "Tech Innovations",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Marketing Director",
      phone: "(555) 234-5678",
      email: "jane.smith@example.com",
      company: "Global Marketing",
    },
    {
      id: 3,
      name: "Robert Johnson",
      title: "Sales Manager",
      phone: "(555) 345-6789",
      email: "robert.j@example.com",
      company: "Sales Pro Inc.",
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "HR Specialist",
      phone: "(555) 456-7890",
      email: "emily.d@example.com",
      company: "People First",
    },
    {
      id: 5,
      name: "Michael Brown",
      title: "CTO",
      phone: "(555) 567-8901",
      email: "michael.b@example.com",
      company: "Tech Solutions",
    },
    {
      id: 6,
      name: "Sarah Wilson",
      title: "Product Manager",
      phone: "(555) 678-9012",
      email: "sarah.w@example.com",
      company: "Product Experts",
    },
    {
      id: 7,
      name: "David Lee",
      title: "Financial Analyst",
      phone: "(555) 789-0123",
      email: "david.l@example.com",
      company: "Finance Plus",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      title: "Operations Director",
      phone: "(555) 890-1234",
      email: "lisa.t@example.com",
      company: "Efficient Ops",
    },
    {
      id: 9,
      name: "Kevin Miller",
      title: "IT Manager",
      phone: "(555) 901-2345",
      email: "kevin.m@example.com",
      company: "IT Solutions",
    },
    {
      id: 10,
      name: "Amanda Clark",
      title: "Customer Service",
      phone: "(555) 012-3456",
      email: "amanda.c@example.com",
      company: "Support Masters",
    },
    {
      id: 11,
      name: "Thomas White",
      title: "Research Lead",
      phone: "(555) 234-5678",
      email: "thomas.w@example.com",
      company: "Innovation Labs",
    },
    {
      id: 12,
      name: "Jessica Brown",
      title: "Design Manager",
      phone: "(555) 345-6789",
      email: "jessica.b@example.com",
      company: "Creative Designs",
    },
  ]

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")

  // State for create group popup
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showEditGroupModal, setShowEditGroupModal] = useState(false)
  const [name, setname] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const [isLoadingContacts, setIsLoadingContacts] = useState(false)
  const [contacts, setContacts] = useState([])
  // State for actions dropdown
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)

  const [isLoadingGroups, setIsLoadingGroups] = useState(false);
  const [apiError,setApiError]=useState(null)
  // State for contact groups
  const [contactGroups, setContactGroups] = useState([])

  // State for selected group
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  
  // State for notification
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // State for showing delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null)

  // State for showing delete contact confirmation modal
  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<number | null>(null)

  // Filter contacts based on search and selected group
  const filteredContacts = contactsData.filter((contact) => {
    // First check if name or company contains search term
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())

    // If a group is selected, only show contacts in that group
    if (selectedGroup) {
      const group = contactGroups.find((g) => g.id === selectedGroup)
      return matchesSearch && group && group.contacts.includes(contact.id)
    }

    return matchesSearch
  })

  // Calculate pagination
  const indexOfLastContact = currentPage * rowsPerPage
  const indexOfFirstContact = indexOfLastContact - rowsPerPage
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact)
  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage)
  // / Add this useEffect to fetch groups when component mounts
  useEffect(() => {
    fetchGroups()
  }, [])
  useEffect(() => {
    fetchContacts()
  }, [])
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedGroup])
  // Function to fetch groups from API
  const fetchGroups = async () => {
    setIsLoadingGroups(true)
    setApiError(null)
  
    try {
      const response = await fetch("http://192.168.1.5:3000/contacts/group", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        const dataArray = Array.isArray(data) ? data : [data];
        const formattedGroups = dataArray.map((group) => ({
          id: group.id,
          title: group.name || "Untitled Group",
          contacts: [],
        }));
        setContactGroups(formattedGroups)
        console.log("Groups loaded:", formattedGroups); 
      }
      else {
        setApiError(data.error || 'Failed to Load Contacts')
      }
    }
    catch (error) {
      setApiError(error.message || 'Failed to Load Contacts')
    }
    finally {
      setIsLoadingGroups(false)
    }
  }
  const fetchContacts = async () => {
    setIsLoadingContacts(true)
    setApiError(null)
  
    try {
      const response = await fetch("http://192.168.1.5:3000/contacts", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
  
      const data = await response.json()
  
      if (response.ok) {
        const dataArray = Array.isArray(data) ? data : [data]
        const formattedContacts = dataArray.map((contact) => ({
          id: contact.id,
          firstName: contact.firstName || "Unnamed Contact",
          lastName: contact.lastName || "",
          title: contact.title || "",
          phone: contact.mobileNumber || "",
          email: contact.email || "",
          company: contact.companyTitle || "",
        }))
        setContacts(formattedContacts)
        console.log("Contacts loaded:", formattedContacts)
      } else {
        setApiError(data.error || 'Failed to load contacts')
      }
    } catch (error) {
      setApiError(error.message || 'Failed to load contacts')
    } finally {
      setIsLoadingContacts(false)
    }
  }
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle delete contact
  const handleDeleteContact = (id: number) => {
    setContactToDelete(id)
    setShowDeleteContactModal(true)
  }

  // Handle edit contact
  const handleEditContact = (id: number) => {
    // In a real app, you would navigate to an edit page with this ID
    console.log(`Edit contact with ID: ${id}`)
    router.push(`/dashboard/agent/editcontact/${id}`)
  }

  // Handle create group
  const handleCreateGroup = async () => {
    if (name.trim()) {
      try {
        // Call the API endpoint through Next.js API route
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Adding token directly here too
          },
          body: JSON.stringify({ 
            name: name 
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          console.log('Group created successfully:', data);
          
          // Add the new group to the local state
          const newGroup = {
            id: contactGroups.length + 1,
            title: name,
            contacts: [],
          }

          setContactGroups([...contactGroups, newGroup])
          setname("")
          setShowGroupModal(false)
          
          // Show success notification
          setNotification({
            show: true,
            message: 'Group created successfully!',
            type: 'success'
          });
          
          // Hide notification after 3 seconds
          setTimeout(() => {
            setNotification({ show: false, message: '', type: 'success' });
          }, 3000);
        } else {
          console.error('Failed to create group:', data);
          
          // Show detailed error notification
          setNotification({
            show: true,
            message: data.error || data.details?.message || 'Failed to create group. Please try again.',
            type: 'error'
          });
          
          // Hide notification after 3 seconds
          setTimeout(() => {
            setNotification({ show: false, message: '', type: 'success' });
          }, 3000);
        }
      } catch (error) {
        console.error('Error creating group:', error);
        
        // Show error notification
        setNotification({
          show: true,
          message: 'Error creating group. Please try again.',
          type: 'error'
        });
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification({ show: false, message: '', type: 'success' });
        }, 3000);
      }
    }
  }

  // Handle edit group
  const handleEditGroup = () => {
    if (name.trim() && selectedGroupId) {
      // In a real app, you would call an API to update the group
      const updatedGroups = contactGroups.map((group) => {
        if (group.id === selectedGroupId) {
          return { ...group, title: name }
        }
        return group
      })

      setContactGroups(updatedGroups)
      setname("")
      setSelectedGroupId(null)
      setShowEditGroupModal(false)
    }
  }

  // Open edit group modal
  const openEditGroupModal = (group: { id: number; title: string; contacts: number[] }) => {
    setSelectedGroupId(group.id)
    setname(group.title)
    setShowEditGroupModal(true)
    setShowActionsDropdown(false)
  }

  // Handle delete group
  const confirmDeleteGroup = () => {
    if (groupToDelete) {
      // In a real app, you would call an API to delete the group
      const updatedGroups = contactGroups.filter((group) => group.id !== groupToDelete)
      setContactGroups(updatedGroups)

      // If the deleted group was selected, clear the selection
      if (selectedGroup === groupToDelete) {
        setSelectedGroup(null)
      }

      setGroupToDelete(null)
      setShowDeleteModal(false)
    }
  }

  // Confirm contact deletion
  const confirmDeleteContact = () => {
    if (contactToDelete) {
      // In a real app, you would call an API to delete the contact
      console.log(`Deleting contact with ID: ${contactToDelete}`)
      // Here you would typically make an API call to delete the contact
      // For now, we'll just close the modal
      setContactToDelete(null)
      setShowDeleteContactModal(false)
    }
  }

  // Open delete confirmation modal
  const openDeleteModal = (groupId: number) => {
    setGroupToDelete(groupId)
    setShowDeleteModal(true)
    setShowActionsDropdown(false)
  }

  // Handle group selection
  const handleGroupSelection = (groupId: number) => {
    if (selectedGroup === groupId) {
      // If clicking the same group, clear selection
      setSelectedGroup(null)
    } else {
      setSelectedGroup(groupId)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-full p-4 dark:bg-gray-900">
        {/* Notification */}
 
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md flex items-center ${
            notification.type === 'success' 
              ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border-l-4 border-green-500' 
              : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 border-l-4 border-red-500'
          }`}>
            <div className="mr-3">
              {notification.type === 'success' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </div>
            <div className="flex-1">{notification.message}</div>
            <button 
              onClick={() => setNotification({ ...notification, show: false })}
              className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <span>
            <Contact size={50} color="#06AED7" />
          </span>
          <h1 className="text-3xl text-[#06AED7] font-bold dark:text-[#00c1f5]">My Contacts</h1>
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
          <div className="relative ml-4">
            <button
              onClick={() => setShowActionsDropdown(!showActionsDropdown)}
              className="text-black dark:text-white bg-white dark:bg-gray-800 px-8 py-3 border border-black dark:border-gray-600 rounded-full transition-all duration-300 hover:bg-[#06AED7] dark:hover:bg-[#0590b3] hover:text-white hover:border-[#06AED7] dark:hover:border-[#0590b3]"
            >
              Actions
            </button>

            {/* Actions Dropdown */}
            {showActionsDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
                {contactGroups.length > 0 && selectedGroup && (
                  <>
                    <button
                      onClick={() => {
                        const group = contactGroups.find((g) => g.id === selectedGroup)
                        if (group) openEditGroupModal(group)
                      }}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit Group
                    </button>
                    <button
                      onClick={() => openDeleteModal(selectedGroup)}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Group
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  </>
                )}
                <button
                  onClick={() => {
                    setShowActionsDropdown(false)
                    setShowGroupModal(true)
                  }}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Users size={16} className="mr-2" />
                  Create Group
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Group buttons */}
        <div className="flex flex-wrap gap-3 mt-2">
  {isLoadingGroups ? (
    <div className="flex items-center text-gray-500 dark:text-gray-400">
      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading groups...
    </div>
  ) : apiError ? (
    <div className="text-red-500 dark:text-red-400 flex items-center">
      <span className="mr-2">⚠️</span> {apiError}
      <button 
        onClick={fetchGroups} 
        className="ml-2 text-[#06AED7] dark:text-[#00c1f5] hover:underline"
      >
        Retry
      </button>
    </div>
  ) : contactGroups.length === 0 ? (
    <div className="text-gray-500 dark:text-gray-400">
      No groups available. Create your first group!
    </div>
  ) : (
    <>
      {contactGroups.map((group) => (
        <button
          key={group.id}
          onClick={() => handleGroupSelection(group.id)}
          className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-all duration-300 ${
            selectedGroup === group.id
              ? "bg-[#06AED7] text-white border-[#06AED7] dark:bg-[#0590b3] dark:border-[#0590b3]"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
          }`}
        >
          <Users size={16} />
          {group.title}
          {selectedGroup === group.id && (
            <span className="ml-1 text-xs bg-white text-[#06AED7] dark:bg-gray-800 dark:text-[#00c1f5] rounded-full px-2 py-0.5">
              {group.contacts.length}
            </span>
          )}
        </button>
      ))}
    </>
  )}

  <button
    onClick={() => setShowGroupModal(true)}
    className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-[#06AED7] hover:text-[#06AED7] dark:hover:border-[#00c1f5] dark:hover:text-[#00c1f5] flex items-center gap-2 transition-colors"
  >
    <span>+</span> Create New Group
  </button>
</div>
        {selectedGroup && (
          <div className="flex items-center mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing contacts in group:
              <span className="font-medium ml-1 text-[#06AED7] dark:text-[#00c1f5]">
                {contactGroups.find((g) => g.id === selectedGroup)?.title}
              </span>
            </p>
            <button
              onClick={() => setSelectedGroup(null)}
              className="ml-2 text-sm text-[#06AED7] dark:text-[#00c1f5] hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        <div className="flex items-center gap-3.5 mt-2">
          <button
            onClick={() => router.push("/dashboard/agent/addcontact")}
            className="text-black dark:text-white bg-white dark:bg-gray-800 px-8 py-3 border border-black dark:border-gray-600 rounded-full transition-all duration-300 hover:bg-[#06AED7] dark:hover:bg-[#0590b3] hover:text-white hover:border-[#06AED7] dark:hover:border-[#0590b3]"
          >
            Create New Contact
          </button>
        </div>

        {/* Contacts Table */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    FirstName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    LastName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
  {contacts.length > 0 ? (
    contacts.map((contact) => (
      <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {contact.firstName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {contact.lastName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          {contact.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          {contact.phone}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          {contact.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          {contact.company}
        </td>
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
    ))
  ) : (
    <tr>
      <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
        No contacts found
      </td>
    </tr>
  )}
</tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {currentContacts.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                        setRowsPerPage(Number(e.target.value))
                        setCurrentPage(1) // Reset to first page when changing rows per page
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
                          currentPage === 1
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                              ? "z-10 bg-[#06AED7] dark:bg-[#0590b3] text-white"
                              : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                          currentPage === totalPages
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
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
          )}
        </div>
      </div>

      {/* Create Group Modal with Backdrop Blur */}
      {showGroupModal && (
        <>
          {/* Backdrop blur overlay */}
          <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-lg pointer-events-auto border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#06AED7] dark:bg-[#0590b3] rounded-full p-2 text-white">
                    <Contact size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Group</h3>
                </div>
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Enter the title for your new group
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                  placeholder="E.g., VIP Clients, Marketing Team, etc."
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Create a descriptive name to easily identify your contact group
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="px-6 py-3 bg-[#06AED7] dark:bg-[#0590b3] text-white rounded-lg hover:bg-[#048eb1] dark:hover:bg-[#047a96] transition-colors font-medium"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Group Modal with Backdrop Blur */}
      {showEditGroupModal && (
        <>
          {/* Backdrop blur overlay */}
          <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-lg pointer-events-auto border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#06AED7] dark:bg-[#0590b3] rounded-full p-2 text-white">
                    <Edit size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Group</h3>
                </div>
                <button
                  onClick={() => setShowEditGroupModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              <div className="mb-6">
                <label
                  htmlFor="editGroupTitle"
                  className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Edit group title
                </label>
                <input
                  type="text"
                  id="editGroupTitle"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06AED7] dark:focus:ring-[#00c1f5] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                  placeholder="Enter group title"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditGroupModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditGroup}
                  className="px-6 py-3 bg-[#06AED7] dark:bg-[#0590b3] text-white rounded-lg hover:bg-[#048eb1] dark:hover:bg-[#047a96] transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Group Confirmation Modal */}
      {showDeleteModal && (
        <>
          {/* Backdrop blur overlay */}
          <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md pointer-events-auto border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 rounded-full p-2 text-white">
                    <Trash2 size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Delete Group</h3>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              <div className="mb-6">
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete this group? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteGroup}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Contact Confirmation Modal */}
      {showDeleteContactModal && (
        <>
          {/* Backdrop blur overlay */}
          <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md pointer-events-auto border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 rounded-full p-2 text-white">
                    <Trash2 size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Delete Contact</h3>
                </div>
                <button
                  onClick={() => setShowDeleteContactModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              <div className="mb-6">
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete this contact? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteContactModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteContact}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MyContacts
