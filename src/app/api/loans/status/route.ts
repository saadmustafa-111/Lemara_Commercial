import { NextRequest, NextResponse } from 'next/server';

// In a real app, this would be your database update function
// Here we're just simulating status updates
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const loanId = searchParams.get('id');
    
    if (!loanId) {
      return NextResponse.json({ error: 'Loan ID is required' }, { status: 400 });
    }
    
    const data = await req.json();
    
    if (!data.status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }
    
    // Validate the status
    const validStatuses = ["in progress", "submitted", "approved", "rejected"];
    if (!validStatuses.includes(data.status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }
    
    // In a real app, you would update the loan in your database
    // Here we're just returning a mock success response
    return NextResponse.json({ 
      message: `Loan ${loanId} status updated to ${data.status}`,
      id: Number(loanId),
      status: data.status,
      updatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error updating loan status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
