"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/badge/Badge';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import useLoading from '@/hooks/useLoading';

// Define types for our dashboard data
interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  image: string;
  category: string;
  created: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joined: string;
  status: string;
}

interface DashboardData {
  adminStats: {
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    activeUsers: number;
  };
  recentCourses: Course[];
  recentUsers: User[];
}

export default function AdminDashboard() {
  const { isLoading, withLoading } = useLoading(true);
  // Mock data for the dashboard with proper typing
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    adminStats: {
      totalStudents: 0,
      totalTeachers: 0,
      totalCourses: 0,
      activeUsers: 0
    },
    recentCourses: [],
    recentUsers: []
  });

  // Simulate fetching data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call with delay
        await withLoading(
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setDashboardData({
                adminStats: {
                  totalStudents: 364,
                  totalTeachers: 24,
                  totalCourses: 48,
                  activeUsers: 286
                },
                recentCourses: [
                  {
                    id: 1,
                    title: "Introduction to Mathematics",
                    instructor: "Dr. Sarah Johnson",
                    students: 28,
                    image: "/images/grid-image/image-04.png",
                    category: "Mathematics",
                    created: "Apr 15, 2025",
                    status: "active"
                  },
                  {
                    id: 2,
                    title: "Advanced English Literature",
                    instructor: "Prof. Michael Brown",
                    students: 24,
                    image: "/images/grid-image/image-05.png",
                    category: "Language Arts",
                    created: "Apr 12, 2025",
                    status: "active"
                  },
                  {
                    id: 3,
                    title: "Physics Fundamentals",
                    instructor: "Dr. Robert Chen",
                    students: 22,
                    image: "/images/grid-image/image-06.png",
                    category: "Science",
                    created: "Apr 10, 2025",
                    status: "active"
                  },
                  {
                    id: 4,
                    title: "World History: Modern Era",
                    instructor: "Dr. Emma Wilson",
                    students: 19,
                    image: "/images/country/country-01.svg",
                    category: "Social Studies",
                    created: "Apr 8, 2025",
                    status: "pending"
                  }
                ],
                recentUsers: [
                  { 
                    id: 1, 
                    name: "James Wilson", 
                    email: "james.wilson@example.com", 
                    avatar: "/images/user/user-01.png", 
                    role: "Student", 
                    joined: "Apr 19, 2025",
                    status: "active"
                  },
                  { 
                    id: 2, 
                    name: "Emily Parker", 
                    email: "emily.parker@example.com", 
                    avatar: "/images/user/user-02.png", 
                    role: "Teacher", 
                    joined: "Apr 18, 2025",
                    status: "active"
                  },
                  { 
                    id: 3, 
                    name: "Michael Davis", 
                    email: "michael.davis@example.com", 
                    avatar: "/images/user/user-03.png", 
                    role: "Student", 
                    joined: "Apr 17, 2025",
                    status: "pending"
                  }
                ]
              });
              resolve();
            }, 2000); // 2 second delay to simulate loading
          })
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [withLoading]);

  const { adminStats, recentCourses, recentUsers } = dashboardData;

  return (
    <div className="relative px-4 py-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      {/* Loading overlay - centered and larger */}
      <LoadingOverlay 
        isLoading={isLoading} 
        withLogo={true}
        text="Loading dashboard data..."
        fullScreen={true} // Make it full screen for better visibility
      />

      {/* Welcome header with gradient text */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] mb-1">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your educational platform</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/dashboard/admin/settings">
            <button className="px-5 py-2.5 bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              Platform Settings
            </button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Students</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.totalStudents}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#15eb9e]/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17ZM12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z" fill="#15eb9e" className="dark:fill-[#15eb9e]" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Teachers</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.totalTeachers}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#6a00b8]/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 17V19H13V17C13 17 13 13 20 13C20 13 20 17 20 17ZM17.5 7.5C17.5 9.433 15.933 11 14 11C12.067 11 10.5 9.433 10.5 7.5C10.5 5.567 12.067 4 14 4C15.933 4 17.5 5.567 17.5 7.5Z" fill="#6a00b8" className="dark:fill-[#6a00b8]" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Courses</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.totalCourses}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15eb9e]/20 to-[#6a00b8]/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="1" y1="12" x2="23" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#15eb9e" />
                    <stop offset="1" stopColor="#6a00b8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Users</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{adminStats.activeUsers}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15eb9e]/20 to-[#6a00b8]/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="url(#paint0_linear)" />
                <path d="M4 20C4 17.6131 4.94821 15.3239 6.63604 13.636C8.32387 11.9482 10.6131 11 13 11C15.3869 11 17.6761 11.9482 19.364 13.636C21.0518 15.3239 22 17.6131 22 20H4Z" fill="url(#paint1_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="8" y1="7" x2="16" y2="7" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#15eb9e" />
                    <stop offset="1" stopColor="#6a00b8" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="4" y1="15.5" x2="22" y2="15.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#15eb9e" />
                    <stop offset="1" stopColor="#6a00b8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#15eb9e] to-[#6a00b8]">Recent Courses</h2>
        <Link href="/dashboard/admin/courses">
          <span className="text-[#6a00b8] hover:text-purple-700 dark:text-[#15eb9e] dark:hover:text-green-400 text-sm font-medium cursor-pointer">View All Courses</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {recentCourses.map(course => (
          <div key={course.id} className="bg-white/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm">
            <div className="h-44 relative">
              <Image 
                src={course.image}
                alt={course.title}
                className="object-cover"
                fill
              />
              <div className="absolute top-3 right-3">
                <Badge 
                  variant="solid" 
                  color={course.status === "active" ? "success" : "warning"} 
                  className={course.status === "active" ? "!bg-[#15eb9e]" : ""}
                  size="sm"
                >
                  {course.status === "active" ? "Active" : "Pending"}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base overflow-hidden text-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{course.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{course.instructor}</p>
              
              <div className="flex justify-between mt-2 mb-3">
                <div className="flex items-center">
                  <svg width="16" height="16" className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17Z" fill="#6a00b8" />
                    <path d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z" fill="#6a00b8" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{course.students} students</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Created: {course.created}</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Badge variant="light" color="primary" size="sm" className="!bg-[#15eb9e]/10 !text-[#15eb9e]">
                  {course.category}
                </Badge>
                <Link href={`/dashboard/admin/course/${course.id}`}>
                  <button className="px-3 py-1 text-white text-sm font-medium rounded-lg bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] hover:shadow-md hover:shadow-purple-500/20 transition-all">Manage</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Users */}
        <div className="bg-white/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#15eb9e] to-[#6a00b8]">Recent Users</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700/50">
            {recentUsers.map(user => (
              <div key={user.id} className="p-4 flex items-center hover:bg-gray-50/80 dark:hover:bg-gray-700/30">
                <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                  <Image 
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="solid" 
                    color={user.role === "Teacher" ? "primary" : "success"} 
                    size="sm" 
                    className={`${user.role === "Teacher" ? "!bg-[#6a00b8]" : "!bg-[#15eb9e]"} mb-1`}
                  >
                    {user.role}
                  </Badge>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Joined: {user.joined}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700/50 text-center">
            <Link href="/dashboard/admin/users">
              <span className="text-[#6a00b8] hover:text-purple-700 dark:text-[#15eb9e] dark:hover:text-green-400 text-sm font-medium cursor-pointer">View All Users</span>
            </Link>
          </div>
        </div>

        {/* Activity & Quick Actions */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-white/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5 shadow-sm backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] mb-4">System Status</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Server Load</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-[#15eb9e] to-[#6a00b8]" style={{ width: '24%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage Usage</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">52%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-[#15eb9e] to-[#6a00b8]" style={{ width: '52%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bandwidth</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">38%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-[#15eb9e] to-[#6a00b8]" style={{ width: '38%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-xl p-5 shadow-sm backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#15eb9e] to-[#6a00b8] mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard/admin/users/new">
                <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-[#15eb9e] dark:hover:border-[#15eb9e] hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#15eb9e]/20 flex items-center justify-center mr-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM15 6C16.1 6 17 6.9 17 8C17 9.1 16.1 10 15 10C13.9 10 13 9.1 13 8C13 6.9 13.9 6 15 6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14ZM9 18C9.22 17.28 12.31 16 15 16C17.7 16 20.8 17.29 21 18H9ZM6 15V12H9V10H6V7H4V10H1V12H4V15H6Z" fill="#15eb9e" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Add New User</span>
                </div>
              </Link>
              
              <Link href="/dashboard/admin/courses/new">
                <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-[#6a00b8] dark:hover:border-[#6a00b8] hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#6a00b8]/20 flex items-center justify-center mr-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#6a00b8" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">New Course</span>
                </div>
              </Link>
              
              <Link href="/dashboard/admin/reports">
                <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-[#15eb9e] dark:hover:border-[#15eb9e] hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#15eb9e]/20 to-[#6a00b8]/20 flex items-center justify-center mr-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="url(#paint2_linear)" />
                      <defs>
                        <linearGradient id="paint2_linear" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#15eb9e" />
                          <stop offset="1" stopColor="#6a00b8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">View Reports</span>
                </div>
              </Link>
              
              <Link href="/dashboard/admin/settings">
                <div className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-[#6a00b8] dark:hover:border-[#6a00b8] hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#15eb9e]/20 to-[#6a00b8]/20 flex items-center justify-center mr-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.91 7.63 6.29L5.24 5.33C5.02 5.26 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.74 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="url(#paint3_linear)" />
                      <defs>
                        <linearGradient id="paint3_linear" x1="2.66" y1="12" x2="21.34" y2="12" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#15eb9e" />
                          <stop offset="1" stopColor="#6a00b8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Settings</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="fixed top-20 right-20 w-64 h-64 bg-[#15eb9e]/5 rounded-full blur-3xl opacity-30 -z-10 animate-float-slow"></div>
      <div className="fixed bottom-20 left-20 w-64 h-64 bg-[#6a00b8]/5 rounded-full blur-3xl opacity-30 -z-10 animate-float-medium"></div>
    </div>
  );
}