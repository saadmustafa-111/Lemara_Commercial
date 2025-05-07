"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import coursesService from "@/lib/coursesService";
import { useLoading } from "@/hooks/useLoading";

// Mock interfaces for class details
interface StudentInClass {
  id: number;
  name: string;
  email: string;
  attendance: number; // Percentage
  grade: string | null;
}

interface ClassDetail {
  id: number;
  courseName: string;
  courseDescription: string;
  section: string;
  schedule: string;
  room: string;
  startDate: string;
  endDate: string;
  students: StudentInClass[];
}

export default function ClassDetailPage() {
  const params = useParams();
  const classId = Number(params.id);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClassDetail = useCallback(async () => {
    try {
      startLoading();

      // This would be replaced with a real API call to get class details
      // For now, generating mock data

      // First get a random course for reference
      const courses = await coursesService.getAllCourses();

      if (courses && courses.length > 0) {
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];

        // Generate mock student data
        const mockStudents: StudentInClass[] = Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          name: `Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
          attendance: Math.floor(Math.random() * 30) + 70, // 70-100%
          grade: ["A", "B", "C", "D", "Pending"][Math.floor(Math.random() * 5)],
        }));

        // Set mock class detail
        setClassDetail({
          id: classId,
          courseName: randomCourse.name,
          courseDescription: randomCourse.description,
          section: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // A, B, or C
          schedule: ["Mon/Wed/Fri 10:00-11:30", "Tue/Thu 14:00-16:00", "Mon/Fri 08:30-10:30"][Math.floor(Math.random() * 3)],
          room: `Room ${Math.floor(Math.random() * 20) + 101}`,
          startDate: "2025-01-15",
          endDate: "2025-06-15",
          students: mockStudents,
        });
      } else {
        setError("No course details available");
      }
    } catch (err) {
      console.error("Failed to fetch class details:", err);
      setError("Failed to load class details. Please try again.");
    } finally {
      stopLoading();
    }
  }, [classId, startLoading, stopLoading]);

  useEffect(() => {
    fetchClassDetail();
  }, [fetchClassDetail]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          href="/dashboard/teacher/classes"
          className="inline-flex items-center text-sm font-medium text-brand-500 hover:text-brand-600 mb-4"
        >
          <svg className="mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Classes
        </Link>
        
        {classDetail && (
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {classDetail.courseName} - {classDetail.section}
          </h1>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
        </div>
      ) : classDetail ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Class Information */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Class Information</h2>
              
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Course</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{classDetail.courseName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Section</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{classDetail.section}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Schedule</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{classDetail.schedule}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Room</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{classDetail.room}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{new Date(classDetail.startDate).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{new Date(classDetail.endDate).toLocaleDateString()}</dd>
                </div>
              </dl>
            </div>

            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Course Description</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{classDetail.courseDescription}</p>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Students ({classDetail.students.length})</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {classDetail.students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                student.attendance >= 90 ? 'bg-green-500' : 
                                student.attendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {student.grade || 'Pending'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/teacher/students/${student.id}`} className="text-brand-600 hover:text-brand-900 dark:text-brand-400 dark:hover:text-brand-300">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">Class not found.</p>
        </div>
      )}
    </div>
  );
}