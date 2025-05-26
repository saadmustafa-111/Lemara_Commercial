"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import axiosInstance from '@/lib/axios'; // Adjust path as needed

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  // Optional: Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listName.trim()) {
      setError('List name is required');
      return;
    }

    if (!file) {
      setError('Please choose a CSV file with emails');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', listName.trim()); // Changed from 'listName' to 'name'

      // Send POST request using axios instance
      const response = await axiosInstance.post('/email-list', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;
      
      // If your API returns the processed emails, use them
      // Otherwise, you might need to parse the file locally for the callback
      if (result.emails && Array.isArray(result.emails)) {
        onAddEmails(result.emails, listName);
      } else {
        // Fallback: read and parse file locally if API doesn't return emails
        const fileContent = await file.text();
        const lines = fileContent.split('\n');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Skip header row if it exists
        const startIndex = lines[0] && lines[0].toLowerCase().includes('email') ? 1 : 0;
        const extractedEmails = lines
          .slice(startIndex)
          .map(line => line.split(',')[0]?.trim())
          .filter(email => email && emailRegex.test(email));
        
        onAddEmails(extractedEmails, listName);
      }

      // Reset form
      setEmails('');
      setListName('');
      setFile(null);
      setError(null);
      onClose();

    } catch (error: any) {
      console.error('Error uploading email list:', error);
      
      // Handle axios error response
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
        setError(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from server. Please check your connection.');
      } else {
        // Something else happened
        setError(error.message || 'Failed to upload email list. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['text/csv', 'application/csv', 'text/plain'];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(selectedFile.type) && !['csv', 'txt'].includes(fileExtension || '')) {
        setError('Please select a valid CSV or TXT file');
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm pt-20 pb-8">
      <div className="fixed inset-0 bg-transparent"></div>
      <div className="relative w-full max-w-lg p-8 mx-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl z-10 border border-gray-200 dark:border-gray-800 my-8" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}>
        <div className="absolute top-6 right-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-800 dark:text-white/90 hover:text-gray-900 dark:hover:text-white focus:outline-none disabled:opacity-50"
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
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-md">
              {error}
            </div>
          )}
          <div className="mb-6">
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 rounded-full focus:outline-none focus:border-[#00b9f1] placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
              placeholder="Enter the email list title here"
              required
            />
          </div>
          <div className="mb-6 relative">
            <div className="flex items-center justify-between rounded-full border border-gray-200 dark:border-gray-700 px-4 py-3">
              <span className="text-gray-500 dark:text-gray-400 truncate pr-2">
                {file ? file.name : 'No file chosen'}
              </span>
              <div className="absolute right-0 mr-4">
                <label 
                  htmlFor="fileUpload"
                  className={`px-4 py-1 text-sm font-medium text-gray-700 dark:text-white/90 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv,.txt"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Expected CSV Format:</h4>
            <div className="text-xs text-blue-700 dark:text-blue-400 font-mono bg-white dark:bg-gray-800 p-2 rounded border">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-1 mb-1">email</div>
              <div>alice@example.com</div>
              <div>bob.smith@gmail.com</div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              • First column should contain email addresses<br/>
              • Header row is optional but recommended<br/>
              • Maximum file size: 5MB
            </p>
          </div>
          <div className="mb-12">
            <a 
              href="/files/help.csv" 
              download="sample_email_list.csv" 
              className="text-[#00b9f1] text-sm hover:underline flex items-center"
            >
              <span>Download Sample CSV</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !file || !listName.trim()}
              className="px-8 py-2 text-base font-medium text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmailModal;