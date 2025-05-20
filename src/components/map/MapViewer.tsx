import React, { useEffect, useState } from 'react';
import { getMapEmbedUrl, getStreetViewEmbedUrl, buildAddressString } from '@/lib/maps';
import GoogleMapComponent from './GoogleMapComponent';

interface MapViewerProps {
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
  mapHeight?: number;
  onCenterChange?: (lat: string, lng: string) => void;
}

const MapViewer = ({
  address,
  latitude,
  longitude,
  heading = 0,
  pitch = 0,
  zoom = 15,
  mapHeight = 300,
  onCenterChange
}: MapViewerProps) => {
  const [isMapView, setIsMapView] = useState(true);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [addressString, setAddressString] = useState('');

  useEffect(() => {
    setAddressString(buildAddressString(address));
  }, [address]);

  const handleViewToggle = (viewType: 'map' | 'satellite') => {
    setIsMapView(viewType === 'map');
    setMapType(viewType === 'map' ? 'roadmap' : 'satellite');
  };
  // Use coordinates if provided, otherwise the address will be used
  const mapSrc = latitude && longitude
    ? `${getMapEmbedUrl(`${latitude},${longitude}`)}&center=${latitude},${longitude}&zoom=${zoom}&maptype=${mapType}`
    : `${getMapEmbedUrl(addressString)}&maptype=${mapType}`;
  
  const streetViewSrc = latitude && longitude
    ? getStreetViewEmbedUrl(latitude, longitude, heading, pitch)
    : null;

  // Handler for map coords change
  const handleCoordsChange = (lat: string, lng: string) => {
    if (onCenterChange) {
      onCenterChange(lat, lng);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Map View</h3>
        <div className="relative border border-gray-300 rounded-lg overflow-hidden" style={{ height: `${mapHeight}px`, width: '100%' }}>
          <GoogleMapComponent
            latitude={latitude}
            longitude={longitude}
            height={mapHeight}
            zoom={zoom}
            mapId="a30bb137b25482b3"
            onCoordsChange={handleCoordsChange}
          />          {/* Google Maps component handles its own controls */}
        </div>
      </div>      {latitude && longitude && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Street View</h3>
          <div className="relative border border-gray-300 rounded-lg overflow-hidden" style={{ height: `${mapHeight}px`, width: '100%' }}>
            <iframe 
              src={getStreetViewEmbedUrl(latitude, longitude, heading, pitch)}
              title="Street View"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-sm">
              <div className="text-sm">
                <span>{address.city || 'Location'}</span>
              </div>
              <div className="text-xs text-blue-600">
                <a 
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}&heading=${heading}&pitch=${pitch}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapViewer;
