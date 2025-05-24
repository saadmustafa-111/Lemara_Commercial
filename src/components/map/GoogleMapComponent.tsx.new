"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Script from 'next/script';

// Define component props
interface GoogleMapComponentProps {
  latitude?: string | number;
  longitude?: string | number;
  height?: string | number;
  zoom?: number;
  mapId?: string;
  onCoordsChange?: (lat: string, lng: string) => void;
  onMapLoaded?: () => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  latitude = '34.1809281',
  longitude = '73.2783251',
  height = 400,
  zoom = 15,
  mapId = 'a30bb137b25482b3',
  onCoordsChange,
  onMapLoaded
}) => {
  // References
  const mapRef = useRef<HTMLDivElement>(null);
  const coordsChangeRef = useRef(onCoordsChange);
  const mapLoadedRef = useRef(onMapLoaded);
  
  // State
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Keep refs updated with latest props without triggering rerenders
  useEffect(() => {
    coordsChangeRef.current = onCoordsChange;
    mapLoadedRef.current = onMapLoaded;
  }, [onCoordsChange, onMapLoaded]);
  
  // Safely call onCoordsChange
  const safelyUpdateCoords = useCallback((lat: string, lng: string) => {
    if (coordsChangeRef.current) {
      // Use setTimeout to break potential render cycles
      setTimeout(() => {
        if (coordsChangeRef.current) {
          coordsChangeRef.current(lat, lng);
        }
      }, 0);
    }
  }, []);
  
  // Initialize map once
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google || isInitialized) return;

    setIsInitialized(true);

    // Parse coordinates
    const lat = typeof latitude === 'string' ? parseFloat(latitude) : Number(latitude);
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : Number(longitude);
    
    // Create map options
    const mapOptions = {
      center: { lat, lng },
      zoom: Number(zoom),
      mapId: mapId,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      }
    };

    // Create map
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    
    // Create marker
    const markerOptions = {
      position: { lat, lng },
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    };
    
    const newMarker = new window.google.maps.Marker(markerOptions);
    
    // Add marker drag event
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (position) {
        safelyUpdateCoords(position.lat().toString(), position.lng().toString());
      }
    });
    
    // Add map click event
    map.addListener('click', (e: any) => {
      const latLng = e.latLng;
      if (latLng && newMarker) {
        newMarker.setPosition(latLng);
        safelyUpdateCoords(latLng.lat().toString(), latLng.lng().toString());
      }
    });

    // Store instances
    setMapInstance(map);
    setMarker(newMarker);
    
    // Notify when map is loaded
    if (mapLoadedRef.current) {
      map.addListenerOnce('idle', mapLoadedRef.current);
    }
  }, [latitude, longitude, zoom, mapId, safelyUpdateCoords, isInitialized]);

  // Update map when coordinates change
  useEffect(() => {
    // Don't proceed if the map isn't ready
    if (!mapInstance || !marker || !isLoaded || !window.google) return;

    // Debounce the update
    const debounceTimeout = setTimeout(() => {
      const lat = typeof latitude === 'string' ? parseFloat(latitude) : Number(latitude);
      const lng = typeof longitude === 'string' ? parseFloat(longitude) : Number(longitude);
      
      // Create new position
      const newPosition = new window.google.maps.LatLng(lat, lng);
      
      // Update map center and marker position
      mapInstance.setCenter(newPosition);
      marker.setPosition(newPosition);
    }, 50);
    
    // Clean up timeout
    return () => clearTimeout(debounceTimeout);
  }, [latitude, longitude, mapInstance, marker, isLoaded]);

  // Set up global init function for map
  useEffect(() => {
    // Only set once
    if (typeof window !== 'undefined' && !window.initMap) {
      window.initMap = () => {
        if (window.google) {
          setIsLoaded(true);
        }
      };
    }
    
    // Clean up
    return () => {
      if (typeof window !== 'undefined') {
        window.initMap = () => {};
      }
    };
  }, []);

  // Initialize map when script loads or props change
  useEffect(() => {
    if (isLoaded && !isInitialized) {
      initMap();
    }
  }, [isLoaded, isInitialized, initMap]);

  // Script load handler
  const handleScriptLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <>
      <Script
        id="google-maps-script"
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCOBUS_ENB_ZGlNqNdRojb05EMne_V8-7o&libraries=places&v=weekly&map_ids=${mapId}&callback=initMap`}
        onLoad={handleScriptLoad}
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
      </div>
    </>
  );
};

export default GoogleMapComponent;

// Add type declaration for window
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}
