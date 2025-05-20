import axios from 'axios';

/**
 * Configuration constants for Google Maps
 */
export const GOOGLE_MAPS_CONFIG = {
  API_KEY: 'AIzaSyDJoz4v__2hk1k2npCct2wj-aLgsBBZ9Ro',
  MAP_ID: 'a30bb137b25482b3',
  REQUIRED_APIS: [
    'Maps JavaScript API',
    'Maps Embed API',
    'Geocoding API', 
    'Places API',
    'Street View API'
  ]
};

/**
 * Utility function to validate Google Maps API key functionality
 * @param apiKey The Google Maps API key to validate
 * @returns Object with validation results
 */
export async function validateMapsApiKey(apiKey = GOOGLE_MAPS_CONFIG.API_KEY) {
  try {
    // Test address for geocoding
    const testAddress = "1600 Amphitheatre Parkway, Mountain View, CA";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(testAddress)}&key=${apiKey}`;
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': typeof window !== 'undefined' ? window.location.origin : 'https://lemara.net'
      }
    });
    
    const isValid = response.data.status === 'OK';
    
    return {
      isValid,
      status: response.data.status,
      message: isValid 
        ? 'Google Maps API key is valid and working correctly' 
        : `API key validation failed with status: ${response.data.status}`,
      details: response.data
    };
  } catch (error) {
    console.error('Error validating Google Maps API key:', error);
    
    return {
      isValid: false,
      status: 'ERROR',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    };
  }
}

/**
 * List of common Google Maps API errors and possible solutions
 */
export const MAPS_API_ERRORS = {
  'REQUEST_DENIED': 'The API key may not be enabled for the Geocoding API or the key restriction settings may be too restrictive. Check the Google Cloud Console.',
  'OVER_QUERY_LIMIT': 'You have exceeded your daily request quota. Consider upgrading to a premium plan.',
  'INVALID_REQUEST': 'The request was invalid, usually due to missing required parameters.',
  'UNKNOWN_ERROR': 'An unknown server error occurred. Try again later.',
  'ZERO_RESULTS': 'No results were found for this address. Try a more specific address.'
};

/**
 * Get troubleshooting help for Google Maps API errors
 * @param errorStatus The error status from the Google Maps API
 * @returns Troubleshooting information
 */
export function getMapsApiTroubleshooting(errorStatus: string) {
  const errorMessage = MAPS_API_ERRORS[errorStatus as keyof typeof MAPS_API_ERRORS] || 'Unknown error';
  
  return {
    status: errorStatus,
    message: errorMessage,
    possibleSolutions: [
      'Ensure the API key is correctly entered in the application.',
      'Check that the necessary APIs are enabled in the Google Cloud Console.',
      'Verify that the key restrictions (if any) allow your domain/IP.',
      'Make sure your billing information is up to date if using a paid tier.'
    ],
    helpResources: [
      'https://developers.google.com/maps/documentation/geocoding/overview',
      'https://console.cloud.google.com/google/maps-apis/overview'
    ]
  };
}
