import { useState, useEffect } from 'react';
import { geocodeAddress } from '@/lib/maps';

interface AddressComponents {
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
}

interface UseGeocodeResult {
  isLoading: boolean;
  error: Error | null;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  formattedAddress: string;
  placeDetails: {
    placeId?: string;
    types?: string[];
    addressComponents?: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
  } | null;
}

/**
 * React hook to geocode an address and get coordinates and place details
 * @param address Object containing address components
 * @returns Geocoding result with coordinates and place details
 */
export function useGeocode(address: AddressComponents): UseGeocodeResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [placeDetails, setPlaceDetails] = useState<UseGeocodeResult['placeDetails']>(null);

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
    
    const fetchGeocode = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await geocodeAddress(addressStr);
        
        if (result.results && result.results.length > 0) {
          const location = result.results[0].geometry.location;
          setCoordinates({
            latitude: location.lat,
            longitude: location.lng
          });
          setFormattedAddress(result.results[0].formatted_address);
          
          // Extract place details
          setPlaceDetails({
            placeId: result.results[0].place_id,
            types: result.results[0].types,
            addressComponents: result.results[0].address_components
          });
        } else {
          setError(new Error('No geocoding results found'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Geocoding failed'));
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the geocoding request
    const timer = setTimeout(() => {
      fetchGeocode();
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    address.streetAddress,
    address.city,
    address.stateProvince,
    address.country
  ]);

  return { isLoading, error, coordinates, formattedAddress, placeDetails };
}
