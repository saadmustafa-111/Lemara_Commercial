"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import coursesService, { Course } from "@/lib/coursesService";
import { useLoading } from "@/hooks/useLoading";

export default function AdminCoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      startLoading();
      const data = await coursesService.getAllCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      startLoading();
      await coursesService.toggleCourseStatus(id, !currentStatus);
      // Update the local state to reflect the change
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === id ? { ...course, isActive: !currentStatus } : course
        )
      );
    } catch (err) {
      console.error("Failed to toggle course status:", err);
      setError("Failed to update course status. Please try again.");
    } finally {
      stopLoading();
    }
  };

  const handleDeleteCourse = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        startLoading();
        await coursesService.deleteCourse(id);
        // Remove the deleted course from state
        setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
      } catch (err) {
        console.error("Failed to delete course:", err);
        setError("Failed to delete course. Please try again.");
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Courses Management</h1>
        <Link
          href="/dashboard/admin/courses/add"
          className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          <span className="mr-2">+</span> Add New Course
        </Link>
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
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">No courses found. Add a new course to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{course.id}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">{course.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-300">
                    {course.description.length > 100
                      ? `${course.description.substring(0, 100)}...`
                      : course.description}
                  </td>
                  <td className="py-4 px-6 text-sm whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {new Date(course.createdAt!).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/admin/courses/edit/${course.id}`}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </Link>
                      
                      <button
                        onClick={() => handleToggleStatus(course.id!, course.isActive ?? false)}
                        className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                      >
                        {course.isActive ? "" : "Acti"}
                      </button>
                      
                      <button
                        onClick={() => handleDeleteCourse(course.id!)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}