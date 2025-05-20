"use client";

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Define component props
interface AdvancedMapComponentProps {
  latitude?: string | number;
  longitude?: string | number;
  height?: string | number;
  zoom?: number;
  mapId?: string;
  onCoordsChange?: (lat: string, lng: string) => void;
  onMapLoaded?: () => void;
}

const AdvancedMapComponent: React.FC<AdvancedMapComponentProps> = ({
  latitude = '34.1809281',
  longitude = '73.2783251',
  height = 400,
  zoom = 15,
  mapId = 'a30bb137b25482b3',
  onCoordsChange,
  onMapLoaded
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewPanorama, setStreetViewPanorama] = useState<google.maps.StreetViewPanorama | null>(null);

  // Initialize map after Google Maps script is loaded
  const initMap = () => {
    if (!mapRef.current) return;
    
    // Convert coordinates to numbers
    const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
    
    // Create map instance
    const mapOptions: google.maps.MapOptions = {
      center: { lat, lng },
      zoom: zoom,
      mapId: mapId,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT,
      }
    };

    const map = new google.maps.Map(mapRef.current, mapOptions);
    
    // Set up Street View
    const panoramaOptions = {
      position: { lat, lng },
      pov: {
        heading: 34,
        pitch: 10
      },
      visible: false,
      addressControl: true
    };
    
    const panorama = new google.maps.StreetViewPanorama(
      mapRef.current,
      panoramaOptions
    );
    
    // Set the Street View panorama
    map.setStreetView(panorama);
    setStreetViewPanorama(panorama);
    
    // Add marker
    const markerOptions: google.maps.MarkerOptions = {
      position: { lat, lng },
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    };
    
    const newMarker = new google.maps.Marker(markerOptions);
    
    // Add event listener for marker drag end
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (position && onCoordsChange) {
        onCoordsChange(position.lat().toString(), position.lng().toString());
      }
    });
    
    // Add click listener to the map for repositioning the marker
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      const latLng = e.latLng;
      if (latLng && newMarker) {
        newMarker.setPosition(latLng);
        if (onCoordsChange) {
          onCoordsChange(latLng.lat().toString(), latLng.lng().toString());
        }
      }
    });

    setMapInstance(map);
    setMarker(newMarker);
    
    // Notify when map is fully loaded
    if (onMapLoaded) {
      map.addListenerOnce('idle', onMapLoaded);
    }
    
    // Check Street View availability
    const streetViewService = new google.maps.StreetViewService();
    streetViewService.getPanorama({ location: { lat, lng }, radius: 50 }, (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
        // Street View is available
      } else {
        // Street View is not available
        console.log("Street View is not available at this location");
      }
    });
  };

  // Toggle Street View
  const toggleStreetView = () => {
    if (!streetViewPanorama) return;
    
    const visible = !streetViewPanorama.getVisible();
    streetViewPanorama.setVisible(visible);
    setShowStreetView(visible);
  };

  // Re-center map and marker when coordinates change
  useEffect(() => {
    if (mapInstance && marker && isLoaded) {
      const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
      const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
      const newPosition = new google.maps.LatLng(lat, lng);
      
      mapInstance.setCenter(newPosition);
      marker.setPosition(newPosition);
      
      if (streetViewPanorama) {
        streetViewPanorama.setPosition(newPosition);
      }
    }
  }, [latitude, longitude, mapInstance, marker, streetViewPanorama, isLoaded]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDJoz4v__2hk1k2npCct2wj-aLgsBBZ9Ro&libraries=places&v=weekly&map_ids=${mapId}`}
        onLoad={() => {
          setIsLoaded(true);
          window.initMap = initMap;
          // Initialize map once the script is loaded
          if (window.google) {
            initMap();
          }
        }}
        strategy="lazyOnload"
      />
      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full rounded-lg overflow-hidden border border-gray-300"
          style={{ height: typeof height === 'string' ? height : `${height}px` }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
            <div className="text-center">
              <p className="text-blue-600 font-medium">Loading Google Maps...</p>
            </div>
          </div>
        )}
        
        {isLoaded && (
          <div className="absolute bottom-4 left-4 z-10">
            <button 
              onClick={toggleStreetView}
              className="bg-white rounded-md px-3 py-2 shadow-sm text-sm font-medium flex items-center space-x-2 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>{showStreetView ? 'Exit Street View' : 'Street View'}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdvancedMapComponent;

// Add type declaration for window
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}
