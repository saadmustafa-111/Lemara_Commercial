import { NextRequest, NextResponse } from 'next/server';

// Proxy endpoint to fetch loans from the backend
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    
    let url = 'https://lemara-9829c937fd90.herokuapp.com/loan';
    
    // If ID is provided, get specific loan
    if (id) {
      url += `/${id}`;
    } 
    // Otherwise, handle filters
    else {
      const queryParams = [];
      
      if (email) queryParams.push(`email=${encodeURIComponent(email)}`);
      if (status) queryParams.push(`status=${encodeURIComponent(status)}`);
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
    }
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers here
      },
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from backend: ${response.status} ${response.statusText}` },
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
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend' },
      { status: 500 }
    );
  }
}

// Proxy endpoint to create a new loan
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const response = await fetch('https://lemara-9829c937fd90.herokuapp.com/loan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers here
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from backend: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 201,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to create loan on backend' },
      { status: 500 }
    );
  }
}
