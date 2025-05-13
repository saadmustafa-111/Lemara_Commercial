"use client";

import React, { useState } from 'react';
import AddEmailModal from './AddEmailModal';
import { useEmailLists } from '@/hooks/useEmailLists';

const EmailLists: React.FC = () => {  
  const { lists: emailLists, addEmailList, deleteEmailList } = useEmailLists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddEmails = (emails: string[], listName: string) => {
    addEmailList(listName, emails);
  };
  
  return (
    <div className="p-5 sm:p-7 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="text-xl md:text-2xl font-semibold text-[#00b9f1] dark:text-[#33ccff] flex items-center">
            <svg className="w-8 h-8 text-[#00b9f1] dark:text-[#33ccff] mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z " />
            </svg>
            Email Lists
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"          >
            Add Emails
          </button>
        </div>
      </div>
      <AddEmailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddEmails={handleAddEmails} 
      />
      <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">{emailLists.length} Lists</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  LIST NAME
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  CAMPAIGNS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  EMAILS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  ACTION                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {emailLists.length > 0 ? (
                emailLists.map((list) => (
                  <tr key={list.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {list.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {list.campaignsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {list.emailsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4">Edit</button>
                      <button 
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        onClick={() => deleteEmailList(list.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p className="text-base">
                      Currently no email lists found. Start <span 
                        className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      >here</span> to add email lists.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailLists;
