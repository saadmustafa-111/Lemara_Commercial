"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AddReminderModal from '@/components/agentDashboard/AddReminderModal';

// Define types for the reminder data
interface Reminder {
  id: string;
  title: string;
  notes: string;
  date: string;
  priority: 'Low' | 'Medium' | 'Hight';
  status: 'In Progress' | 'Completed';
}

export default function RemindersPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');
  // State for reminders
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Green House, Salinas',
      notes: 'Notes: will get a notification reminder on the day or time that you selected!',
      date: 'Feb 21, 2024',
      priority: 'Hight',
      status: 'In Progress'
    },
    {
      id: '2',
      title: 'daily meet up',
      notes: 'Notes: will get a notification reminder on the day or time that you selected!',
      date: 'Jan 01, 1900',
      priority: 'Low',
      status: 'In Progress'
    }
  ]);
    // State for snoozed reminders
  const [snoozedReminders, setSnoozedReminders] = useState<Reminder[]>([
    {
      id: '3',
      title: 'daily meet up',
      notes: '',
      date: 'Jan 01, 1900',
      priority: 'Low',
      status: 'In Progress'
    }
  ]);
  
  // State to track which reminder's dropdown is open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Function to mark a reminder as done
  const markAsDone = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, status: 'Completed' } 
          : reminder
      )
    );
  };
  
  // Function to toggle dropdown menu
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  // Function to handle snooze action
  const handleSnooze = (id: string, duration: string) => {
    // Close dropdown
    setActiveDropdown(null);
    
    // Here you would implement the snooze logic
    console.log(`Snoozing reminder ${id} for ${duration}`);
  };
  
  // Function to delete a snoozed reminder
  const deleteReminder = (id: string) => {
    setSnoozedReminders(prev => prev.filter(reminder => reminder.id !== id));
    setActiveDropdown(null);
  };
  // State for reminder modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new reminder
  const addNewReminder = () => {
    setIsModalOpen(true);
  };
  
  // Function to handle saving a new reminder
  const handleSaveReminder = (reminderData: any) => {
    // Create a new reminder with the data
    const newReminder: Reminder = {
      id: (reminders.length + 1).toString(),
      title: reminderData.title || 'Untitled Reminder',
      notes: 'Notes: will get a notification reminder on the day or time that you selected!',
      date: reminderData.date || 'No date selected',
      priority: reminderData.priority as 'Low' | 'Medium' | 'Hight',
      status: 'In Progress'
    };
    
    // Add the new reminder to the list
    setReminders(prev => [...prev, newReminder]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900">      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl  text-blue-500 dark:text-white flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00a0d1]">
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
      </div><div className="mb-6 flex">
        <div className="flex overflow-hidden rounded-md">
          <button
            onClick={() => setActiveTab('Upcoming')}
            className={`px-10 py-3 text-center ${
              activeTab === 'Upcoming'
                ? 'bg-[#00a0d1] text-white font-medium'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('Completed')}
            className={`px-10 py-3 text-center ${
              activeTab === 'Completed'
                ? 'bg-[#00a0d1] text-white font-medium'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Reminders List */}
          {activeTab === 'Upcoming' ? (
            // Show upcoming reminders
            reminders.filter(reminder => reminder.status !== 'Completed').length > 0 ? (
              reminders
                .filter(reminder => reminder.status !== 'Completed')
                .map(reminder => (
            
            <div key={reminder.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{reminder.title}</h3>
                <button 
                  onClick={() => markAsDone(reminder.id)}
                  className="flex items-center text-blue-500 hover:text-blue-600"
                >
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mark as Done
                </button>
              </div>              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-5">{reminder.notes}</p>
                <div className="flex flex-col border-t border-gray-100 pt-4">
                <div className="mb-3">
                  <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                    EMAIL
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
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{reminder.date}</span>
                  </div>
                  <span className={`text-${reminder.priority === 'Hight' ? 'red' : reminder.priority === 'Medium' ? 'orange' : 'blue'}-500 font-medium text-sm`}>
                    {reminder.priority}
                  </span>                  <span className="px-3 py-1 bg-orange-50 text-orange-500 border border-orange-100 rounded-full text-sm">
                    {reminder.status}
                  </span>                  
                  <button className="text-blue-500 hover:text-blue-600 ml-70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>                </div>
              </div>            </div>
                ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">No upcoming reminders.</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                  Add a new reminder to get started.
                </p>
              </div>
            )
          ) : (
            // Show completed reminders
            reminders.filter(reminder => reminder.status === 'Completed').length > 0 ? (
              reminders
                .filter(reminder => reminder.status === 'Completed')
                .map(reminder => (
                  <div key={reminder.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">{reminder.title}</h3>
                    </div>              
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-5">{reminder.notes}</p>
                      <div className="flex flex-col border-t border-gray-100 pt-4">
                      <div className="mb-3">
                        <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                          EMAIL
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
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{reminder.date}</span>
                        </div>
                        <span className={`text-${reminder.priority === 'Hight' ? 'red' : reminder.priority === 'Medium' ? 'orange' : 'blue'}-500 font-medium text-sm`}>
                          {reminder.priority}
                        </span>
                        <span className="px-3 py-1 bg-green-50 text-green-500 border border-green-100 rounded-full text-sm">
                          {reminder.status}
                        </span>                  
                        <button className="text-blue-500 hover:text-blue-600 ml-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-400">You haven't completed any of your reminders yet!</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                  Completed Reminders will appear here once done.
                </p>
              </div>
            )
          )}
        </div>
        
        <div className="lg:col-span-1">          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Snooze Reminder</h3>
            <hr className="mb-4 border-gray-200 dark:border-gray-700" />
            
            {snoozedReminders.map(reminder => (
              <div key={reminder.id} className="mb-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">{reminder.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{reminder.date}</span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 110-4 2 2 0 010 4zM12 10a2 2 0 110-4 2 2 0 010 4zM18 10a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      
      {/* Add Reminder Modal */}
      <AddReminderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReminder}
      />
    </div>
  );
}
