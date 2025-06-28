import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would update the status in your database
    // For now, we'll just simulate a successful response
    console.log(`Updating listing ${id} status to ${status}`);
    
    // Simulate database update
    // In a real app, this is where you'd update the database record
    
    return NextResponse.json(
      { 
        message: 'Status updated successfully',
        id,
        status,
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating listing status:', error);
    return NextResponse.json(
      { error: 'Failed to update listing status' },
      { status: 500 }
    );
  }
}
