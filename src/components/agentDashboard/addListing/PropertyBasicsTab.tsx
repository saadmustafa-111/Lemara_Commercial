"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { isChecked } from './utils';
import SubTabNavigation from './SubTabNavigation';
import EnhancedMapViewer from '@/components/map/EnhancedMapViewer';
import { useMapCoordinates } from '@/hooks/useMapCoordinates';

interface PropertyBasicsTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  getErrorMessage?: (fieldName: string) => string | null;
}

const PropertyBasicsTab: React.FC<PropertyBasicsTabProps> = ({ formData, handleChange, getErrorMessage }) => {
  // Track character counts
  const [titleLength, setTitleLength] = useState<number>(formData.title?.length || 0);  const [descriptionLength, setDescriptionLength] = useState<number>(formData.completeDescription?.length || 0);
  // Track current active section for navigation
  const [activeSection, setActiveSection] = useState<string>('basic-information');
  
  // Use the map coordinates hook to automatically update coordinates based on address
  const { coordinates, updateCoordinates, isLoading: isLoadingMap } = useMapCoordinates(
    {
      streetAddress: formData.streetAddress,
      city: formData.city,
      stateProvince: formData.stateProvince,
      country: formData.country
    },
    {
      latitude: formData.latitude,
      longitude: formData.longitude
    }
  );
  
  // Update formData when coordinates change
  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      // Create synthetic events to update form data
      const latEvent = {
        target: {
          name: 'latitude',
          value: coordinates.latitude
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      const lngEvent = {
        target: {
          name: 'longitude',
          value: coordinates.longitude
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleChange(latEvent);
      handleChange(lngEvent);
    }
  }, [coordinates, handleChange]);
  
  // Define sections for the tab navigation
  const sections = [
    { id: 'basic-information', label: 'Basic Information', icon: '📋' },
    { id: 'address', label: 'Address', icon: '📍' },
    { id: 'details', label: 'Details', icon: '📋' },
    { id: 'descriptions', label: 'Descriptions', icon: '📝' },
    { id: 'photos', label: 'Photos', icon: '🖼️' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'accessibility', label: 'Accessibility', icon: '🔒' },
    { id: 'co-brokers', label: 'Co-Brokers', icon: '👥' },
    { id: 'submit', label: 'Submit', icon: '✓' },
  ];
  
  // Refs for each section
  const sectionRefs = {
    'basic-information': useRef<HTMLDivElement>(null),
    'address': useRef<HTMLDivElement>(null),
    'details': useRef<HTMLDivElement>(null),
    'descriptions': useRef<HTMLDivElement>(null),
    'photos': useRef<HTMLDivElement>(null),
    'documents': useRef<HTMLDivElement>(null),
    'accessibility': useRef<HTMLDivElement>(null),
    'co-brokers': useRef<HTMLDivElement>(null),
    'submit': useRef<HTMLDivElement>(null),
    'submit': useRef<HTMLDivElement>(null),
  };
    // Track investment highlights
  const [highlights, setHighlights] = useState<string[]>(
    formData.investmentHighlights ? 
    (Array.isArray(formData.investmentHighlights) ? formData.investmentHighlights : [formData.investmentHighlights]) : 
    ['', '', '', '', '', '']
  );
  
  // Track uploaded files
  const [photos, setPhotos] = useState<File[]>(formData.photos || []);
  const [documents, setDocuments] = useState<File[]>(formData.documents || []);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (sectionRef && sectionRef.current) {
      const navHeight = 60; // Height of the sticky navigation
      const yOffset = -navHeight - 10; // Offset from the top to account for sticky header
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
    // Set up intersection observer to highlight active section during scrolling
  useEffect(() => {
    const navHeight = 60; // Height of the sticky navigation
    const observerOptions = {
      rootMargin: `-${navHeight}px 0px -70% 0px`,
      threshold: 0
    };
    
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section elements
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Custom handler for title to update character count
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleLength(e.target.value.length);
    handleChange(e);
  };
  
  // Handle changes to investment highlights
  const handleHighlightChange = (index: number, value: string) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index] = value;
    setHighlights(updatedHighlights);
    
    // Update form data with the new highlights array
    const event = {
      target: {
        name: 'investmentHighlights',
        value: updatedHighlights
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };
  
  // Add a new investment highlight
  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };
    // Remove an investment highlight
  const removeHighlight = (index: number) => {
    const updatedHighlights = [...highlights];
    updatedHighlights.splice(index, 1);
    setHighlights(updatedHighlights);
    
    // Update form data with the new highlights array
    const event = {
      target: {
        name: 'investmentHighlights',
        value: updatedHighlights
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };
  
  // Handle photo uploads
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files);
      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      
      // Update form data with the new photos array
      const event = {
        target: {
          name: 'photos',
          value: updatedPhotos
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleChange(event);
    }
  };
  
  // Handle document uploads
  const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newDocs = Array.from(e.target.files);
      const updatedDocs = [...documents, ...newDocs];
      setDocuments(updatedDocs);
      
      // Update form data with the new documents array
      const event = {
        target: {
          name: 'documents',
          value: updatedDocs
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleChange(event);
    }
  };
  
  // Handle drag and drop for photos
  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newPhotos = Array.from(e.dataTransfer.files);
      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      
      // Update form data with the new photos array
      const event = {
        target: {
          name: 'photos',
          value: updatedPhotos
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleChange(event);
    }
  };
  
  // Handle drag and drop for documents
  const handleDocumentDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newDocs = Array.from(e.dataTransfer.files);
      const updatedDocs = [...documents, ...newDocs];
      setDocuments(updatedDocs);
      
      // Update form data with the new documents array
      const event = {
        target: {
          name: 'documents',
          value: updatedDocs
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleChange(event);
    }
  };  return (
    <div className="space-y-8">
      {/* Add the sub tab navigation at the top */}
      <SubTabNavigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollToSection={scrollToSection}
        sections={sections}
      />
      
      {/* Basic Information Section */}
      <div id="basic-information" ref={sectionRefs["basic-information"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>

        {/* Market Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Market
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="onMarket"
                name="marketType"
                value="onMarket"
                checked={formData.marketType === 'onMarket'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="onMarket" className="text-sm text-gray-700">
                On Market
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="privateMarket"
                name="marketType"
                value="private"
                checked={formData.marketType === 'private'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="privateMarket" className="text-sm text-gray-700">
                Private
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              On Market listings will appear on our marketplace. Private listings will only be visible to your team.
            </p>
          </div>
        </div>

        {/* Title Field */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </label>
            <span className="text-xs text-gray-500">
              {titleLength}/100
            </span>
          </div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title ?? ""}
            onChange={handleTitleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter listing title"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: "Modern Office Space in Downtown" or "Retail Property on Main Street"
          </p>
        </div>

        {/* Price Field */}
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
            Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price ?? ""}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="hidePrice"
              name="hidePrice"
              checked={isChecked(formData.hidePrice)}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hidePrice" className="ml-2 text-sm text-gray-700">
              Hide price on listing
            </label>
          </div>
        </div>

        {/* Listing Sub Type */}
        <div>
          <label htmlFor="listingSubType" className="block mb-2 text-sm font-medium text-gray-700">
            Listing Sub Type
          </label>
          <div className="relative">
            <select
              id="listingSubType"
              name="listingSubType"
              value={formData.listingSubType ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select a sub type</option>
              <option value="For Sale">For Sale</option>
              <option value="For Lease">For Lease</option>
              <option value="For Sale or Lease">For Sale or Lease</option>
              <option value="For Sublease">For Sublease</option>
              <option value="For Investment">For Investment</option>
              <option value="Joint Venture">Joint Venture</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-0 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>        </div>
      </div>      {/* Address Section */}
      <div id="address" ref={sectionRefs["address"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📍</span> Address
        </h2>

        {/* Street Address */}
        <div>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Street Address"
          />
        </div>

        {/* Address 2 */}
        <div>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2 ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Address 2"
          />
        </div>

        {/* City, State/Province, Postal Code in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="City"
            />
          </div>
          
          <div>
            <input
              type="text"
              id="stateProvince"
              name="stateProvince"
              value={formData.stateProvince ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="State/Province"
            />
          </div>
          
          <div>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Postal Code"
            />
          </div>
        </div>

        {/* Country Dropdown */}
        <div>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={formData.country ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-0 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={formData.neighborhood ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Neighborhood"
          />
        </div>

        {/* Assessor's Parcel Number */}
        <div>
          <input
            type="text"
            id="parcelNumber"
            name="parcelNumber"
            value={formData.parcelNumber ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Assessor's Parcel Number"
          />
        </div>        {/* Map and Street View */}        <div className="space-y-2">
          {isLoadingMap && (
            <div className="text-center text-sm text-blue-600 py-2">
              Loading map coordinates based on address...
            </div>
          )}          <EnhancedMapViewer 
            address={{
              streetAddress: formData.streetAddress,
              city: formData.city,
              stateProvince: formData.stateProvince,
              country: formData.country
            }}
            latitude={formData.latitude || coordinates.latitude || '34.1809281'}
            longitude={formData.longitude || coordinates.longitude || '73.2783251'}
            heading={Number(formData.heading) || 341.31519935292244}
            pitch={Number(formData.pitch) || 5.058408794219417}
            zoom={Number(formData.zoom) || 3.7450835433590273}
            height={300}
            onCoordsChange={(lat, lng) => {
              // Update form data when coordinates change via the map
              const latEvent = {
                target: {
                  name: 'latitude',
                  value: lat
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              const lngEvent = {
                target: {
                  name: 'longitude',
                  value: lng
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              handleChange(latEvent);
              handleChange(lngEvent);
            }}
            onHeadingChange={(value) => {
              const event = {
                target: {
                  name: 'heading',
                  value: value.toString()
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              handleChange(event);
            }}
            onPitchChange={(value) => {
              const event = {
                target: {
                  name: 'pitch',
                  value: value.toString()
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              handleChange(event);
            }}
            onZoomChange={(value) => {
              const event = {
                target: {
                  name: 'zoom',
                  value: value.toString()
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              handleChange(event);
            }}
          />
        </div>{/* Latitude, Longitude and Map Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-700">
              Latitude {isLoadingMap && <span className="text-xs text-blue-500 ml-1">(updating...)</span>}
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude ?? "34.1809281"}
              onChange={(e) => {
                handleChange(e);
                updateCoordinates({ latitude: e.target.value });
              }}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-700">
              Longitude {isLoadingMap && <span className="text-xs text-blue-500 ml-1">(updating...)</span>}
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude ?? "73.2783251"}
              onChange={(e) => {
                handleChange(e);
                updateCoordinates({ longitude: e.target.value });
              }}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>        <div className="text-sm text-gray-500">
          If latitude/longitude is incorrect please update with the Decimal Degrees format i.e. 37.778659, -122.40809
          <br />
          <span className="text-xs text-blue-600">Coordinates will automatically update when you enter a valid address</span>
        </div>{/* Map Information (Heading, Pitch, Zoom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Heading: {formData.heading ?? "341.31519935292244"}
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pitch: {formData.pitch ?? "5.058408794219417"}
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zoom: {formData.zoom ?? "3.7450835433590273"}
            </label>
          </div>
        </div>
      </div>      {/* Details Section */}
      <div id="details" ref={sectionRefs["details"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📋</span> Details
        </h2>

        <div className="border-b border-gray-200 pb-6">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <label htmlFor="sellerFinancing" className="block text-sm font-medium text-gray-700 md:w-1/4 mb-2 md:mb-0">
              Seller Financing
            </label>
            <div className="md:w-3/4">
              <div className="relative">
                <select
                  id="sellerFinancing"
                  name="sellerFinancing"
                  value={formData.sellerFinancing ?? ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                >
                  <option value="">- Select Seller Financing -</option>
                   <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-0 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="opportunityZone" className="block text-sm font-medium text-gray-700 md:w-1/4 mb-2 md:mb-0">
              Opportunity Zone
            </label>
            <div className="md:w-3/4">
              <div className="relative">
                <select
                  id="opportunityZone"
                  name="opportunityZone"
                  value={formData.opportunityZone ?? ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                >
                  <option value="">- Select Opportunity Zone -</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-0 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>        <div className="text-sm text-gray-600 flex items-center">
          <p>Any fields left <span className="font-semibold">blank</span> or <span className="font-semibold">zero</span> will be hidden.</p>
        </div>
      </div>      {/* Descriptions Section */}
      <div id="descriptions" ref={sectionRefs["descriptions"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📝</span> Descriptions
        </h2>

        {/* Complete Description */}
        <div className="space-y-2">
          <label htmlFor="completeDescription" className="block text-sm font-medium text-gray-700">
            Complete Description
          </label>
          <div className="relative">
            <textarea
              id="completeDescription"
              name="completeDescription"
              value={formData.completeDescription ?? ""}
              onChange={(e) => {
                handleChange(e);
                setDescriptionLength(e.target.value.length);
              }}
              rows={8}
              maxLength={5000}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter a comprehensive description of the property..."
            ></textarea>
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {descriptionLength || 0}/5000 characters left
            </div>
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="space-y-3">
          <label htmlFor="investmentHighlights" className="block text-sm font-medium text-gray-700">
            Investment Highlights
          </label>
          
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Highlight #${index + 1}`}
              />
              <button 
                type="button" 
                onClick={() => removeHighlight(index)}
                className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addHighlight}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-green-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>            Add Another Highlight
          </button>
        </div>
      </div>      {/* Photos Section */}
      <div id="photos" ref={sectionRefs["photos"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">🖼️</span> Photos
        </h2>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Upload high-resolution photos of your listing.</p>
          <p className="text-sm text-gray-600">You can click and drag the numbers to re-arrange the order.</p>
          
          <div 
            className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
            onClick={() => photoInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handlePhotoDrop}
          >
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
              multiple
              accept="image/*"
            />
            
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-move">
                      {index + 1}
                    </div>
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Property photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button" 
                        className="text-white p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedPhotos = [...photos];
                          updatedPhotos.splice(index, 1);
                          setPhotos(updatedPhotos);
                          
                          // Update form data
                          const event = {
                            target: {
                              name: 'photos',
                              value: updatedPhotos
                            }
                          } as unknown as React.ChangeEvent<HTMLInputElement>;
                          handleChange(event);
                        }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">Click or Drop multiple photos here.</p>
                <span className="text-sm text-gray-400">Accepted formats: JPG, PNG, GIF</span>
              </>
            )}
          </div>
        </div>
      </div>      {/* Documents Section */}
      <div id="documents" ref={sectionRefs["documents"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📄</span> Documents
        </h2>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Upload documents for your listing.</p>
          <p className="text-sm text-gray-600">You can click and drag the numbers to re-arrange the order.</p>
          
          <div 
            className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
            onClick={() => documentInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDocumentDrop}
          >
            <input
              type="file"
              ref={documentInputRef}
              onChange={handleDocumentUpload}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />
            
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 w-full">
                {documents.map((doc, index) => (
                  <div key={index} className="relative flex items-center bg-white p-3 rounded-lg border border-gray-200 group">
                    <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 cursor-move">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button 
                      type="button" 
                      className="text-red-500 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedDocs = [...documents];
                        updatedDocs.splice(index, 1);
                        setDocuments(updatedDocs);
                        
                        // Update form data
                        const event = {
                          target: {
                            name: 'documents',
                            value: updatedDocs
                          }
                        } as unknown as React.ChangeEvent<HTMLInputElement>;
                        handleChange(event);
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">Click or Drop multiple attachments here.</p>
                <span className="text-sm text-gray-400">Accepted formats: PDF, DOC, XLS, PPT, TXT</span>
              </>
            )}
          </div>
          
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 mt-4 bg-white border border-gray-300 rounded-lg text-green-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
            onClick={() => documentInputRef.current?.click()}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>
            Add Remote Document
          </button>
        </div>
      </div>      {/* Accessibility Section */}
      <div id="accessibility" ref={sectionRefs["accessibility"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">🔒</span> Accessibility
        </h2>
        
        <div className="space-y-4">          {/* Confidentiality Options */}
          <div>
            <label htmlFor="confidentiality" className="block mb-2 text-sm font-medium text-gray-700">
              Confidentiality
            </label>
            <div className="relative">              <select
                id="confidentiality"
                name="confidentiality"
                value={formData.confidentiality || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="noCA">No CA</option>
                <option value="mutualCA">Mutual CA</option>
                <option value="customCA">Custom CA</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Setting confidentiality affects who can see property details and how information is displayed.
              </p>
            </div>
          </div>
          
          {/* Available to Brokers */}
          <div>
            <label htmlFor="availableToBrokers" className="block mb-2 text-sm font-medium text-gray-700">
              Available to Brokers
            </label>
            <select
              id="availableToBrokers"
              name="availableToBrokers"
              value={formData.availableToBrokers || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Controls listing collaboration options with other brokers.
            </p>
          </div>
            {/* Marketplace Visibility */}
          <div>
            <label htmlFor="marketplaceVisibility" className="block mb-2 text-sm font-medium text-gray-700">
              Marketplace Visibility
            </label>
            <div className="relative">
              <select
                id="marketplaceVisibility"
                name="marketplaceVisibility"
                value={formData.marketplaceVisibility || 'visible'}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                <option value="onlyLemara">Only Lemara Commercial</option>
              </select>
              
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Visible</strong>: Listing will be visible on the marketplace
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>Hidden</strong>: Listing will be hidden from public view
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>Only Lemara Commercial</strong>: Only visible within Lemara Commercial platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Co-Brokers Section */}
      <div id="co-brokers" ref={sectionRefs["co-brokers"]} className="space-y-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">👥</span> Co-Brokers
        </h2>
        
        <p className="text-sm text-gray-600">
          Add team members and other brokers to your listing.
        </p>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200">
            <div className="px-4 py-3 text-sm font-medium text-gray-700">
              MEMBER
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-700">
              PERMISSION
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center">
              SHOW ON LISTING
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center">
              ADD TO DEALS
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center">
              DELETE
            </div>
          </div>
          
          {/* Principal Broker Row */}
          <div className="grid grid-cols-5 border-b border-gray-200 items-center">
            <div className="px-4 py-3 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                {formData.principalBrokerImage ? (
                  <img 
                    src={formData.principalBrokerImage} 
                    alt="Principal Broker" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{formData.principalBrokerName || "Principal Broker"}</p>
                <p className="text-xs text-gray-500">Principal Broker</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="bg-gray-100 px-3 py-2 rounded text-sm">
                Listing Owner
              </div>
            </div>
            <div className="px-4 py-3 text-center">
              <svg className="w-6 h-6 mx-auto text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="px-4 py-3 text-center">
              <svg className="w-6 h-6 mx-auto text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="px-4 py-3 text-center">
              <svg className="w-6 h-6 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          {/* Add Co-Brokers Form */}
          <div className="px-4 py-5">
            <p className="text-sm font-medium text-gray-700 mb-3">Add Co-Brokers currently in Lemara Commercial.</p>
            <div className="border border-gray-300 rounded-md mb-3">
              <input 
                type="text"
                placeholder="Click or type the name of a member..."
                className="w-full px-4 py-3 text-gray-700 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center mb-3">
              <input 
                type="checkbox"
                id="addToDeals"
                name="addToDeals"
                checked={isChecked(formData.addToDeals)}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="addToDeals" className="ml-2 text-sm text-gray-700">
                Add To Existing Deals.
              </label>
            </div>
            
            <button 
              type="button" 
              className="inline-flex items-center px-4 py-2 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Co-Brokers
            </button>
          </div>
          
          {/* Invite Co-Brokers */}
          <div className="px-4 py-5 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Invite Co-Brokers to Lemara Commercial and appear on this listing.</p>
            <textarea
              placeholder="Email separated by comma or new line"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
            
            <button 
              type="button" 
              className="inline-flex items-center px-4 py-2 mt-3 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Invite Co-Brokers
            </button>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>If you need to add a co-broker that is not a part of your team/company please contact us <a href="mailto:support@brevitas.com" className="text-blue-600 hover:underline">support@brevitas.com</a>.</p>
            </div>
          </div>
          
          {/* Change Owner */}
          <div className="px-4 py-5 border-t border-gray-200 bg-red-50">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Once you change the owner, they will be the primary broker on the listing.</p>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
              >
                <option value="">Select new owner</option>
              </select>
              
              <button 
                type="button" 
                className="inline-flex items-center px-4 py-2 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Change Owner
              </button>            </div>
          </div>
        </div>
      </div>
        {/* Submit Section */}
      <div id="submit" ref={sectionRefs["submit"]} className="border-t border-gray-200 pt-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
          <span className="mr-2">✓</span> Submit
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAgreement"
                name="termsAgreement"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="termsAgreement" className="font-medium text-gray-700">
                I Have The Right To Publish This Listings Information, Photos And Documents, And Accept The <a href="#" className="text-blue-600 hover:underline">Terms Of Use</a>.
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-green-100 text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 rounded-md text-sm font-medium"
          >
            Submit My Listing
          </button>
          
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-medium text-gray-800">What's next?</h3>
            <p className="text-sm text-gray-600">
              After you submit your listing, our team will review your submission to ensure its accuracy and completion.
            </p>
            <p className="text-sm text-gray-600">
              Please allow 2-3 business hours for your submission to be approved.
            </p>
            <p className="text-sm text-gray-600">
              Thank You,<br />
              The Brevitas Team
            </p>
          </div>
          
          <div className="space-y-2 mt-8">
            <h3 className="text-lg font-medium text-gray-800">Further Assistance</h3>
            <p className="text-sm text-gray-600">
              If you need assistance with this process, feel free to contact our team at the number or e-mail below.
            </p>
            <div className="text-sm">
              <p className="text-blue-600 font-medium">415-993-8886</p>
              <p className="text-blue-600 font-medium">support@brevitas.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBasicsTab;
