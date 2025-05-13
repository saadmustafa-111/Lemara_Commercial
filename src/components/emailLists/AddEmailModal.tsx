"use client";

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface AddEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmails: (emails: string[], listName: string) => void;
}

const AddEmailModal: React.FC<AddEmailModalProps> = ({ isOpen, onClose, onAddEmails }) => {
  const [emails, setEmails] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { theme } = useTheme();

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listName.trim()) {
      setError('List name is required');
      return;
    }
    
    // For now, since we're mocking the functionality, we'll handle it like this:
    // In a real implementation, we would read and parse the CSV file
    
    if (file) {
      // In a real implementation, you would:
      // 1. Read the file content
      // 2. Parse the CSV to extract email addresses
      // 3. Validate each email
      
      // For demonstration purposes, we'll just use dummy data
      const mockEmails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
      onAddEmails(mockEmails, listName);
    } else {
      // If no file is selected, use the old method from text input
      // (keeping this as a fallback, but we could also show an error)
      const emailList = emails
        .split(/[\n,;]/)
        .map(email => email.trim())
        .filter(email => email.length > 0);
      
      if (emailList.length === 0 && !file) {
        setError('Please choose a CSV file with emails');
        return;
      }
      
      onAddEmails(emailList, listName);
    }
    
    setEmails('');
    setListName('');
    setFile(null);
    setError(null);
    onClose();
  };  
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-sm">
      <div className="fixed inset-0 bg-transparent"></div>
      <div className="relative w-full max-w-lg p-8 mx-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl z-10 border border-gray-200 dark:border-gray-800" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}>
        <div className="absolute top-6 right-6">
          <button
            onClick={onClose}
            className="text-gray-800 dark:text-white/90 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-[#00b9f1]">Upload Email List</h2>
        </div>
          <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-error-500/10 text-red-600 dark:text-error-400 text-sm rounded-md">
              {error}
            </div>
          )}
            <div className="mb-6">
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 rounded-full focus:outline-none focus:border-[#00b9f1] placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter the email list title here"
              required
            />
            </div>
            <div className="mb-6 relative">
            <div className="flex items-center justify-between rounded-full border border-gray-200 dark:border-gray-700 px-4 py-3">
              <span className="text-gray-500 dark:text-gray-400">{file ? file.name : 'No file chosen'}</span>
              <div className="absolute right-0 mr-4">
                <label 
                  htmlFor="fileUpload"
                  className="px-4 py-1 text-sm font-medium text-gray-700 dark:text-white/90 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  accept=".csv,.txt"
                />
              </div>
            </div>
            </div>
          <div className="mb-12">
            <a 
              href="/files/sample_email_list.csv" 
              download="sample_email_list.csv" 
              className="text-[#00b9f1] text-sm hover:underline flex items-center"
            >
              <span>Sample CSV</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 text-base font-medium text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmailModal;
