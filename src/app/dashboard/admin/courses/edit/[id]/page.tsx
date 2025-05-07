"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import coursesService, { Course } from "@/lib/coursesService";
import { useLoading } from "@/hooks/useLoading";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.id);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Course>({
    name: "",
    description: "",
    isActive: true
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        startLoading();
        const courseData = await coursesService.getCourseById(courseId);
        setFormData(courseData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch course details:", err);
        setError("Failed to load course details. Please try again.");
      } finally {
        stopLoading();
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, startLoading, stopLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      setError("Course name is required");
      return;
    }
    
    if (!formData.description.trim()) {
      setError("Course description is required");
      return;
    }
    
    try {
      startLoading();
      await coursesService.updateCourse(courseId, {
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive
      });
      
      router.push('/dashboard/admin/courses');
    } catch (err) {
      console.error("Failed to update course:", err);
      setError("Failed to update course. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Course</h1>
        <Link
          href="/dashboard/admin/courses"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Back to Courses
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {isLoading && !formData.id ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter course name"
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter course description (objectives, content, teaching methods, etc.)"
                rows={6}
                disabled={isLoading}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                A comprehensive description should outline learning objectives, target audience, content, and teaching methods.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-brand-500 focus:ring-brand-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Course Active
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Active courses are visible to teachers and students
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Course"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}