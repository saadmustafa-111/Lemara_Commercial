import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_MAPS_CONFIG, getMapsApiTroubleshooting } from "@/lib/mapsUtils";

// Use the centralized API key
const GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_CONFIG.API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Get address components from query parameters
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    
    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    // Make request to Google Maps Geocoding API with proper credentials
    // Using proper headers and ensuring the URL is correctly formatted
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': request.headers.get('host') || 'https://lemara.net'
      }
    });
    
    const data = await response.json();
      if (data.status !== 'OK') {
      console.error('Geocoding API error:', data);
      
      // Get troubleshooting information
      const troubleshooting = getMapsApiTroubleshooting(data.status);
      
      return NextResponse.json(
        { 
          error: `Geocoding API error: ${data.status}`, 
          details: data.error_message,
          request: { url, address },
          troubleshooting
        },
        { status: 500 }
      );
    }
      // Return the geocoded results
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error with geocoding request:", error);
    
    // Provide more detailed error information
    let errorMessage = "Failed to process geocoding request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        timestamp: new Date().toISOString(),
        apiKey: GOOGLE_MAPS_API_KEY.substring(0, 8) + '...' // Show partial key for debugging
      },
      { status: 500 }
    );
  }
}
