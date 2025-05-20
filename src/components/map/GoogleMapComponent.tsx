"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
  };

  // Re-center map and marker when coordinates change
  useEffect(() => {
    if (mapInstance && marker && isLoaded) {
      const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
      const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
      const newPosition = new google.maps.LatLng(lat, lng);
      
      mapInstance.setCenter(newPosition);
      marker.setPosition(newPosition);
    }
  }, [latitude, longitude, mapInstance, marker, isLoaded]);

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
