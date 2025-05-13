import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, UserData } from "@/lib/authService";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    
    // Authenticate user
    const userData = await authenticateUser(body.email, body.password);
    
    if (!userData) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    // Create a new object without the password field
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userData as UserData;
    
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}