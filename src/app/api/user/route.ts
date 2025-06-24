import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  
  // This is just an example response with mock data since we're creating this endpoint
  // In a real application, you would fetch from your database
  if (role === 'broker') {
    return NextResponse.json([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        role: 'Broker',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        whatsapp: '123-456-7890',
        twitter: '@johndoe',
        facebook: 'johndoe',
        linkedIn: 'johndoe',
        instagram: 'johndoe',
        nmls: '12345',
        dre: '67890',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        role: 'Broker',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        whatsapp: '987-654-3210',
        twitter: '@janesmith',
        facebook: 'janesmith',
        linkedIn: 'janesmith',
        instagram: 'janesmith',
        nmls: '54321',
        dre: '09876',
      }
    ])
  }
  
  return NextResponse.json([])
}
