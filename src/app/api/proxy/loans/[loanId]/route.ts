import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { loanId: string } }
) {
  const loanId = params.loanId;
  
  try {
    // Forward the request to the Heroku backend
    const backendUrl = `https://lemara-9829c937fd90.herokuapp.com/loan/${loanId}`;
    
    const response = await fetch(backendUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch loan with ID ${loanId}: ${response.status}` },
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
    console.error("Error proxying loan detail request to backend:", error);
    return NextResponse.json(
      { error: `Failed to connect to backend server: ${error}` },
      { status: 500 }
    );
  }
}
