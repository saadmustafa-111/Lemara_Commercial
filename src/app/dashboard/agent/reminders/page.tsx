"use client"

import { useState, useEffect } from "react"
import AddReminderModal from "@/components/agentDashboard/AddReminderModal"
import axiosInstance from "@/lib/axios" // Import the axios instance

// Define types for the reminder data based on the API response
interface Reminder {
  id?: string
  title: string
  notifications: string
  priority: "Low" | "Medium" | "High"
  startDate: string
  time: string
  status?: "In Progress" | "Completed"
  snoozed?: boolean
}

export default function RemindersPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Completed">("Upcoming")
  // State for reminders
  const [reminders, setReminders] = useState<Reminder[]>([])
  // State for snoozed reminders
  const [snoozedReminders, setSnoozedReminders] = useState<Reminder[]>([])
  // Loading and error states
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // State to track which reminder's dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  // Format time for display (assuming time is in 24-hour format like "1200" for 12:00)
  const formatTime = (timeString: string): string => {
    if (!timeString || timeString.length !== 4) return ""

    const hours = Number.parseInt(timeString.substring(0, 2))
    const minutes = timeString.substring(2, 4)
    const period = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12

    return `${displayHours}:${minutes} ${period}`
  }

  // Fetch reminders from API
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await axiosInstance.get("/reminders")

        if (response.data) {
          // Ensure each reminder has an id and status if not provided by API
          const processedReminders = response.data.map((reminder: Reminder, index: number) => ({
            ...reminder,
            id: reminder.id || `temp-${index}`,
            status: reminder.status || "In Progress",
          }))

          // Set the reminders from the API response
          setReminders(processedReminders.filter((reminder: Reminder) => !reminder.snoozed))
          // Set snoozed reminders separately if your API provides that information
          setSnoozedReminders(processedReminders.filter((reminder: Reminder) => reminder.snoozed))
        }
      } catch (err) {
        console.error("Error fetching reminders:", err)
        setError("Failed to load reminders. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReminders()
  }, [])

  // Function to mark a reminder as done
  const markAsDone = async (id: string) => {
    try {
      await axiosInstance.patch(`/reminders/${id}`, { status: "Completed" })

      // Update local state after successful API call
      setReminders((prev) =>
        prev.map((reminder) => (reminder.id === id ? { ...reminder, status: "Completed" } : reminder)),
      )
    } catch (err) {
      console.error("Error marking reminder as done:", err)
      // You could add a toast notification here for error feedback
    }
  }

  // Function to toggle dropdown menu
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  // Function to handle snooze action
  const handleSnooze = async (id: string, duration: string) => {
    try {
      // Close dropdown
      setActiveDropdown(null)

      // Call API to snooze the reminder
      await axiosInstance.post(`/reminders/${id}/snooze`, { duration })

      // Move the reminder to snoozed list in the UI
      const reminderToSnooze = reminders.find((r) => r.id === id)
      if (reminderToSnooze) {
        setReminders((prev) => prev.filter((r) => r.id !== id))
        setSnoozedReminders((prev) => [...prev, { ...reminderToSnooze, snoozed: true }])
      }
    } catch (err) {
      console.error(`Error snoozing reminder ${id}:`, err)
      // You could add a toast notification here for error feedback
    }
  }

  // Function to delete a reminder
  const deleteReminder = async (id: string) => {
    try {
      await axiosInstance.delete(`/reminders/${id}`)

      // Update both reminders and snoozed reminders lists
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
      setSnoozedReminders((prev) => prev.filter((reminder) => reminder.id !== id))
      setActiveDropdown(null)
    } catch (err) {
      console.error("Error deleting reminder:", err)
      // You could add a toast notification here for error feedback
    }
  } // State for reminder modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // State to track the reminder being edited
  const [reminderToEdit, setReminderToEdit] = useState<{
    id: string
    title: string
    startDate: string
    time: string
    priority: string
    notifications: string
  } | null>(null)

  // Function to add a new reminder
  const addNewReminder = () => {
    setReminderToEdit(null) // Reset any reminder that was being edited
    setIsModalOpen(true)
  }

  // Function to edit a reminder
  const editReminder = (reminder: Reminder) => {
    if (!reminder.id) return

    setReminderToEdit({
      id: reminder.id,
      title: reminder.title,
      startDate: reminder.startDate,
      time: reminder.time,
      priority: reminder.priority,
      notifications: reminder.notifications,
    })
    setIsModalOpen(true)
    // Close dropdown if open
    setActiveDropdown(null)
  }

  // Function to handle saving a new reminder or updating an existing one
  const handleSaveReminder = async (reminderData: any) => {
    try {
      if (reminderData.id) {
        // Editing an existing reminder
        const response = await axiosInstance.put(`/reminders/${reminderData.id}`, reminderData)

        // Update local state with the response data
        setReminders((prev) => prev.map((reminder) => (reminder.id === reminderData.id ? response.data : reminder)))

        // Also update in snoozed reminders if it exists there
        setSnoozedReminders((prev) =>
          prev.map((reminder) => (reminder.id === reminderData.id ? response.data : reminder)),
        )
      } else {
        // Adding a new reminder
        const response = await axiosInstance.post("/reminders", {
          title: reminderData.title || "Untitled Reminder",
          notifications: reminderData.notifications || "EMAIL",
          startDate: reminderData.startDate || new Date().toISOString(),
          time: reminderData.time || "0900",
          priority: reminderData.priority || "Low",
          status: "In Progress",
        })

        // Add the new reminder from the response to the list
        setReminders((prev) => [...prev, response.data])
      }

      // Reset the reminder being edited
      setReminderToEdit(null)
    } catch (err) {
      console.error("Error saving reminder:", err)
      // You could add a toast notification here for error feedback
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      {" "}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl  text-blue-500 dark:text-white flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#00a0d1]"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 01-3.46 0"></path>
          </svg>
          Reminders
        </h1>
        <button
          onClick={addNewReminder}
          className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Add New Reminder
        </button>
      </div>
      <div className="mb-6 flex">
        <div className="flex overflow-hidden rounded-md">
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`px-10 py-3 text-center ${
              activeTab === "Upcoming"
                ? "bg-[#00a0d1] text-white font-medium"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("Completed")}
            className={`px-10 py-3 text-center ${
              activeTab === "Completed"
                ? "bg-[#00a0d1] text-white font-medium"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 border border-red-200 dark:border-red-700 rounded-lg p-6 mb-4 bg-red-50 dark:bg-red-900/20">
          <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Reminders List */}
            {activeTab === "Upcoming" ? (
              // Show upcoming reminders
              reminders.filter((reminder) => reminder.status !== "Completed").length > 0 ? (
                reminders
                  .filter((reminder) => reminder.status !== "Completed")
                  .map((reminder) => (
                    <div
                      key={reminder.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{reminder.title}</h3>
                        <button
                          onClick={() => reminder.id && markAsDone(reminder.id)}
                          className="flex items-center text-blue-500 hover:text-blue-600"
                        >
                          <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Mark as Done
                        </button>
                      </div>{" "}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-5">
                        You will get a notification reminder on the day or time that you selected!
                      </p>
                      <div className="flex flex-col border-t border-gray-100 pt-4">
                        <div className="mb-3">
                          <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                            {reminder.notifications}
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              {formatDate(reminder.startDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              {formatTime(reminder.time)}
                            </span>
                          </div>
                          <span
                            className={`text-${reminder.priority === "High" ? "red" : reminder.priority === "Medium" ? "orange" : "blue"}-500 font-medium text-sm`}
                          >
                            {reminder.priority}
                          </span>{" "}
                          <span className="px-3 py-1 bg-orange-50 text-orange-500 border border-orange-100 rounded-full text-sm">
                            {reminder.status}
                          </span>
                          <div className="relative">
                            <button
                              className="text-blue-500 hover:text-blue-600 ml-70"
                              onClick={() => reminder.id && toggleDropdown(reminder.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                            {reminder.id && activeDropdown === reminder.id && (
                              <div className="absolute right-0 mt-2 w-30 h-30 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-blue-600 z-10">
                                <div>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    onClick={() => editReminder(reminder)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    onClick={() => reminder.id && deleteReminder(reminder.id)}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    onClick={() => reminder.id && handleSnooze(reminder.id, "custom")}
                                  >
                                    Snooze It
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>{" "}
                        </div>
                      </div>{" "}
                    </div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400">No upcoming reminders.</p>
                  <p className="text-gray-500 dark:text-gray-500 mt-2">Add a new reminder to get started.</p>
                </div>
              )
            ) : // Show completed reminders
            reminders.filter((reminder) => reminder.status === "Completed").length > 0 ? (
              reminders
                .filter((reminder) => reminder.status === "Completed")
                .map((reminder) => (
                  <div
                    key={reminder.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">{reminder.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-5">
                      You will get a notification reminder on the day or time that you selected!
                    </p>
                    <div className="flex flex-col border-t border-gray-100 pt-4">
                      <div className="mb-3">
                        <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                          {reminder.notifications}
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {formatDate(reminder.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{formatTime(reminder.time)}</span>
                        </div>
                        <span
                          className={`text-${reminder.priority === "High" ? "red" : reminder.priority === "Medium" ? "orange" : "blue"}-500 font-medium text-sm`}
                        >
                          {reminder.priority}
                        </span>{" "}
                        <span className="px-3 py-1 bg-green-50 text-green-500 border border-green-100 rounded-full text-sm">
                          {reminder.status}
                        </span>
                        <div className="relative">
                          <button
                            className="text-blue-500 hover:text-blue-600 ml-70"
                            onClick={() => reminder.id && toggleDropdown(reminder.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          {reminder.id && activeDropdown === reminder.id && (
                            <div className="absolute right-0 mt-2 w-30 h-30 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-blue-600 z-10">
                              <div>
                                <button
                                  className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  onClick={() => editReminder(reminder)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  onClick={() => reminder.id && deleteReminder(reminder.id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  onClick={() => reminder.id && handleSnooze(reminder.id, "custom")}
                                >
                                  Snooze It
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  You haven't completed any of your reminders yet!
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">Completed Reminders will appear here once done.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {" "}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Snooze Reminder</h3>
              <hr className="mb-4 border-gray-200 dark:border-gray-700" />

              {snoozedReminders.length > 0 ? (
                snoozedReminders.map((reminder) => (
                  <div key={reminder.id} className="mb-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">{reminder.title}</h4>{" "}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-1.5 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {formatDate(reminder.startDate)}
                        </span>
                      </div>
                      <div className="relative">
                        <button
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => reminder.id && toggleDropdown(reminder.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        {reminder.id && activeDropdown === reminder.id && (
                          <div className="absolute right-0 mt-2 w-50 h-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-blue-600 z-10">
                            <div className="py-1 bg-red-50 dark:bg-red-900/20">
                              <button
                                className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => reminder.id && handleSnooze(reminder.id, "15 Minutes")}
                              >
                                Snooze For 15 Minutes
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => reminder.id && handleSnooze(reminder.id, "30 Minutes")}
                              >
                                Snooze For 30 Minutes
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => reminder.id && handleSnooze(reminder.id, "1 Hour")}
                              >
                                Snooze For 1 Hour
                              </button>
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-700">
                              <button
                                className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => editReminder(reminder)}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => reminder.id && deleteReminder(reminder.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">No snoozed reminders</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}{" "}
      {/* Add/Edit Reminder Modal */}
      <AddReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReminder}
        reminderToEdit={reminderToEdit}
      />
    </div>
  )
}
