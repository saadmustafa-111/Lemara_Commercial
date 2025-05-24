import { useState, useEffect, useRef } from 'react';
import { geocodeAddress } from '@/lib/maps';

interface AddressComponents {
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
}

interface MapCoordinates {
  latitude: string;
  longitude: string;
}

/**
 * Custom hook to manage map coordinates based on address changes
 * @param address The address components to geocode
 * @param initialCoordinates Optional initial coordinates
 * @returns Object with coordinates and update function
 */
export function useMapCoordinates(
  address: AddressComponents,
  initialCoordinates?: { latitude?: string; longitude?: string }
) {
  const [coordinates, setCoordinates] = useState<MapCoordinates>({
    latitude: initialCoordinates?.latitude || '',
    longitude: initialCoordinates?.longitude || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Use refs to track previous values and prevent unnecessary updates
  const prevAddressRef = useRef<string>('');
  const updateInProgressRef = useRef<boolean>(false);
  
  // Update coordinates when address components change
  useEffect(() => {
    // Only proceed if we have enough address info to geocode
    const addressStr = [
      address.streetAddress,
      address.city,
      address.stateProvince,
      address.country
    ].filter(Boolean).join(', ');
    
    if (!addressStr) return;
    
    // Skip geocoding if the address string is too short
    if (addressStr.length < 5) return;
    
    // Skip if address hasn't changed
    if (addressStr === prevAddressRef.current) return;
    
    // Skip if an update is already in progress
    if (updateInProgressRef.current) return;

    // Skip if we already have valid coordinates in state for the current address
    if (coordinates.latitude && coordinates.longitude) {
      const lat = parseFloat(coordinates.latitude);
      const lng = parseFloat(coordinates.longitude);
      
      if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0 && prevAddressRef.current === addressStr) {
        // Skip geocoding if coordinates are already valid for this address
        return;
      }
    }
    
    // Update the previous address ref
    prevAddressRef.current = addressStr;
    
    const fetchCoordinates = async () => {
      updateInProgressRef.current = true;
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Geocoding address:', addressStr);
        const result = await geocodeAddress(addressStr);
        
        if (result.results && result.results.length > 0) {
          const location = result.results[0].geometry.location;
          const newLat = location.lat.toString();
          const newLng = location.lng.toString();
          
          console.log('Geocoding successful:', { latitude: newLat, longitude: newLng });
          
          setCoordinates({
            latitude: newLat,
            longitude: newLng
          });
        } else {
          console.error('No geocoding results found:', result);
          setError(new Error(`No geocoding results found for "${addressStr}"`));
        }
      } catch (err) {
        console.error('Geocoding error:', err);
        setError(err instanceof Error ? err : new Error(`Geocoding failed for "${addressStr}"`));
      } finally {
        setIsLoading(false);
        // Allow time for React to process state updates before allowing new ones
        setTimeout(() => {
          updateInProgressRef.current = false;
        }, 100);
      }
    };

    // Add debounce to avoid excessive API calls
    const timer = setTimeout(() => {
      fetchCoordinates();
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, [
    address.streetAddress,
    address.city,
    address.stateProvince,
    address.country
  ]);

  // Manual update function for coordinates
  const updateCoordinates = (newCoordinates: Partial<MapCoordinates>) => {
    setCoordinates(prev => ({
      ...prev,
      ...newCoordinates
    }));
  };

  return {
    coordinates,
    updateCoordinates,
    isLoading,
    error
  };
}
