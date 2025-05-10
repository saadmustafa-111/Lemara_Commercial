"use client";

import { useState } from 'react';

export interface Photo extends File {
  preview?: string;
}

export const usePhotoUpload = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Handle file uploads for photos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as Photo[];
      
      // Create preview URLs for the photos
      filesArray.forEach(file => {
        file.preview = URL.createObjectURL(file);
      });
      
      setPhotos(prev => [...prev, ...filesArray]);
    }
  };
  
  // Remove uploaded image
  const removeImage = (index: number) => {
    setPhotos(prev => {
      // Revoke the object URL to avoid memory leaks
      if (prev[index].preview) {
        URL.revokeObjectURL(prev[index].preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };
  
  // Clean up function to revoke all object URLs when component unmounts
  const cleanupPreviews = () => {
    photos.forEach(photo => {
      if (photo.preview) {
        URL.revokeObjectURL(photo.preview);
      }
    });
  };

  return {
    photos,
    setPhotos,
    handleFileChange,
    removeImage,
    cleanupPreviews
  };
};

export const formatPhotos = (photos: Photo[]) => {
  // Logic to prepare photos for submission to API
  return photos.map(photo => ({
    name: photo.name,
    size: photo.size,
    type: photo.type,
    lastModified: photo.lastModified,
    // Additional properties as needed
  }));
};

export default usePhotoUpload;
