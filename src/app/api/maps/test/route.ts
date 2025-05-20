import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_MAPS_CONFIG, validateMapsApiKey } from "@/lib/mapsUtils";

// Use the centralized API key
const GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_CONFIG.API_KEY;

/**
 * API route to test Google Maps API connectivity
 * This can be accessed at /api/maps/test
 */
export async function GET(request: NextRequest) {
  try {
    console.log('Testing Maps API with key:', GOOGLE_MAPS_API_KEY.substring(0, 8) + '...');
    
    // Use our validation utility
    const validationResult = await validateMapsApiKey(GOOGLE_MAPS_API_KEY);
    
    return NextResponse.json({
      ...validationResult,
      message: 'Google Maps API test completed',
      keyFirstChars: GOOGLE_MAPS_API_KEY.substring(0, 8) + '...',
      mapId: GOOGLE_MAPS_CONFIG.MAP_ID,
      requiredAPIs: GOOGLE_MAPS_CONFIG.REQUIRED_APIS,
      testTimestamp: new Date().toISOString(),
      host: request.headers.get('host') || 'unknown-host'
    });
    
  } catch (error) {
    console.error("Error testing Google Maps API:", error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
