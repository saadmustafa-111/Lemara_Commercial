/**
 * Google Maps API utilities
 */

/**
 * Geocode an address using our API route
 * @param address The full address string to geocode
 * @returns The geocoding results including coordinates and address components
 */
export async function geocodeAddress(address: string) {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const url = `/api/maps/geocode?address=${encodeURIComponent(address)}&_=${timestamp}`;
    
    console.log('Making geocoding request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to geocode address';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        console.error('Geocoding error response:', errorData);
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Geocoding response:', data);
    return data;
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}

/**
 * Generate static map URL for a given location
 * @param latitude The latitude coordinate
 * @param longitude The longitude coordinate
 * @param zoom The zoom level (1-20)
 * @param width The width of the map image
 * @param height The height of the map image
 * @returns URL string for a static map
 */
export function getStaticMapUrl(
  latitude: string | number,
  longitude: string | number,
  zoom = 15,
  width = 600,
  height = 300
) {
  // Import from centralized configuration
  const { GOOGLE_MAPS_CONFIG } = require('./mapsUtils');
  const apiKey = GOOGLE_MAPS_CONFIG.API_KEY;
  const mapId = GOOGLE_MAPS_CONFIG.MAP_ID;
  
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&key=${apiKey}&map_id=${mapId}&markers=color:red%7C${latitude},${longitude}`;
}

/**
 * Generate Google Maps embed URL for places
 * @param query Search query or address for the map
 * @returns URL string for the maps embed
 */
export function getMapEmbedUrl(query: string) {
  // Import from centralized configuration
  const { GOOGLE_MAPS_CONFIG } = require('./mapsUtils');
  const apiKey = GOOGLE_MAPS_CONFIG.API_KEY;
  const mapId = GOOGLE_MAPS_CONFIG.MAP_ID;
  
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}&maptype=roadmap&map_id=${mapId}`;
}

/**
 * Generate Google Maps Street View embed URL
 * @param latitude The latitude coordinate
 * @param longitude The longitude coordinate
 * @param heading The compass heading (0-360)
 * @param pitch The up/down angle (-90 to 90)
 * @param fov The field of view (0-120)
 * @returns URL string for the street view embed
 */
export function getStreetViewEmbedUrl(
  latitude: string | number,
  longitude: string | number,
  heading = 0,
  pitch = 0,
  fov = 80
) {
  // Import from centralized configuration
  const { GOOGLE_MAPS_CONFIG } = require('./mapsUtils');
  const apiKey = GOOGLE_MAPS_CONFIG.API_KEY;
  
  return `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${latitude},${longitude}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
}

/**
 * Builds a complete address string from components
 * @param addressComponents Object with address parts
 * @returns Formatted address string
 */
export function buildAddressString(addressComponents: {
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
}) {
  return [
    addressComponents.streetAddress,
    addressComponents.city,
    addressComponents.stateProvince,
    addressComponents.country
  ]
    .filter(Boolean)
    .join(', ');
}
