import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, isActive } = body;
    
    // Add a small delay to simulate network latency (for development only)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log the update being made for debugging
    if (status !== undefined) {
      console.log(`Updating listing ${id} status to ${status}`);
    }
    
    if (isActive !== undefined) {
      console.log(`Updating listing ${id} active state to ${isActive}`);
    }
    
    // Validate that at least one property is being updated
    if (status === undefined && isActive === undefined) {
      return NextResponse.json(
        { error: 'Either status or isActive must be provided' },
        { status: 400 }
      );
    }
    
    // In a real application, you would update the status in your database
    // For now, we'll just simulate a successful response
    
    // Simulate database update
    // In a real app, this is where you'd update the database record
    
    // Return the updated data
    return NextResponse.json(
      { 
        message: 'Listing updated successfully',
        id,
        ...(status !== undefined ? { status } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
        updatedAt: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}
