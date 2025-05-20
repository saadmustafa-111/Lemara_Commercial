"use client";

import React, { useState, useEffect } from 'react';
import AdvancedMapComponent from './AdvancedMapComponent';
import { buildAddressString, getStreetViewEmbedUrl } from '@/lib/maps';

interface EnhancedMapViewerProps {
  address: {
    streetAddress?: string;
    city?: string;
    stateProvince?: string;
    country?: string;
  };
  latitude?: string | number;
  longitude?: string | number;
  heading?: number;
  pitch?: number;
  zoom?: number;
  height?: number;
  onCoordsChange?: (lat: string, lng: string) => void;
  onHeadingChange?: (heading: number) => void;
  onPitchChange?: (pitch: number) => void;
  onZoomChange?: (zoom: number) => void;
}

const EnhancedMapViewer: React.FC<EnhancedMapViewerProps> = ({
  address,
  latitude,
  longitude,
  heading = 0,
  pitch = 0,
  zoom = 15,
  height = 300,
  onCoordsChange,
  onHeadingChange,
  onPitchChange,
  onZoomChange
}) => {
  // Build address string for display
  const addressString = buildAddressString(address);
  const [isMapView, setIsMapView] = useState(true);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');  // Use the values from props directly instead of storing in state
  // This prevents the infinite update loop
  const defaultHeading = 341.31519935292244;
  const defaultPitch = 5.058408794219417;
  const defaultZoom = 3.7450835433590273;
  
  // We'll use these values directly from props without creating a state update cycle
  const currentHeading = heading || defaultHeading;
  const currentPitch = pitch || defaultPitch;
  const currentZoom = zoom || defaultZoom;
  // Handle map/satellite view toggle
  const handleViewToggle = (viewType: 'map' | 'satellite') => {
    setIsMapView(viewType === 'map');
    setMapType(viewType === 'map' ? 'roadmap' : 'satellite');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map View */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Map View</h3>
          <div className="relative border border-gray-300 rounded-lg overflow-hidden" style={{ height: `${height}px`, width: '100%' }}>
            {/* Map Toggle Controls */}
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-sm z-10">
              <div className="flex space-x-2">
                <button 
                  className={`text-sm ${isMapView ? 'font-medium' : 'text-gray-500'}`}
                  onClick={() => handleViewToggle('map')}
                >
                  Map
                </button>
                <button 
                  className={`text-sm ${!isMapView ? 'font-medium' : 'text-gray-500'}`}
                  onClick={() => handleViewToggle('satellite')}
                >
                  Satellite
                </button>
              </div>
            </div>
            
            {/* Google Map */}
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDJoz4v__2hk1k2npCct2wj-aLgsBBZ9Ro&q=${latitude},${longitude}&center=${latitude},${longitude}&zoom=${zoom}&maptype=${mapType}`}
              title="Map View"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Street View */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Street View</h3>
          <div className="relative border border-gray-300 rounded-lg overflow-hidden" style={{ height: `${height}px`, width: '100%' }}>            <iframe 
              src={getStreetViewEmbedUrl(latitude, longitude, currentHeading, currentPitch)}
              title="Street View"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-sm z-10">
              <div className="text-sm">
                <span>{address.city || 'Abbottabad township'}</span>
              </div>
              <div className="text-xs text-blue-600">
                <a                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}&heading=${currentHeading}&pitch=${currentPitch}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Information */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>      {/* Street View Information */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Heading: {currentHeading}</p>
        <p>Pitch: {currentPitch}</p>
        <p>Zoom: {currentZoom}</p>
        <p className="mt-2">
          If latitude/longitude is incorrect please update with the Decimal Degrees format i.e. 37.778659, -122.40809
        </p>
      </div>
    </div>
  );
};

export default EnhancedMapViewer;
