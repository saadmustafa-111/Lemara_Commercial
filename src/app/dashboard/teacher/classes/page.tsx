"use client";

import React, { useEffect, useState } from "react";
import coursesService, { Course } from "@/lib/coursesService";
import { useLoading } from "@/hooks/useLoading";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Mock interface for teacher's classes - would be replaced with real API data
interface TeacherClass {
  id: number;
  courseId: number;
  courseName: string;
  courseDescription: string;
  section: string;
  schedule: string;
  studentCount: number;
}

export default function TeacherClassesPage() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      startLoading();
      const data = await coursesService.getAllCourses();
      setCourses(data.filter(course => course.isActive));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // This would be replaced with a real API call to get teacher's assigned classes
    // Here we're creating mock data based on courses
    if (courses.length > 0 && user) { // Added user to actually use it
      const mockClasses: TeacherClass[] = courses
        .filter(course => course.isActive)
        .map(course => ({
          id: Math.floor(Math.random() * 1000) + 1,
          courseId: course.id!,
          courseName: course.name,
          courseDescription: course.description,
          section: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`, // A, B, or C
          schedule: ["Mon/Wed/Fri 10:00-11:30", "Tue/Thu 14:00-16:00", "Mon/Fri 08:30-10:30"][Math.floor(Math.random() * 3)],
          studentCount: Math.floor(Math.random() * 30) + 10,
        }));
      setClasses(mockClasses);
    }
  }, [courses, user]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Classes</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and manage your assigned classes
        </p>
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
      ) : classes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">You don&apos;t have any classes assigned yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{classItem.courseName}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mt-2">
                  {classItem.section}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {classItem.courseDescription}
                </p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg className="mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {classItem.schedule}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg className="mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    {classItem.studentCount} Students
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <Link
                  href={`/dashboard/teacher/classes/${classItem.id}`}
                  className="text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  View Class Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}