"use client";

import { useState, useEffect } from 'react';

interface EmailList {
  id: number;
  name: string;
  campaignsCount: number;
  emailsCount: number;
}

export const useEmailLists = () => {
  const [lists, setLists] = useState<EmailList[]>([]);
  const [loading, setLoading] = useState(true);

  // Load email lists from localStorage on component mount
  useEffect(() => {
    const storedLists = localStorage.getItem('emailLists');
    if (storedLists) {
      try {
        setLists(JSON.parse(storedLists));
      } catch (error) {
        console.error('Error parsing email lists from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save email lists to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('emailLists', JSON.stringify(lists));
    }
  }, [lists, loading]);

  // Add a new email list
  const addEmailList = (name: string, emails: string[]) => {
    const newList: EmailList = {
      id: Date.now(),
      name,
      campaignsCount: 0,
      emailsCount: emails.length
    };
    
    setLists(prevLists => [...prevLists, newList]);
  };

  // Delete an email list
  const deleteEmailList = (id: number) => {
    setLists(prevLists => prevLists.filter(list => list.id !== id));
  };

  // Edit an email list
  const editEmailList = (id: number, updatedList: Partial<EmailList>) => {
    setLists(prevLists => 
      prevLists.map(list => 
        list.id === id ? { ...list, ...updatedList } : list
      )
    );
  };

  return {
    lists,
    loading,
    addEmailList,
    deleteEmailList,
    editEmailList
  };
};
