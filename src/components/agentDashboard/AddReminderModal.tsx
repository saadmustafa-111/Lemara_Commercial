"use client";

import React, { useState, useRef } from 'react';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminderData: {
    title: string;
    date: string;
    time: { hour: string; minute: string; ampm: string };
    priority: string;
    notificationType: string[];
  }) => void;
}

export default function AddReminderModal({ isOpen, onClose, onSave }: AddReminderModalProps) {  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('01/01/1900');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // 0-indexed (0 = January)
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [time, setTime] = useState<{ hour: string; minute: string; ampm: string }>({
    hour: '12',
    minute: '00',
    ampm: 'AM'
  });
  const [priority, setPriority] = useState<string>('Low');
  const [notificationType, setNotificationType] = useState<string[]>(['EMAIL']);

  const handleNotificationToggle = (type: string) => {
    setNotificationType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleSubmit = () => {
    onSave({
      title,
      date,
      time,
      priority,
      notificationType
    });
    resetForm();
    onClose();
  };  const resetForm = () => {
    setTitle('');
    setDate('01/01/1900');
    setShowCalendar(false);
    setSelectedYear(2025);
    setSelectedMonth(0);
    setSelectedDay(1);
    setTime({ hour: '12', minute: '00', ampm: 'AM' });
    setPriority('Low');
    setNotificationType(['EMAIL']);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-[100000] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-4xl w-[50%]  relative shadow-xl">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
          <div className="p-8">
          <h2 className="text-2xl font-medium text-[#00a0d1] mb-8">Reminder Details</h2>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter the reminder title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>          <div className="mb-6">
            <div className="text-gray-700 dark:text-gray-300 mb-2">Notifications</div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => handleNotificationToggle('EMAIL')}
                className={`px-6 py-2 border rounded-full ${
                  notificationType.includes('EMAIL')
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700'
                } transition-colors`}
              >
                EMAIL
              </button>
              <button
                type="button"
                onClick={() => handleNotificationToggle('PHONE CALL')}
                className={`px-6 py-2 border rounded-full ${
                  notificationType.includes('PHONE CALL')
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700'
                } transition-colors`}
              >
                PHONE CALL
              </button>
              <button
                type="button"
                onClick={() => handleNotificationToggle('FLOATING (WEB)')}
                className={`px-6 py-2 border rounded-full ${
                  notificationType.includes('FLOATING (WEB)')
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700'
                } transition-colors`}
              >
                FLOATING (WEB)
              </button>
            </div>
          </div>          <div className="mb-6">
            <div className="text-gray-700 dark:text-gray-300 mb-2">Priority</div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                backgroundPosition: "right 0.5rem center", 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem" }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Hight">High</option>
            </select>
          </div>            <div className="mb-8">
            <div className="text-gray-700 dark:text-gray-300 mb-2">Start Date</div>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </button>
                </div>                {showCalendar && (
                  <div className="fixed inset-0 flex items-center justify-center z-20">
                    <div className="absolute inset-0 bg-transparent" onClick={() => setShowCalendar(false)}></div>
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-[350px] z-30 relative">
                    {/* Close button */}
                    <button 
                      className="absolute top-2 right-2 text-blue-600"
                      onClick={() => setShowCalendar(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15 9l-6 6M9 9l6 6" />
                      </svg>
                    </button>
                    {/* Year selection */}
                    <div className="flex justify-center mb-4 space-x-2 overflow-x-auto py-2">
                      {[2025, 2026, 2027, 2028, 2029].map((year) => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`px-6 py-2 rounded-full text-sm ${
                            selectedYear === year
                              ? 'bg-[#00a0d1] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                    
                    {/* Month selection */}
                    <div className="flex flex-wrap justify-center mb-4 gap-1">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                        <button
                          key={month}
                          onClick={() => setSelectedMonth(index)}
                          className={`w-12 py-2 rounded-full text-sm ${
                            selectedMonth === index
                              ? 'bg-[#ff8f8f] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                    
                    {/* Days selection */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: new Date(selectedYear, selectedMonth + 1, 0).getDate() }, (_, i) => i + 1).map((day) => (
                        <button
                          key={day}
                          onClick={() => {
                            setSelectedDay(day);
                            const month = selectedMonth + 1;
                            const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${selectedYear}`;
                            setDate(formattedDate);
                            setShowCalendar(false);
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                            selectedDay === day && selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear()
                              ? 'bg-[#00a0d1] text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {day.toString().padStart(2, '0')}
                        </button>
                      ))}                    </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-1">
                <select
                  value={time.hour}
                  onChange={(e) => setTime({ ...time, hour: e.target.value })}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                    backgroundPosition: "right 0.5rem center", 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem" }}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  value={time.minute}
                  onChange={(e) => setTime({ ...time, minute: e.target.value })}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                    backgroundPosition: "right 0.5rem center", 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem" }}
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute.toString().padStart(2, '0')}>
                      {minute.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  value={time.ampm}
                  onChange={(e) => setTime({ ...time, ampm: e.target.value })}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                    backgroundPosition: "right 0.5rem center", 
                    backgroundRepeat: "no-repeat", 
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem" }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>          <div className="flex justify-between">
            <div className="flex space-x-3">
              <button
                onClick={resetForm}
                className="px-8 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Stop
              </button>
              <button
                className="px-8 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Snooze
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="px-8 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
