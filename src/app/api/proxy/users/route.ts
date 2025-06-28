import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const userId = searchParams.get('id');
  
  try {
    // Determine the correct URL based on whether we're fetching a specific user or filtering by role
    let backendUrl = 'https://lemara-9829c937fd90.herokuapp.com/user';
    
    if (userId) {
      // Fetch specific user by ID
      backendUrl += `/${userId}`;
    } else if (role) {
      // Filter users by role
      backendUrl += `?role=${role}`;
    }
    
    // Forward the request to the Heroku backend
    const response = await fetch(backendUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from backend: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error("Error proxying request to backend:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend server" },
      { status: 500 }
    );
  }
}
