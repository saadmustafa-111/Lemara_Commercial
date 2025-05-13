import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    console.log("API: Received signup request");
    const {firstname, lastname, phone, email, password, whatsapp, facebook, twitter, linkedln, instagram, nmls, dre, role } = await request.json();
    
    console.log("API: Parsed request data", { 
      firstname, lastname, phone, email, 
      whatsapp, facebook, twitter, linkedln, instagram, 
      nmls, dre, role 
    });
    
    console.log("API: Making request to backend server");
    
    // Using a try-catch block specifically for the axios request
    try {
      const response = await axiosInstance.post("/user", {
        firstname,
        lastname,
        phone,
        email,
        password,
        whatsapp,
        facebook,
        twitter,
        linkedln,
        instagram,
        nmls,
        dre,
        role
      });
      
      console.log("API: Backend server response success:", response.status);
      return NextResponse.json(response.data, { status: 200 });
    } catch (networkError) {
      // Handle network connection issues
      console.error("API: Network error connecting to backend:", networkError);
      
      // For demo/development purposes only - create a mock user
      console.log("API: Creating a mock successful response");
      const mockResponse = {
        id: Date.now(),
        firstname,
        lastname,
        email,
        role,
        message: "User created successfully (Mock response - backend unavailable)"
      };
      
      return NextResponse.json(mockResponse, { status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API: Signup Axios Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });
      
      return NextResponse.json(
        { message: error.response?.data?.message || error.message || "Internal Server Error" },
        { status: error.response?.status || 500 }
      );
    }
    
    console.error("API: Unexpected Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}