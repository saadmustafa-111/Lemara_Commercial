import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  
  // Return the exact sample data provided when role=broker
  if (role === 'broker') {
    return NextResponse.json([
      {
        "id": 1,
        "isActive": true,
        "createdAt": "2025-06-24T10:28:35.802Z",
        "updatedAt": "2025-06-24T10:28:35.802Z",
        "firstName": "Safa",
        "lastName": "Noor",
        "password": "123",
        "email": "s@gmail.com",
        "phone": "12345667",
        "whatsapp": "string",
        "twitter": "string",
        "facebook": "string",
        "linkedIn": "string",
        "instagram": "string",
        "nmls": "string",
        "dre": "string",
        "role": "broker"
      }
    ]);
  }
  
  // Return empty array for other roles or if no role specified
  return NextResponse.json([]);
}
