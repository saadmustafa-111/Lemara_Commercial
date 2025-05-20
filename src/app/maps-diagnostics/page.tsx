"use client";

import React, { useState, useEffect } from 'react';
import { validateMapsApiKey, GOOGLE_MAPS_CONFIG, MAPS_API_ERRORS } from '@/lib/mapsUtils';
import EnhancedMapViewer from '@/components/map/EnhancedMapViewer';

export default function MapDiagnosticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [testAddress, setTestAddress] = useState('1600 Amphitheatre Parkway, Mountain View, CA');
  const [coordinates, setCoordinates] = useState({ 
    latitude: '37.4224764', 
    longitude: '-122.0842499' 
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkApiStatus() {
      try {
        setIsLoading(true);
        setError(null);
        
        // First test - direct API check
        const response = await fetch('/api/maps/test');
        const data = await response.json();
        setApiStatus(data);
        
        if (data.isValid) {
          // If API key is valid, try geocoding the test address
          const geocodeResponse = await fetch(`/api/maps/geocode?address=${encodeURIComponent(testAddress)}`);
          const geocodeData = await geocodeResponse.json();
          
          if (geocodeData.results && geocodeData.results.length > 0) {
            const location = geocodeData.results[0].geometry.location;
            setCoordinates({
              latitude: location.lat.toString(),
              longitude: location.lng.toString()
            });
          }
        }
      } catch (err) {
        console.error('Error checking Maps API status:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkApiStatus();
  }, [testAddress]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestAddress(e.target.value);
  };

  const handleGeocode = async () => {
    if (!testAddress || testAddress.trim().length < 5) {
      setError('Please enter a valid address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/maps/geocode?address=${encodeURIComponent(testAddress)}`);
      const data = await response.json();
      
      if (response.ok && data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates({
          latitude: location.lat.toString(),
          longitude: location.lng.toString()
        });
      } else {
        setError(`Geocoding failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Google Maps API Diagnostics</h1>

      {/* API Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-700">API Key: <span className="font-mono">{GOOGLE_MAPS_CONFIG.API_KEY.substring(0, 6)}...{GOOGLE_MAPS_CONFIG.API_KEY.substring(GOOGLE_MAPS_CONFIG.API_KEY.length - 4)}</span></p>
            <p className="text-gray-700">Map ID: <span className="font-mono">{GOOGLE_MAPS_CONFIG.MAP_ID}</span></p>
          </div>
          <div>
            <p className="font-medium">Required APIs:</p>
            <ul className="list-disc ml-5">
              {GOOGLE_MAPS_CONFIG.REQUIRED_APIS.map((api, index) => (
                <li key={index} className="text-sm">{api}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* API Status */}
        {isLoading ? (
          <div className="flex justify-center">
            <p className="text-gray-500">Checking API status...</p>
          </div>
        ) : apiStatus ? (
          <div className="mb-4">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${apiStatus.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {apiStatus.isValid ? 'API Key Valid' : 'API Key Invalid'}
            </div>
            
            <p className="mt-2 text-gray-700">{apiStatus.message}</p>
            
            {!apiStatus.isValid && apiStatus.status && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="font-medium">Troubleshooting:</h3>
                <p className="text-yellow-800">{MAPS_API_ERRORS[apiStatus.status as keyof typeof MAPS_API_ERRORS] || 'Unknown error'}</p>
                <p className="text-sm mt-2">Check your Google Cloud Console to ensure the API key is properly configured.</p>
              </div>
            )}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : null}
      </div>

      {/* Geocoding Test */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Geocoding Test</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={testAddress}
            onChange={handleAddressChange}
            placeholder="Enter an address"
            className="flex-grow px-4 py-2 border border-gray-300 rounded"
          />
          <button 
            onClick={handleGeocode}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? 'Loading...' : 'Test Geocoding'}
          </button>
        </div>
        
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}

        {/* Results */}
        <div className="mt-6">
          <p className="font-medium mb-2">Coordinates:</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600">Latitude</label>
              <input 
                type="text" 
                value={coordinates.latitude} 
                readOnly 
                className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Longitude</label>
              <input 
                type="text" 
                value={coordinates.longitude} 
                readOnly 
                className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Map Preview</h2>
        
        <EnhancedMapViewer 
          address={{}}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          height={400}
        />
      </div>
    </div>
  );
}
